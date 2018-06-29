import React from 'react'
import Select from 'react-select'

export default ({ ...rest }) => {
  const props = {
    classNamePrefix: 'react-select',
    getOptionValue: option => option.id,
    getOptionLabel: option => option.name,
    autosize: false,
    defaultInputValue: '',
    defaultMenuIsOpen: false,
    placeholder: 'Selecione...',
    noOptionsMessage: () => 'Sem opções',
    ...rest,
  }

  return <Select {...props} />
}
