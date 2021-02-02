import React from 'react';
import {connect} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import {logout} from "../actions/auth";

const _Nav = props =>
  <nav>
    <div className="nav-wrapper">
      <Link to="/" className="brand-logo hide-on-med-and-down">Dogemon Go</Link>
      <ul className="right">
        <li><NavLink to="/dogs">Chiens</NavLink></li>
        <li><NavLink to="/breeds">Races</NavLink></li>
        <li><NavLink to="/users">Utilisateurs</NavLink></li>
        {!props.isLoggedIn ?
          <span>
            <li><NavLink to="/login">Se connecter</NavLink></li>
            <li><NavLink to="/signup"> S'inscrire</NavLink></li>
          </span>
          :
          <span>
            <li><NavLink to={`/users/${props.user_id}`}>Mon profil</NavLink></li>
            <li><a onClick={props.logout}>Se déconnecter</a></li>
          </span>
        }
        <li><a href='mailto:root@localhost.com'>Aide</a></li>
      </ul>
    </div>
  </nav>;

const mapStateToProps = ({auth}) => ({...auth});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export const Nav = connect(mapStateToProps, mapDispatchToProps)(_Nav);
