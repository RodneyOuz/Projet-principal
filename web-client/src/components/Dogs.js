import React, {Component} from 'react';
import Select from 'react-select';
import {Link} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";

import {apiGET} from "../hoc/get";
import {backend_url} from "../constants/backend";

import 'react-select/dist/react-select.css';

const shouldDisplayButton = (isAdmin, user_id, data) => data.user_id === user_id || isAdmin;

const DogLine = ({isAdmin, user_id, data, deleteDog, setEditMode}) =>
  <tr>
    <td><img alt="Dog" width="50" src={data.photoURL}/></td>
    <td>
      <Link to={`/dogs/${data.id}`}>{
        data.displayName}
      </Link>
    </td>
    <td>{data.breed.name}</td>
    <td>{shouldDisplayButton(isAdmin, user_id, data) ?
      <span>
        <button className="btn" onClick={deleteDog}>Supprimer</button>
        <button className="btn" onClick={setEditMode}>Editer</button>
      </span>: null}</td>
  </tr>;

class _Dogs extends Component {
  state = {
    displayName: '',
    photoURL: '',
    user_id: this.props.user_id,
    editMode: false,
  };

  getBreeds = () =>
    axios({
      url: `${backend_url}/breeds`,
      headers: {
        'Authorization': this.props.token,
      }
    }).then(({data}) => {
        const res = data
          .map(breed => ({value: breed.id, label: breed.name}));
        console.log(res);
        return {options: res};
      })
      .catch(console.log);

  deleteDog = (id) => {
    this.props.makeRequest('delete', `/dogs/${id}`);
  };

  addDog = () => {
    this.props.makeRequest('post', '/dogs', this.state);
    this.setState({
      displayName: '',
      photoURL: '',
    });
  };

  setEditMode = id => {
    const dog = this.props.data.find(dog => dog.id === id);
    this.setState({
      ...dog,
      editMode: true
    });
  };

  setNormalMode = () => {
    this.setState({
      displayName: '',
      photoURL: '',
      user_id: this.props.user_id,
      editMode: false
    });
  };

  update = () => {
    console.log(this.state);
    this.props.makeRequest('put', `/dogs/${this.state.id}`, this.state);
    this.setNormalMode();
  };

  render() {
    let {data, location, user_id, isAdmin} = this.props;
    const {breed_name, breed_id, displayName, photoURL, editMode} = this.state;
    if(location.query){
      data = data.filter(dog => dog.user_id === location.query.user_id);
    }
    return (
      <div>
        <div className="row">
          <input onChange={event => this.setState({displayName: event.target.value})}
                 type="text"
                 value={displayName}
                 placeholder="Nom du chien"/>
          <input onChange={event => this.setState({photoURL: event.target.value})}
                 type="text"
                 value={photoURL}
                 placeholder="Photo du chien"/>
        </div>
        <Select.Async
          name="breed_id"
          value={{value: breed_id, label: breed_name}}
          onChange={({value: breed_id, label: breed_name}) => this.setState({breed_id, breed_name})}
          loadOptions={this.getBreeds}
        />
        <div className="row">
          {
            !editMode ?
              <button onClick={this.addDog}
                      className="btn">Ajouter
              </button>
              :
              <button
                className="btn"
                onClick={this.update}>
                Update
              </button>
          }
        </div>
        <div className="row">
          <table>
            <thead>
            <tr>
              <th>Photo</th>
              <th>Nom</th>
              <th>Race</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {data.map(dog =>
              <DogLine
                user_id={user_id}
                isAdmin={isAdmin}
                setEditMode={() => this.setEditMode(dog.id)}
                deleteDog={() => this.deleteDog(dog.id)}
                key={dog.id}
                data={dog}/>)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => ({...auth});
export const Dogs = connect(mapStateToProps)(apiGET('/dogs')(_Dogs));
