import React, {Component} from 'react';
import axios from 'axios';
import {backend_url} from "../constants/backend";
import {successfulLogin} from "../actions/auth";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class _Signup extends Component {

  state = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    photoURL: 'https://www.american.edu/uploads/profiles/large/chris_palmer_profile_11.jpg',
  };

  validate = () =>
    this.state.displayName
    && this.state.email
    && this.state.password
    && this.state.password === this.state.confirmPassword;

  update = event =>
    this.setState({[event.target.name]: event.target.value});

  post = e => {
    e.preventDefault();
    if(this.validate()){
      this.signup();
      // console.log(this.state);
    } else {
      alert('Formulaire invalide');
    }
  };

  signup = () => {
    axios({
      method: 'post',
      url: `${backend_url}/auth/signup`,
      data: this.state,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(({data}) => {
        if(data.token){
          this.props.login(data.token);
        }
      });
  };

  render(){
    return (
      <div className="row">
        {this.props.isLoggedIn && <Redirect to={{pathname: '/'}}/>}
        <form className="col s12" onSubmit={this.post}>
          <img alt="profile" src={this.state.photoURL} />
          <div className="row">
            <div className="input-field col s12">
              <input
                name="photoURL"
                placeholder="Photo de profil"
                type="text"
                onChange={this.update}
                className="validate" />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="displayName"
                placeholder="Nom et prénom"
                type="text"
                onChange={this.update}
                className="validate" />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="email"
                placeholder="Adresse email"
                type="email"
                onChange={this.update}
                className="validate" />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                minLength={4}
                name="password"
                placeholder="Mot de passe"
                type="password"
                onChange={this.update}
                className="validate" />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                minLength={4}
                name="confirmPassword"
                placeholder="Mot de passe"
                type="password"
                onChange={this.update}
                className="validate" />
            </div>
          </div>
          <div className="row">
            <button className="btn">S'inscrire</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: token => dispatch(successfulLogin(token))
});

const mapStateToProps = ({auth}) => ({
  ...auth
});

export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup);
