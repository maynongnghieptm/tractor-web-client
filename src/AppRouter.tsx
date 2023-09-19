import React from 'react'
import { HashRouter, BrowserRouter, Route, Switch, RouteProps, Redirect } from 'react-router-dom' //
import { useHistory } from 'react-router-dom';
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
import DashboardLayout1 from './_layouts/DashboardLayout/User_layout'
import Homepage from './Dashboard/Homepage'
import { useSelector } from 'react-redux'
import ErrPage from '_common/ErrPage/Unthori';
// Use different router type depending on configuration
const AppRouterComponent: React.FC = ({ children }) => {
  return config.navigationType === 'history' ? (
    <BrowserRouter>{children}</BrowserRouter>
  ) : (
    <HashRouter>{children}</HashRouter>
  )
}

const AppRouter: React.FC = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  console.log(isAdmin)
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
          path={`/user/dashboard`}
          component={Layoutgrid}
          layout={DashboardLayout1}
        />
        {/* */}
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
        component={ErrPage} // Component lỗi (thay thế ErrorComponent bằng tên thực tế của component bạn muốn hiển thị)

      />
    )
  }
/>
        <RouteWithLayout
          path={`/user/account/profile`}
          component={Profile}
          layout={DashboardLayout1}
        />
        <RouteWithLayout
          path={`/user/account/Livedata`}
          component={Layoutgrid}
          layout={DashboardLayout1}
        />
        <RouteWithLayout
          path={`/user/settings`}
          component={() => null}
          layout={DashboardLayout1}
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
