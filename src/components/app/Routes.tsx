import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { ICurrentUserState } from '../../types/IGlobalState';
import HeaderComponent from '../header/HeaderComponent';
import FooterComponent from '../footer/FooterComponent';
import LoginPage from '../../pages/login/LoginPage';
import LogoutPage from '../../pages/logout/LogoutPage';
import HomePage from '../../pages/home/HomePage';
import CustomersPage from '../../pages/customers/CustomersPage';


type TRoutesComponent = {
    currentUser: ICurrentUserState;
};

const RoutesComponent = (props: TRoutesComponent) => (
    <Switch>
        <PrivateRoute exact={true} path="/" component={HomePage} user={props.currentUser} />
        <PrivateRoute exact={true} path="/customers" component={CustomersPage} user={props.currentUser} />
        <Route exact={true} path="/login" component={LoginPage as any} />
        <Route exact={true} path="/logout" component={LogoutPage as any} />
    </Switch>
);

type TPrivateRoute = {
    component: React.Component|React.StatelessComponent;
    user: ICurrentUserState;
    path: string;
    exact: boolean;
};
const PrivateRoute = ({component: Component, user, ...rest}: TPrivateRoute) => (
    <div className="container">
        <HeaderComponent user={user} />
        <Route {...rest} render={props => {
            return (
                user 
                    ? PrivateRender(Component) 
                    : <Redirect to="/login" /> 
            ); 
        }} />
        <FooterComponent />
    </div>
);
const PrivateRender = (Component: any) => ( <Component /> );

export default RoutesComponent;
