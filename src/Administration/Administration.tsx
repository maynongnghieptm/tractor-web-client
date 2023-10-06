import React from 'react'
import { Route, match as Match } from 'react-router-dom'
import UsersList from './Users/UsersList'
import UserEditor from './Users/UsersEditor/UsersEditor'
import Tractor from './Tractor/Tractor'
import TractorEditor from './Tractor/TractorEditor'
import CreateUser from './Users/UsersEditor/createUser'
import MapContainer from './Dashboard/Dashboard'
export type AdministrationRouteParams = {
  userId: string
}

export type AdministrationProps = {
  match: Match<AdministrationRouteParams>
}

const Administration: React.FC<AdministrationProps> = ({ match }) => {
  return (
    <>
      <Route exact path={`${match.path}/users`} component={UsersList} />
      <Route exact path={`${match.path}/tractors`} component={Tractor} />
      <Route exact path={`${match.path}/useredit/:userId`} component={UserEditor} />
      <Route exact path={`${match.path}/tractoredit/:tractorId`} component={TractorEditor} />
      <Route exact path={`${match.path}/create`} component={CreateUser} />
      <Route exact path={`${match.path}/dashboard`} component={MapContainer} />

    </>
  )
}

Administration.propTypes = {}

export default Administration
