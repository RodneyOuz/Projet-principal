import React, {Component} from 'react';
import {apiGET} from "../hoc/get";
import {QueryLink} from "./QueryLink";
import {logout} from "../actions/auth";
import {connect} from "react-redux";

const isAdminOrSelf = (user, id) =>
  id == user.user_id || user.isAdmin;

class _User extends Component {

  state = {
    displayName: '',
    photoURL: '',
    email: '',
    editMode: false,
    oldPassword: '',
    password: ''
  };

  componentDidMount(){
    this.props.makeRequest('get', `/users/${this.props.match.params.id}`, null, 'user');
  }

  resetPassword = () =>
    [prompt('Reset le password')]
      .map(password => {
        this.props.makeRequest('put', `/reset/${this.props.match.params.id}`, {password})
      });

  setEditMode = () => {
    this.setState({
      editMode: true,
      ...this.props.user
    });
  };

  deleteProfile = () => {
    this.props.makeRequest('delete', `/users/${this.props.match.params.id}`);
    if(this.props.match.params.id == this.props.user.id){
      this.props.logout();
    }
    this.props.history.push('/');
  };

  setNormalMode = () => {
    this.props.makeRequest('put', `/users/${this.props.match.params.id}`, this.state, 'user');
    this.setState({
      editMode: false,
    });
  };

  update = ({target}) =>
    this.setState({[target.name]: target.value});

  getButton = () =>
    !this.state.editMode ?
      <span>
        <button
          onClick={this.setEditMode}
          className="btn">Editer</button>
        <button
          className="btn"
          onClick={this.deleteProfile}>
          Supprimer (Action irréversible)
        </button>
      </span>
      :
      <button
        onClick={this.setNormalMode}
        className="btn">Sauvegarder</button>;

  render(){
    const {user, match: {params: {id}}, loggedInUser, isAdmin} = this.props;
    const {displayName, photoURL, email, editMode, password, oldPassword} = this.state;
    if(!user) return null;
    const {dogs = []} = user;
    return (
      <div className="section">
        {(isAdmin || id == user.id)
        && this.getButton()}
        {isAdmin
        ? <button
            onClick={this.resetPassword}
            className="btn">Reset le password</button> : null}
        <div className="card">
          <figure className="card-profile-image">
            <img
              className="circle z-depth-2 responsive-img activator"
              src={user.photoURL}
              alt="profile image"/>
            {editMode
            && <input
              placeholder="Photo de profil"
              type="text"
              name="photoURL"
              onChange={this.update}
              value={photoURL}/>}
          </figure>
          <div className="card-content">
            <div className="row">
              <div className="col s3 offset-s2">
                <h4 className="card-title grey-text text-darken-4">
                  {user.displayName}
                </h4>
                {editMode
                && <input
                  placeholder="Photo de profil"
                  type="text"
                  name="displayName"
                  onChange={this.update}
                  value={displayName}/>}
                <p className="medium-small grey-text">
                  {user.isAdmin ? 'Administrateur' : 'Utilisateur'}
                </p>
              </div>
              <div className="col s2 cent-align">
                <h4 className="card-title grey-text text-darken-4">
                  {dogs.length}
                </h4>
                <p className="medium-small grey-text">
                  Chiens
                </p>
              </div>
            </div>
            {
              editMode
              &&
                <div>
                  <input
                    placeholder="email"
                    type="text"
                    name="email"
                    onChange={this.update}
                    value={email}/>
                  <input
                    placeholder="Ancien password"
                    type="password"
                    name="oldPassword"
                    onChange={this.update}
                    value={oldPassword}/>
                  <input
                    placeholder="Nouveau password"
                    type="password"
                    name="password"
                    onChange={this.update}
                    value={password}/>
                </div>
            }
            <QueryLink
              to={{
               pathname: '/dogs',
                query: {
                 user_id: user.id
                }
              }}>
              <button className="btn">Voir les chiens</button>
            </QueryLink>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const mapStateToProps = ({auth}) => auth;

export const User = connect(mapStateToProps, mapDispatchToProps)(apiGET('/users')(_User));
