import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {backend_url} from "../constants/backend";
import * as axios from "axios";

export const apiGET = (url, initialData = []) => WrappedComponent =>
  class GetHOC extends Component {
    static contextTypes = {
      store: PropTypes.object,
      router: PropTypes.object,
    };

    constructor(props){
      super(props);
      this.state = {
        data: initialData,
        err: null,
      };
    }

    refresh = () => {
      if(!url) return;
      const {token} = this.context.store.getState().auth;
      axios({
        method: 'get',
        url: `${backend_url}${url}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        }
      }).then(({data}) => this.setState({data}))
        .catch(err => this.setState(err));
    };

    makeRequest = (method, url, data, key) => {
      const {token} = this.context.store.getState().auth;
      axios({
        method,
        url: `${backend_url}${url}`,
        data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        }
      }).then(({data}) => {
        this.refresh();
        if(key){
          this.setState({[key]: data});
        }
      })
        .catch(err => this.setState({err}));
    };

    componentDidMount(){
      // TODO: Cancel the request on componentWillUnmount
      this.refresh();
    }

    render(){
      const props = {makeRequest: this.makeRequest, ...this.props, ...this.state};
      return <WrappedComponent {...props}/>
    }
  };
