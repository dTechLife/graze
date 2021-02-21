import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Modial from "./components/modial";

const url = "localhost";

const size = "1.5em";

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
      meal_type: "N/A",
      modialActive: false,
      display: "none",
      modialID: "",
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.callAPI(), 2000); //call the api every 2 seconds
  }

  render() {
    const { isLoaded, readyMeals, modialActive } = this.state;

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
      console.log({ event });
      let data = this.state.name;
      let quantity = this.state.quantity;
      let meal_type = this.state.meal_type;
      let location = this.state.location;
      let unit = this.state.unit;
      let expires = this.state.expires;

      console.log(`data: ${data}`);
      if (data) {
        createPost({
          name: data,
          quantity: quantity,
          meal_type: meal_type,
          location: location,
          unit: unit,
          expires: expires,
        });
      }
    };

    const handleDelete = (event) => {
      console.log(event.target.name);
      fetch(`http://${url}:9000/testAPI/readyfood/${event.target.name}`, {
        method: "DELETE",
      }).then(function (response) {
        callAPI();
      });
    };

    const openModial = (event) => {
      //this.setState({modialActive:true});
      //let id = event.target.name;
      //console.log(id);

      // Map the state of objects,
      //take the state and plug it in to a form
      //submit the form with a put request.
      this.setState({ display: "block" });
      console.log(this.state);
      console.log("ID:" + event.target.name);
      this.setState({ modialID: event.target.name });
    };

    const closeModial = (event) => {
      this.setState({ display: "none" });
    };

    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div className="App" style={{ fontSize: size }}>
        {
          // console.log(this.state)
        }
        <div style={{ display: this.state.display }} id="modial">
          <div id="modalContent">
            <Modial readyMeals={readyMeals} id={this.state.modialID} />

            <button onClick={closeModial}>X</button>
            <u>
              <p>Edit Modial:</p>
            </u>
          </div>
        </div>

        <div id="time">
          <u>
            <p style={{ textAlign: "right" }}>
              Today: {new Date().toDateString()}
            </p>
          </u>
        </div>

        <div id="listArea">
          {readyMeals.data.map((data) => (
            <ul key={data.id} id="listItem">
              {data.name}
              <button name={data.id} onClick={openModial}>
                {" "}
                Edit
              </button>
              <button name={data.id} onClick={handleDelete}>
                X
              </button>
              <br />
              {data.meal_type} <br />
              Quantity: {data.quantity} {data.unit}
              <br />
              Location: {data.location}
              <br />
              added: {new Date(data.date_added).toDateString()} <br />
              expires: {new Date(data.expires).toDateString()}
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
              </label>
              <br />
              <label>
                quantity
                <input
                  type="number"
                  name="quantity"
                  value={this.state.value}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                unit
                <input
                  name="unit"
                  value={this.state.value}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                type:
                <select
                  style={{ fontSize: "1em" }}
                  onChange={handleChange}
                  name="meal_type"
                >
                  <option value="N/A">Select one...</option>
                  <option value="breakfast">breakfast</option>
                  <option value="lunch">lunch</option>
                  <option value="supper">supper</option>
                  <option value="snack">snack</option>
                </select>
              </label>

              <label>
                <br />
                location:
                <select
                  style={{ fontSize: "1em" }}
                  onChange={handleChange}
                  name="location"
                >
                  <option value="N/A">Select one...</option>
                  <option value="Fridge">Fridge</option>
                  <option value="Deep Freeze">Deep Freeze</option>
                  <option value="Counter">Counter</option>
                  <option value="Fridge Freezer">Fridge Freezer</option>
                </select>
              </label>
              <label>
                <br />
                expires:
                <input
                  name="expires"
                  type="date"
                  value={this.state.value}
                  onChange={handleChange}
                ></input>
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
