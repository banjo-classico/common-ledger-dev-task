import React from 'react'

import { crudBox, input } from '../styles'

const CrudBox = ({ type, label, onSubmit, onChange }) => (
  <div style={crudBox}>
    <div style={{ margin: '0 0 15px' }}>{type}</div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor='entity'>{label}</label>
      <input style={input} name='entity' type='text' onChange={onChange} />
    </div>
    <button onClick={onSubmit}>Submit</button>
  </div>
)

export default CrudBox