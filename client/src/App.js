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
    this.state = { 
      readyMeals: {},
      name: ''
      

    };
  }
  
  componentDidMount() {
    this.callAPI();
  }

  
render(){
const {  isLoaded, readyMeals, name }  = this.state;


const callAPI = () =>{
  fetch("http://localhost:9000/testAPI/readyfood/")
      .then(res => res.json()) 
      .then(json => this.setState({ 
        isLoaded: 'true',
        readyMeals: json }));
}

const handleChange = (event) => { //set the state to the value of the event 
  //console.log(this.state);
  //console.log(event.target.value);
  this.setState({[event.target.name]:event.target.value});

}

function createPost (opts){
  var x = JSON.stringify(opts)
  console.log (x);
  fetch('http://localhost:9000/testAPI/readyfood',{
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(opts)
  }).then(function(response){
      callAPI();

    return response.json();
  })
}

const handleSubmit = event => {  //send post request 
  event.preventDefault();
  let data = this.state.name;
  let quantity = this.state.quantity;
  console.log(`data: ${data}`)
  if (data){
    createPost({
      name: data,
      quantity: quantity,
    })
  }

  /*  let data =this.state.name;
  console.log(`data: ${data}`)
  alert('Form submitted: ' + this.state.name )
  fetch('http://localhost:9000/testAPI/readyfood',{
    method: 'POST',
    //convert react state to JSON and send it as body of POST
    body: data
  }).then(function(response) {
    console.log(response)
    return response.json();
    })
*/
//[Object: null prototype] { name: 'Cucumbers', quantity: '2' }
}

if (!isLoaded){
  return <div>Loading...</div>
}
  return (
    <div className="App">
      <div>
      {readyMeals.data.map (data => (
      <li key={data.id}>{data.name} | {data.quantity} | added: {data.date_added}</li>
      ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              <p>Name</p>
              <input name="name" value={this.state.value} onChange={handleChange}/>
            </label>
            <label>
              <p>quantity</p>
              <input type="number" name="quantity" value={this.state.value} onChange={handleChange}/>
            </label>
            
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
}
export default App;
