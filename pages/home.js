import React, { Component } from 'react'
import { getCookie, setCookie } from '../utils/cookies'
import Link from 'next/link'

// const getCookie = (cookiename, cookie) => {
//   // Get name followed by anything except a semicolon
//   const cookiestring = RegExp("" + cookiename + "[^;]+").exec(cookie);
//   // Return everything after the equal sign, or an empty string if the cookie name not found
//   const decoded = decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
//   return JSON.parse(decoded)
// }

class Home extends Component {
  static async getInitialProps({ req }) {
    const token = getCookie('token', req)
    return { accessToken: token.access_token }
  }

  constructor(props) {
    super(props)
        this.state = {
      isLoading: true
    };
  }

  // componentDidMount() {
  //   console.log('checking auth')
  //       if(!this.props.token) {
  //     Router.push('/')
  //   }
  //       this.setState({ isLoading: false })
  // }

  render() {
    return (
      <div>
        <Link href="/account"><a>Explore Accounts</a></Link>
      </div>
    )
    // return(
    //   <div>
    //   {
    //     this.state.isLoading ? (
    //       <div>LOADING....</div>
    //     ) : (
    //         <TokenContext.Provider value={this.props.token}>
    //           <AuthComponent {...this.props} />
    //         </TokenContext.Provider>
    //       )
    //   }
    //   </div >
    // )
  }
}

export default Home