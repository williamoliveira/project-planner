import { Formik } from 'formik'
import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import InputGroup from '../InputGroup'

export default class Person extends Component {
  render() {
    const { person, isShowing, toggle, onSubmit, onRemove } = this.props

    const values = person || {
      name: '',
    }

    return (
      <Modal isOpen={isShowing} toggle={toggle}>
        <ModalHeader toggle={toggle}>Criar pessoa</ModalHeader>

        <Formik
          initialValues={values}
          onSubmit={onSubmit}
          render={(formik) => (
            <React.Fragment>
              <ModalBody>
                <form onSubmit={formik.handleSubmit}>

                  <InputGroup
                    label="Nome"
                    id="name"
                    {...formik}
                  />

                </form>
              </ModalBody>
              <ModalFooter>
                {person && person.id && (
                  <Button
                    color="danger"
                    className="mr-2"
                    onClick={() => onRemove(person)}
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
            </React.Fragment>
          )}
        />
      </Modal>
    )
  }
}