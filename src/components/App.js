import React, { Component, Fragment } from 'react'
import { Link, Route, Switch, NavLink } from 'react-router-dom'
import { Container, Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap'
import Activities from './screens/Activities'
import People from './screens/People'

const NavItemLink = ({ children, to, disabled = false }) => (
  <NavItem>
    <NavLink
      to={!disabled ? to : '/#'}
      className={`nav-link${disabled ? ' disabled' : ''}`}
      activeClassName="active"
    >
      {children}
    </NavLink>
  </NavItem>
)

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar color="primary" dark expand="md">
          <Container>
            <Link to="/" className="navbar-brand">
              Prello
            </Link>
            <Nav className="ml-auto" navbar>
              <NavItemLink to="/people">Pessoas</NavItemLink>
            </Nav>
          </Container>
        </Navbar>

        <Switch>
          <Route exact path="/" component={Activities}/>
          <Route exact path="/people" component={People}/>
        </Switch>
      </Fragment>
    )
  }
}

export default App
