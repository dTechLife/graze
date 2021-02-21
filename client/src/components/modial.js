import React, { Component, useState, setState } from "react";

const url = "127.0.0.1";

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
      //let quantity = event.target.quantity.value;
      //let meal_type = event.target.meal_type.value;
      //let location = event.target.location.value;
      //let unit = event.target.unit.value;
      //let expires = event.target.expires.value;
      let id = event.target.id.value;


      updatePost({
        name: name,
        //quantity: quantity,
        //meal_type: meal_type,
        //location: location,
        //unit: unit,
        //expires: expires,
        id: id,
      });
    };

    const handleChange = (event) => {
        event.preventDefault();

      this.setState({ [event.target.name]: event.target.value });
    };

    let readyMeals = this.props.readyMeals.data;

    return (
      <div id="readyMealsForm">
        {readyMeals.map((meal) => {
          if (meal.id.toString() === this.props.id) {
            //console.log(this.state.formData.name)
            return (
              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    name="name"
                    onChange={handleChange}
                    value={this.state.value}
                    defaultValue={meal.name}
                  ></input>
                  <input
                    name="id"
                    onChange={handleChange}
                    defaultValue={meal.id}
                  ></input>
                  |{meal.id} {meal.date_added}
                  {console.log(this.state)}
                  <button type="submit"></button>
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
