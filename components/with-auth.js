import React, { Component } from 'react'
import Router from 'next/router'
import TokenContext from '../context/token-context'
import { getCookie } from '../utils/cookies'

export default function withAuth(AuthComponent) {
  return class Authenticated extends Component {

    static async getInitialProps(ctx) {
      const token = getCookie('token', ctx.req)
      const companyId = getCookie('companyId', ctx.req) 
      // Check if Page has a `getInitialProps`; if so, call it.
      const pageProps = AuthComponent.getInitialProps && await AuthComponent.getInitialProps(ctx);
      return { ...pageProps, token, companyId }
    }

    constructor(props) {
      super(props)
      this.state = {
        isLoading: true
      };
    }

    componentDidMount() {
      console.log('checking auth')
      if (!this.props.token) {
        Router.push('/')
      }
      this.setState({ isLoading: false })
    }

    render() {
      const { token, companyId } = this.props
      return (
        <div>
          {this.state.isLoading ? (
            <div>LOADING....</div>
          ) : (
              <TokenContext.Provider value={{ token, companyId }}>
                <AuthComponent {...this.props} />
              </TokenContext.Provider>
            )}
        </div>
      )
    }
  }
}