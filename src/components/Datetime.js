import React from 'react'
import Datetime from 'react-datetime'
import 'moment/locale/pt-br'
import 'react-datetime/css/react-datetime.css'

const toDate = value => value instanceof Date
  ? value
  : (
    !value ? value : new Date(value)
  )

export default ({ value, ...props}) => <Datetime
  value={toDate(value)}
  locale="pt-br"
  {...props}
/>
