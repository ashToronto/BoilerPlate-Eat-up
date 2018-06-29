import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
   response: []
 };

 componentDidMount() {
   this.callApi()
     .then(res => {
        this.setState({ response: res})
      })
     .catch(err => console.log(err));
 }

 callApi = async () => {
   const response = await fetch('/api');
   const body = await response.json();

   if (response.status !== 200) throw Error(body.message);

   return body;
 };

render() {
   return (
     <div>
      {this.state.response.map(res => (
        <div>
          <h5>{res.name}</h5>
          <h5>{res.rating}</h5>
          <img src={res.image} alt={res.name}  />
        </div>
      ))}
     </div>
   );
 }



 }

 export default App;
