import { differenceInHours } from 'date-fns'
import { FieldArray, Formik } from 'formik'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from 'reactstrap'
import { compose } from 'recompose'
import * as peopleDuck from '../../store/ducks/people'
import Datetime from '../Datetime'
import Icon from '../Icon'
import InputGroup, { InputGroupWrapper } from '../InputGroup'
import Select from '../Select'

const connectPeople = connect(state => ({
  options: peopleDuck.getAll(state),
}))
const PeopleSelect = connectPeople(({ value, options, onChange, onBlur }) => (
  <Select
    isSearchable
    isMulti
    value={value}
    options={options}
    onChange={onChange}
    onBlur={onBlur}
  />
))

const Activity = ({ activity, isShowing, toggle, onSubmit, onRemove }) => {
  const values = activity || {
    name: '',
    endsAt: '',
    ended: false,
    endedAt: '',
  }

  return (
    <Modal size="lg" style={{ maxWidth: 1000 }} isOpen={isShowing} toggle={toggle}>
      <ModalHeader toggle={toggle}>Atividade</ModalHeader>

      <Formik
        initialValues={values}
        onSubmit={onSubmit}
        render={(formik) => (
          <Fragment>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>

                <Row>
                  <Col md={5}>
                    <InputGroup
                      label="Nome"
                      id="name"
                      {...formik}
                    />

                    <InputGroupWrapper
                      label="Pessoas"
                      id="people"
                      {...formik}
                      render={({ id, ...formik }) => (
                        <PeopleSelect
                          value={formik.values[id]}
                          onChange={val => formik.setFieldValue(id, val)}
                          onBlur={() => formik.setFieldTouched(id, true)}
                        />
                      )}
                    />

                    <Row>
                      <Col md={6}>
                        <InputGroupWrapper
                          label="Termino estimado"
                          id="endsAt"
                          {...formik}
                          render={({ id, ...formik }) => (
                            <Datetime
                              value={formik.values[id]}
                              onChange={val => formik.setFieldValue(id, val)}
                              onBlur={() => formik.setFieldTouched(id, true)}
                            />
                          )}
                        />
                      </Col>
                      <Col md={6}>
                        <FormGroup check className="mb-2">
                          <Label check>
                            <Input
                              type="checkbox"
                              id="ended"
                              checked={!!formik.values.ended}
                              onChange={e => formik.setFieldValue('ended', e.target.checked)}
                            />{' '}
                            Terminado
                          </Label>
                        </FormGroup>

                        {!!formik.values.ended && (
                          <Datetime
                            value={formik.values['endedAt']}
                            onChange={val => formik.setFieldValue('endedAt', val)}
                            onBlur={() => formik.setFieldTouched('endedAt', true)}
                          />
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col md={7}>
                    <FieldArray
                      name="efforts"
                      render={arrayHelpers => (
                        <Fragment>
                          <Row noGutters>
                            <Col md={4} className="pr-2">Início</Col>
                            <Col md={4} className="pr-2">Fim</Col>
                            <Col md={2}>Tempo</Col>
                            <Col md={2}></Col>
                          </Row>
                          {(formik.values.efforts || []).map((effort, i) => (
                            <Row key={i} noGutters className="mb-2">
                              <Col md={4} className="pr-2">
                                <Datetime
                                  value={effort.startedAt}
                                  onChange={val => formik.setFieldValue(`efforts.${i}.startedAt`, val)}
                                  onBlur={() => formik.setFieldTouched(`efforts.${i}.startedAt`, true)}
                                />
                              </Col>
                              <Col md={4} className="pr-2">
                                <Datetime
                                  value={effort.endedAt}
                                  onChange={val => formik.setFieldValue(`efforts.${i}.endedAt`, val)}
                                  onBlur={() => formik.setFieldTouched(`efforts.${i}.endedAt`, true)}
                                />
                              </Col>
                              <Col md={2}>
                                {differenceInHours(effort.endedAt, effort.startedAt) || '0'}
                              </Col>
                              <Col md={2} className="d-flex justify-content-end">
                                <Button
                                  size="sm"
                                  outline
                                  color="danger"
                                  onClick={() => arrayHelpers.remove(i)}
                                >
                                  <Icon name="times" fixedWidth/>
                                </Button>
                              </Col>
                            </Row>
                          ))}

                          <Button
                            outline
                            color="primary"
                            type="button"
                            size="sm"
                            onClick={() => arrayHelpers.push({
                              startedAt: '',
                              endedAt: '',
                            })}
                          >
                            <Icon name="plus" fixedWidth /> Adicionar esforço
                          </Button>
                        </Fragment>
                      )}
                    />
                  </Col>
                </Row>

              </form>
            </ModalBody>
            <ModalFooter>
              {(activity && activity.id) && (
                <Button
                  outline
                  color="danger"
                  className="mr-2"
                  onClick={() => onRemove(activity)}
                >
                  Excluir
                </Button>
              )}
              <Button
                color="primary"
                type="submit"
                className="mr-2"
                onClick={formik.handleSubmit}
                disabled={formik.isSubmitting}
              >
                Salvar
              </Button>
              <Button color="secondary" onClick={toggle}>
                Cancelar
              </Button>
            </ModalFooter>
          </Fragment>
        )}
      />
    </Modal>
  )
}

const mapStateToProps = state => ({
})
const actionCreators = {}
export default compose(
  connect(mapStateToProps, actionCreators),
)(Activity)
