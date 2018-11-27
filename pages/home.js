import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'

import SideMenu from '../components/side-menu'
import CrudBox from '../components/crud-box'
import { getCookie, setCookie } from '../utils/cookies'
import { getUrl } from '../utils/url'
import { container, sectionStyle } from '../styles'
import withAuth from '../components/with-auth';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      entity: '',
      response: null,
      fetching: false,
      section: 'account'
    };
  }

  handleChange = key => e => {
    e.preventDefault()
    this.setState({ [key]: e.target.value })
  }

  handleSubmit = key => () => {
    const { token, companyId } = this.props
    const { entity, query, section } = this.state
    const baseUrl = getUrl(companyId)
    let url
    const options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json;',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.access_token}`
        // "Content-Type": "application/x-www-form-urlencoded",
      }
    }

    if (key === 'entity') {
      url = `${baseUrl}${section}/${entity}`
    }
    if (key === 'query') {
      url = `${baseUrl}query?query=${query}`
    }
    this.setState({ fetching: true })
    fetch(url, options)
      .then(res => res.json())
      .then(body => {
        this.setState({ response: body, fetching: false })
      })
  }

  changeSection = section => () => this.setState({ section, response: null })


  render() {
    const { response, section, fetching } = this.state
    return(
      <div style={container}>
        <SideMenu changeSection={this.changeSection} />
        <div style={{ padding: '30px', width: '100%' }}>
          <div style={{ margin: '0 0 30px' }}>
              <div style={sectionStyle}>{section.toUpperCase()}</div>
              <div style={{ display: 'flex', width: '100%' }}>
                <CrudBox
                  type="READ"
                  label="Entity:"
                  onChange={this.handleChange('entity')}
                  onSubmit={this.handleSubmit('entity')}
                />
                <CrudBox
                  type="QUERY"
                  label="Query:"
                  onChange={this.handleChange('query')}
                  onSubmit={this.handleSubmit('query')}
                />
              </div>
            </div>
          {
            fetching
            ? 'PROCESSING...'
            : response && <div><pre>{JSON.stringify(response, null, 2)}</pre></div>
          }
        </div>
      </div>
    )
  }
}

export default withAuth(Home)