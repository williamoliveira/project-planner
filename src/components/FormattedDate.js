import { pure } from 'recompose'
import { format as formatDate } from 'date-fns'

export default pure(
  ({ format = 'DD/MM/YYYY HH:mm', date, children }) => formatDate(children || date, format)
)