import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'

import { getCookie, setCookie } from '../utils/cookies'

class Account extends Component {
  static async getInitialProps({ req }) {
    const token = getCookie('token', req)  
    const companyId = getCookie('companyId', req)  
    return { token: token.access_token, companyId }
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      query: ''
    };
  }

  componentDidMount() {
        if(!this.props.token) {
      // Router.push('/')
    }
    this.setState({ isLoading: false })
  }

  handleChange = e => {
    e.preventDefault()
    this.setState({ query: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      id: this.props.companyId,
      query: this.state.query
    });
  }

  render() {
    const { companyId, query } = this.props
    return(
      <div>
      {
        this.state.isLoading ? (
          <div>LOADING....</div>
          ) : (
            <form onSubmit={this.handleSubmit}>
              <div>{`Company ID: ${companyId}`}</div>
              <label htmlFor='query'>Query:</label>
              <input name='query' type='text' onChange={this.handleChange} value={query} />
              <button type='submit'>submit</button>
            </form>
          )
      }
      </div >
    )
  }
}

export default Account