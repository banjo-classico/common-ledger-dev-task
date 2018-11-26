import React from 'react'

import { sideMenu, buttonStyle } from '../styles'

const SideMenu = ({ changeSection }) => (
  <div style={sideMenu}>
    <button onClick={changeSection('account')} style={buttonStyle}>Account</button>
    <button onClick={changeSection('attachable')} style={buttonStyle}>Attachable</button>
    <button onClick={changeSection('bill')} style={buttonStyle}>Bill</button>
    <button onClick={changeSection('billpayment')} style={buttonStyle}>BillPayment</button>
    <button onClick={changeSection('companyinfo')} style={buttonStyle}>CompanyInfo</button>
  </div> 
)

export default SideMenu