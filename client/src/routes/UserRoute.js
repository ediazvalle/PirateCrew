import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../components/auth/auth';

const UserRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/' />
                )
            }
        />
    )
};

export default UserRoute;
