import React, {Component} from 'react';
import {apiGET} from "../hoc/get";
import {connect} from "react-redux";

const BreedLine = ({data, isAdmin, deleteBreed, updateBreed}) =>
  <tr>
    <td>{data.id}</td>
    <td>{data.name}</td>
    <td>
      {isAdmin ? <button onClick={deleteBreed} className="btn">Delete</button> : null}
      <button onClick={updateBreed} className="btn">Editer</button>
    </td>
  </tr>;

class _Breeds extends Component {

  state = {
    name: '',
    updateMode: false,
  };

  addBreed = () => {
    this.props.makeRequest('post', '/breeds', this.state);
    this.setState({
      name: ''
    });
  };

  deleteBreed = id => {
    this.props.makeRequest('delete', `/breeds/${id}`);
  };

  setUpdateMode = (id) => {
    const breed = this.props.data.find(breed => breed.id === id);
    this.setState({
      ...breed,
      updateMode: true,
    });
  };

  setNormalMode = () => {
    this.setState({
      name: '',
      updateMode: false
    });
  };

  update = () => {
    this.props.makeRequest('put', `/breeds/${this.state.id}`, this.state);
    this.setNormalMode();
  };

  render(){
    const {data} = this.props;
    return (
      <div>
        <input
          onChange={event => this.setState({name: event.target.value})}
          type="text"
          value={this.state.name}
          placeholder="Ajouter une race"/>
        {
          !this.state.updateMode ?
            <button
              onClick={this.addBreed}
              className="btn">Ajouter</button>
            :
            <button
              className="btn"
              onClick={this.update}>
              Mettre à jour
            </button>
        }
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
          </tr>
          </thead>
          <tbody>
          {data.map(breed =>
            <BreedLine
              isAdmin={this.props.isAdmin}
              updateBreed={() => this.setUpdateMode(breed.id)}
              deleteBreed={() => this.deleteBreed(breed.id)}
              key={breed.id}
              data={breed}/>)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => ({...auth});

export const Breeds = connect(mapStateToProps)(apiGET('/breeds')(_Breeds));
