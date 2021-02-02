import React, {Component} from 'react';
import {connect} from "react-redux";
import {successfulLogin} from "../actions/auth";
import {backend_url} from "../constants/backend";
import * as axios from "axios";
import {Redirect} from "react-router-dom";

class _Login extends Component {

  state = {
    email: '',
    password: '',
  };

  validate = () =>
    this.state.email
    && this.state.password;

  update = event =>
    this.setState({[event.target.name]: event.target.value});

  post = e => {
    e.preventDefault();
    if(this.validate()){
      this.login();
    } else {
      alert('Formulaire invalide');
    }
  };

  login = () => {
    axios({
      method: 'post',
      url: `${backend_url}/auth/login`,
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
                name="password"
                placeholder="Mot de passe"
                type="password"
                onChange={this.update}
                className="validate" />
            </div>
          </div>
          <div className="row">
            <button className="btn">Se connecter</button>
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

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);

