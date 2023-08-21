import React from 'react'
import { Route, match as Match } from 'react-router-dom'
import UsersList from './Users/UsersList'
import UserEditor from './Users/UsersEditor/UsersEditor'
import Tractor from './Tractor/Tractor'

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
      <Route exact path={`${match.path}/edit/:userId`} component={UserEditor} />
    </>
  )
}

Administration.propTypes = {}

export default Administration
