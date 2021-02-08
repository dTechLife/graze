import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {

  callAPI() {
    fetch("http://localhost:9000/testAPI/readyfood/")
        .then(res => res.json()) 
        .then(json => this.setState({ 
          isLoaded: 'true',
          readyMeals: json }));
  }

  constructor(props) {
    super(props);
    this.state = { readyMeals: {} };
  }
  
  componentDidMount() {
    this.callAPI();
  }

render(){
const {  isLoaded, readyMeals }  = this.state;
console.log(readyMeals)
if (!isLoaded){
  return <div>Loading...</div>
}
  return (
    <div className="App">
      {readyMeals.data.map (data => (
      <li key={data.id}>{data.name} | {data.quantity} | added: {data.date_added}</li>
      ))}
    </div>
  );
}
}
export default App;
