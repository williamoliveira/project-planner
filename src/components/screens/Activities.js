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
import * as activitiesDuck from '../../store/ducks/activities'
import Select from '../Select'
import Activity from './Activity'
import FormattedDate from '../FormattedDate'
import Icon from '../Icon'

class Activities extends Component {
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
      filter,
      setFilter,
      activities,
      createActivity,
      updateActivityById,
      removeActivityById,
      currentActivity,
      setCurrentActivity,
    } = this.props
    const { toggleModal } = this
    const { modalShowing } = this.state

    return (
      <Fragment>
        <Container>
          <Row className="mb-3 mt-3">
            <Col md={3}>
              <Select
                options={[
                  { id: 'all', name: 'Todas' },
                  { id: 'not-started', name: 'Não iniciadas' },
                  { id: 'started', name: 'Iniciadas' },
                  { id: 'concluded', name: 'Concluídas' },
                  { id: 'past-due', name: 'Atrasadas' },
                  { id: 'before-due', name: 'Concluídas antes do prazo' },
                ]}
                value={filter}
                onChange={setFilter}
              />
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                onClick={() => {
                  setCurrentActivity(null)
                  toggleModal()
                }}
                color="primary"
              >
                <Icon name="plus" fixedWidth /> Nova atividade
              </Button>
            </Col>
          </Row>

          <Row>
            {activities.map((activity, i) => (
              <Col md={4} key={i} className="mb-2">
                <Card
                  outline
                  color={
                    activity.ended
                      ? activity.endedAt > activity.endsAt ? 'danger' : 'success'
                      : 'default'
                  }
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setCurrentActivity(activity)
                    toggleModal()
                  }}
                >
                  <CardBody>
                    <CardTitle>
                      {
                        activity.ended
                          ? (
                            <span style={{ textDecoration: 'line-through' }}>
                              {activity.name}
                            </span>
                          )
                          : activity.name
                      }

                    </CardTitle>

                    <div>
                      <div>
                        <b>Prazo:</b> <FormattedDate>{activity.endsAt}</FormattedDate>
                      </div>
                      {activity.ended && (
                        <div>
                          <b>Terminado:</b> <FormattedDate>{activity.endedAt}</FormattedDate>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}

            {activities.length === 0 && (
              <div className="mt-3 text-center" style={{ width: '100%' }}>
                <span className="text-muted">
                  Nada a exibir.
                </span>
              </div>
            )}
          </Row>

          <Activity
            activity={currentActivity}
            isShowing={modalShowing}
            toggle={toggleModal}
            onSubmit={(activity) => {
              (activity.id)
                ? updateActivityById(activity.id, activity)
                : createActivity(activity)
              toggleModal()
            }}
            onRemove={(activity) => {
              removeActivityById(activity.id)
              toggleModal()
            }}
          />
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  activities: activitiesDuck.getFiltered(state),
  currentActivity: activitiesDuck.getCurrent(state),
  filter: activitiesDuck.getFilter(state),
})
const actionCreators = {
  createActivity: activitiesDuck.create,
  updateActivityById: activitiesDuck.updateById,
  removeActivityById: activitiesDuck.removeById,
  setCurrentActivity: activitiesDuck.setCurrent,
  setFilter: activitiesDuck.setFilter,
}
export default connect(mapStateToProps, actionCreators)(Activities)
