import React, { Component, useState, setState } from "react";

const url = "172.16.1.174";
//const url ="localhost"
class Modial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const updatePost = (opts) => {
      let id = opts.id;

      var x = JSON.stringify(opts);
      console.log(x);
      fetch(`http://${url}:9000/testAPI/readyfood/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(opts),
      }).then(function (response) {
        return response.json();
      });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      let name = event.target.name.value;
      let quantity = event.target.quantity.value;
      //let meal_type = event.target.meal_type.value;
      //let location = event.target.location.value;
      let unit = event.target.unit.value;
      let expires = event.target.expires.value.toString();
      let id = this.props.id;

      updatePost({
        name: name,
        quantity: quantity,
        //meal_type: meal_type,
        //location: location,
        unit: unit,
        expires: expires,
        id: id,
      });
    };

    const handleChange = (event) => {
      event.preventDefault();

      this.setState({ [event.target.name]: event.target.value });
    };

    let readyMeals = this.props.readyMeals.data;
    console.log(readyMeals);
    return (
      <div id="readyMealsForm">
        {readyMeals.map((meal) => {
          if (meal.id.toString() === this.props.id) {
            //console.log(this.state.formData.name)
            return (
              <div>
                <form onSubmit={handleSubmit}>
                  <label>
                    Name:
                    <input
                      name="name"
                      onChange={handleChange}
                      value={this.state.value}
                      defaultValue={meal.name}
                    ></input>
                  </label>
                  <br />
                  <label>
                    Quantity:
                    <input
                      name="quantity"
                      type="number"
                      onChange={handleChange}
                      defaultValue={meal.quantity}
                    ></input>
                  </label>
                  <label>
                    <input
                      name="unit"
                      onChange={handleChange}
                      value={this.state.value}
                      defaultValue={meal.unit}
                    ></input>
                  </label>
                  <br />
                  <label>
                    Expires:
                    <input
                      name="expires"
                      type="date"
                      value={this.state.value}
                      defaultValue={meal.expires}
                    ></input>
                  </label>
                  <br />
                  <br />
                  {console.log(this.state)}
                  <button type="submit">Submit</button>
                </form>
              </div>
            );
          } else {
            //console.log("id: "+props.id)
          }
        })}
      </div>
    );
  }
}
export default Modial;
