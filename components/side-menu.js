import React from 'react'

import { sideMenu, buttonStyle } from '../styles'
import sections from '../data/sections'

const SideMenu = ({ changeSection }) => (
  <div style={sideMenu}>
    <button onClick={changeSection(sections['account'])} style={buttonStyle}>Account</button>
    <button onClick={changeSection(sections['attachable'])} style={buttonStyle}>Attachable</button>
    <button onClick={changeSection(sections['bill'])} style={buttonStyle}>Bill</button>
    <button onClick={changeSection(sections['billpayment'])} style={buttonStyle}>BillPayment</button>
    <button onClick={changeSection(sections['budget'])} style={buttonStyle}>Budget</button>
    <button onClick={changeSection(sections['companyinfo'])} style={buttonStyle}>CompanyInfo</button>
  </div> 
)

export default SideMenu