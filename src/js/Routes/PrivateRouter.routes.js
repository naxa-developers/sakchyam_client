import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('userToken');
  return (
    <Route
      {...rest}
      render={props =>
        // eslint-disable-next-line prettier/prettier
        token ? <Component {...props} /> : <Redirect to="/login" />}
    />
  );
};
export default PrivateRoute;
