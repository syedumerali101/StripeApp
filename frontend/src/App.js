import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";

function App() {
  const [product, setProduct] = useState({
    name: "React",
    price: 10,
    productBy: "Facebook",
  });

  const makePayment = (token) => {
    //this is here we hit the frondend for token
    //first we need to design a body
    const body = { token, product };
    const headers = {
      "Content-Type": "application/json",
    };
    //we will fire up a backend here
    return fetch("http://localhost:3000/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response, "response");
        const { status } = response;
        console.log("status", status);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <StripeCheckout
          stripeKey="pk_test_51Ho8xdBakjPsKX7Tu9M9o3YAmm4XQBbh8OyDNsW94h7nHrNpBw5pcAXiQVCDy2DKJKNYuvy8roVyKo2mmDhT79cM00LYSPeI9f"
          token={makePayment}
          name="Buy React"
          // amount = {product.price * 100}
        />
        <button>
          {/* Buy React in just {product.price} $ */}
          Hello
        </button>
        {/* </StripeCheckout> */}
      </header>
    </div>
  );
}

export default App;

// export default class App extends React.Component{
//   state = {
//     loading: true,
//     movies: null
//   };

//   async componentDidMount(){
//     const url = 'https://jsonmock.hackerrank.com/api/movies';
//     const response = await fetch(url);
//     const information = await response.json();
//     this.setState({movies: information.data[0], loading: false})
//     console.log(information.data[0]);
//   }

//   render(){
//     return(
//       <div>
//         {this.state.loading || !this.state.Title ? <div>loading...</div> : <div><div>{this.state.Title}</div></div>}
//       </div>
//     )
//   }
// }
