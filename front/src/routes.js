import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { isAuthenticated } from './services/auth'
import Login from './pages/login'
import Home from './pages/home'
import App from './pages/app'
import Room from './pages/room'
import Reservation from './pages/reservation'
import SaveRoom from './pages/saveRoom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
)

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/app" component={App} />
      <PrivateRoute path="/reservation/:id" component={Reservation} />
      <PrivateRoute path="/solicitation/:id" component={Reservation} />
      <PrivateRoute path="/saveRoom" component={SaveRoom} />
      <Route exact path="/room/:id" component={Room} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
)

export default Routes
