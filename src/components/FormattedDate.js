import { format as formatDate } from 'date-fns'

export default ({ format = 'DD/MM/YYYY HH:mm', date, children }) =>
  formatDate(children || date, format)