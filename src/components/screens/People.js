import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
} from 'reactstrap'
import * as peopleDuck from '../../store/ducks/people'
import Person from './Person'
import Icon from '../Icon'

class People extends Component {
  constructor() {
    super()

    this.state = {
      modalShowing: false,
    }

    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState(state => ({
      modalShowing: !state.modalShowing,
    }))
  }

  render() {
    const {
      people,
      createPerson,
      updatePersonById,
      removePersonById,
      currentPerson,
      setCurrentPerson,
    } = this.props
    const { toggleModal } = this
    const { modalShowing } = this.state

    return (
      <Fragment>
        <Container>
          <Row className="mb-3 mt-3">
            <Col>

            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                onClick={() => {
                  setCurrentPerson(null)
                  toggleModal()
                }}
                color="primary"
              >
                <Icon name="plus" fixedWidth /> Nova pessoa
              </Button>
            </Col>
          </Row>

          <Row>
            {people.map((person, i) => (
              <Col md={3} key={i} className="mb-2">
                <Card
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setCurrentPerson(person)
                    toggleModal()
                  }}
                >
                  <CardBody>
                    <CardTitle className="mb-0">{person.name}</CardTitle>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          <Person
            person={currentPerson}
            isShowing={modalShowing}
            toggle={toggleModal}
            onSubmit={(person) => {
              (person.id)
                ? updatePersonById(person.id, person)
                : createPerson(person)
              toggleModal()
            }}
            onRemove={(person) => {
              removePersonById(person.id)
              toggleModal()
            }}
          />
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  people: peopleDuck.getAll(state),
  currentPerson: peopleDuck.getCurrent(state),
})
const actionCreators = {
  createPerson: peopleDuck.create,
  updatePersonById: peopleDuck.updateById,
  removePersonById: peopleDuck.removeById,
  setCurrentPerson: peopleDuck.setCurrent,
}
export default connect(mapStateToProps, actionCreators)(People)
