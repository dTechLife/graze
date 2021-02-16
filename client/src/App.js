import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";


const url = "172.16.1.74"

const size = "1.5em"


class App extends Component {

  callAPI() {
    fetch(`http://${url}:9000/testAPI/readyfood/`)
      .then((res) => res.json())
      .then((json) =>
        this.setState({
          isLoaded: "true",
          readyMeals: json,
        })
      );
  }
 

  constructor(props) {
    super(props);
    this.state = {
      readyMeals: {},
      name: "",
      quantity: "",
      meal_type:"N/A"
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.callAPI(), 2000); //call the api every 2 seconds
  }

  render() {
    const { isLoaded, readyMeals} = this.state;



    const callAPI = () => {
        fetch(`http://${url}:9000/testAPI/readyfood/`)
        .then((res) => res.json())
        .then((json) =>
          this.setState({
            isLoaded: "true",
            readyMeals: json,
          })
        );
    };


    const handleChange = (event) => {
      //set the state to the value of the event
      this.setState({ [event.target.name]: event.target.value });
    };

    function createPost(opts) {
      var x = JSON.stringify(opts);
      console.log(x);
      fetch(`http://${url}:9000/testAPI/readyfood`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(opts),
      }).then(function (response) {
        callAPI();

        return response.json();
      });
    }

    const handleSubmit = (event) => {
      //send post request
      event.preventDefault();
      let data = this.state.name;
      let quantity = this.state.quantity;
      let meal_type = this.state.meal_type;
      let location = this.state.location;
      let unit = this.state.unit;
      let expires= this.state.expires;


      console.log(`data: ${data}`);
      if (data) {
        createPost({
          name: data,
          quantity: quantity,
          meal_type: meal_type,
          location: location,
          unit: unit,
          expires: expires
        });
      }
    };

    const handleDelete = (event) => {
      console.log(event.target.name);
fetch(`http://${url}:9000/testAPI/readyfood/${event.target.name}`, {
        method: "DELETE"
      }).then(function (response) {
        callAPI();

      }
    )};


    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div className="App" style={{fontSize:size}}>
        <div>
          {readyMeals.data.map((data) => (
            <ul key={data.id}>
              <button name={data.id} onClick={handleDelete}>X</button>
              {data.name} | Quantity: {data.quantity} {data.unit} | 
              Location: {data.location}<br/>  Meal Type:{data.meal_type} | added: { new Date(data.date_added).toDateString()} | expires: { new Date(data.expires).toDateString()}
              </ul>
          ))}
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label>
                Name
                <input
                  name="name"
                  value={this.state.value}
                  onChange={handleChange}
                />
              </label><br/>
              <label>
                quantity
                <input
                  type="number"
                  name="quantity"
                  value={this.state.value}
                  onChange={handleChange}
                />
              </label><br/>
              <label>
                unit
                <input
                  name="unit"
                  value={this.state.value}
                  onChange={handleChange}
                />
              </label><br/>
              <label>
                type:
                <select  style={{fontSize:"1em"}}onChange={handleChange} name="meal_type">
                  <option value="N/A">Select one...</option>
                  <option value="breakfast">breakfast</option>
                  <option value="lunch">lunch</option>
                  <option value="supper">supper</option>
                  <option value="snack">snack</option>
                </select>
              </label>

              <label><br/>
                location:
                <select  style={{fontSize:"1em"}}onChange={handleChange} name="location">
                  <option value="N/A">Select one...</option>
                  <option value="Fridge">Fridge</option>
                  <option value="Deep Freeze">Deep Freeze</option>
                  <option value="Counter">Counter</option>
                  <option value="Fridge Freezer">Fridge Freezer</option>
                </select>
              </label>
              <label><br/>
                expires:
                <input name="expires" type="date" value={this.state.value} onChange={handleChange}></input>
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
