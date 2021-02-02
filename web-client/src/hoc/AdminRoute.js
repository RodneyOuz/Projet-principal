import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

const mapStateToProps = ({auth: {isLoggedIn, isAdmin}}) => ({
  isLoggedIn, isAdmin
});

const _AdminRoute = ({component: Component, isLoggedIn, isAdmin, ...rest}) => (
  <Route
    {...rest}
    render={p =>
      isLoggedIn && isAdmin
        ? <Component {...p} />
        : <Redirect
        to={{
          pathname: '/login',
          state: {from: p.location}
        }}
      />}
  />
);

_AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool
};

export const AdminRoute = connect(mapStateToProps)(_AdminRoute);
