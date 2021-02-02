import React from 'react';
import {apiGET} from "../hoc/get";
import {connect} from "react-redux";
import {logout} from "../actions/auth";
import {Link} from "react-router-dom";

const _Users = ({data, user_id, makeRequest, logout}) =>
  <div>
    <table className="striped">
      <thead>
      <tr>
        <th>ID</th>
        <th>displayName</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
      </thead>

      <tbody>
      {data.map(user=>
        <tr key={user.id}>
          <td>{user.id}</td>
          <td><Link to={`/users/${user.id}`}>{user.displayName} {user.id === user_id ? <strong>(vous)</strong> : null}</Link></td>
          <td>{user.email}</td>
          <td>
            <button
              onClick={() => {
                makeRequest('delete', `/users/${user.id}`);
                if(user.id === user_id){
                  logout();
                }
              }}
              className="btn">
              Supprimer
            </button>
          </td>
        </tr>
      )}
      </tbody>
    </table>
  </div>;

const mapStateToProps = ({auth}) => ({...auth});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export const Users = connect(mapStateToProps, mapDispatchToProps)(apiGET('/users')(_Users));
