import React from 'react'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import pure from 'recompose/pure'

export const InputGroupWrapper = pure((props) => {
  const {
    touched, errors, label, id, children, render, noLabel = false,
  } = props
  return (
    <FormGroup color={errors[id] ? 'danger' : null}>
      {!noLabel && <Label for={id}>{label}</Label>}
      {children || render(props)}
      {touched[id] &&
        errors[id] && (
          <FormFeedback style={{ display: 'block !important' }}>
            {errors[id][0]}
          </FormFeedback>
        )}
    </FormGroup>
  )
})

const InputGroup = pure((props) => {
  const {
    handleChange,
    handleBlur,
    touched,
    errors,
    values,
    label,
    id,
    type = 'text',
  } = props

  return (
    <InputGroupWrapper {...props}>
      <Input
        type={type}
        id={id}
        name={id}
        placeholder={label}
        onChange={handleChange}
        onBlur={handleBlur}
        valid={touched[id] && !errors[id]}
        value={values[id]}
      />
    </InputGroupWrapper>
  )
})

export default InputGroup
