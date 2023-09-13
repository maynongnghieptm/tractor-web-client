import React from 'react'
import { HashRouter, BrowserRouter, Route, Switch, RouteProps } from 'react-router-dom' //

import config from './_config'
import Profile from 'Account/Profile/Profile'
import DashboardLayout from '_layouts/DashboardLayout'
import Layout from '_layouts/DashboardLayout/Home_layout'
import { Auth } from './Auth'
import { Administration } from './Administration'
import { Dashboard } from './Dashboard'
import Layoutgrid from './Account/LiveData/Layout'
import Login from './Auth/Login'
import DonutRoad from './Account/LiveData/Donut'
import Homepage from './Dashboard/Homepage'
// Use different router type depending on configuration
const AppRouterComponent: React.FC = ({ children }) => {
  return config.navigationType === 'history' ? (
    <BrowserRouter>{children}</BrowserRouter>
  ) : (
    <HashRouter>{children}</HashRouter>
  )
}

const AppRouter: React.FC = () => {
  return (
    <AppRouterComponent>
      <Switch>
        <Route path="/auth" component={Auth} />
        <RouteWithLayout
          exact
          path={'/'}
          component={Homepage}
          layout={Layout}
        />
         <RouteWithLayout
          exact
          path={`/homepage`}
          component={Dashboard}
          layout={DashboardLayout}
        />
        <RouteWithLayout
          path={`/administration`}
          component={Administration}
          layout={DashboardLayout}
        />
        <RouteWithLayout
          path={`/account/profile`}
          component={Profile}
          layout={DashboardLayout}
        />
        <RouteWithLayout
          path={`/account/Livedata`}
          component={Layoutgrid}
          layout={DashboardLayout}
        />
        <RouteWithLayout
          path={`/settings`}
          component={() => null}
          layout={DashboardLayout}
        />
      </Switch>
    </AppRouterComponent>
  )
}

export interface RouteWithLayoutProps extends RouteProps {
  layout: React.ComponentType<any>
}

const RouteWithLayout: React.FC<RouteWithLayoutProps> = ({
  component: Component,
  layout: Layout,
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!Component) return null

        if (Layout) {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          )
        } else {
          return <Component {...props} />
        }
      }}
    >
      {children}
    </Route>
  )
}

export default AppRouter
