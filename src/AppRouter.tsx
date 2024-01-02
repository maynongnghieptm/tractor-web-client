import React from 'react'
import { HashRouter, BrowserRouter, Route, Switch, RouteProps } from 'react-router-dom' //
import config from './_config'
import Profile from 'Account/Profile/Profile'
import DashboardLayout from '_layouts/DashboardLayout'
import Layout from '_layouts/DashboardLayout/Home_layout'
import { Auth } from './Auth'
import { Administration } from './Administration'
import UserTracking from './Account/LiveData/index'
import Homepage from './Dashboard/Homepage'
import { useSelector } from 'react-redux'
import ErrPage from '_common/ErrPage/Unthori';
import Chart from '../src/Administration/Dashboard/chart_tractor'
import Aboutus from 'pages/About_us';
import Listcontent from 'pages/List_content'
import Info from 'pages'
const AppRouterComponent: React.FC = ({ children }) => {
  return config.navigationType === 'history' ? (
    <BrowserRouter>{children}</BrowserRouter>
  ) : (
    <HashRouter>{children}</HashRouter>
  );
};

const AppRouter: React.FC = () => {
  const isAdmin = useSelector((state: any) => state.authStatus.isAdmin);
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
          path={'/about_us'}
          component={Info}
          layout={Layout}
        />
        <RouteWithLayout
          exact
          path={'/:content'}
          component={Aboutus}
          layout={Layout}
        />
        <RouteWithLayout
          exact
          path={`/user/account/Livedata`}
          component={UserTracking}
          layout={DashboardLayout}
        />
        <Route
          path="/administration"
          render={() =>
            isAdmin ? (
              <RouteWithLayout
                path="/administration"
                component={Administration}
                layout={DashboardLayout}
              />
            ) : (
              <Route
                path="/administration"
                component={ErrPage}
              />
            )
          }
        />
        <Route path="/dashboard/:tractorId" component={Chart} />
        
        <RouteWithLayout
          path={`/account/profile`}
          component={Profile}
          layout={DashboardLayout}
        />
        <RouteWithLayout
          path={`/account/Livedata`}
          component={UserTracking}
          layout={DashboardLayout}
        />
        <RouteWithLayout
          path={`/account/settings`}
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
      {...rest}x c
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
