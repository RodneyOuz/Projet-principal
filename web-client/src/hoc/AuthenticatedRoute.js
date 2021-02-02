import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

const mapStateToProps = ({auth: {isLoggedIn}}) => ({
  isLoggedIn
});

const _AuthenticatedRoute = ({component: Component, isLoggedIn, ...rest}) => (
  <Route
    {...rest}
    render={p =>
      isLoggedIn
        ? <Component {...p} />
        : <Redirect
        to={{
          pathname: '/login',
          state: {from: p.location}
        }}
      />}
  />
);

_AuthenticatedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export const AuthenticatedRoute = connect(mapStateToProps)(_AuthenticatedRoute);
