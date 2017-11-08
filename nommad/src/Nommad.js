import React, { Component } from 'react';
import axios from 'axios';
import './css/default.css';
import Nav from './Components/Nav';
import DisplayContainerDesktop from './Components/DisplayContainerDesktop';
// import Profile from './Components/Profile';

class Nommad extends Component {
  constructor(props){
    super(props);
    this.state = {
      isFetchingTrucks: false,
      getRequestData: ''
    }
    this.getFoodTruck = this.getFoodTruck.bind(this);
    this.getZipCode = this.getZipCode.bind(this);
      }
        componentDidMount() {
          this.getFoodTruck('78701');
        }
        getFoodTruck(zip) {
          this.setState({
            isFetchingTrucks: true
          })
          const yelpApi = 'https://nommad-backend.herokuapp.com/api/' + zip;
          axios.get(yelpApi)
             .then((response) => {
               console.log(response);
               let trucksArr = response.data.businesses;
               this.setState({
                 getRequestData: trucksArr
               })
               //Re render it in UI
             }).catch(error => {
               console.log(`Error, ${error}`);
          });
        }
        getZipCode() {
          this.setState({
            getRequestData: ''
          });
          let truckInfoArr = [];

          let zip = document.querySelector("input").value;
          this.getFoodTruck(zip);
          let data = this.state.getRequestData;
            console.log(zip, ' zip');
            data.forEach(obj => {
              // console.log(typeof obj.location.zip_code, ' objects')
              if(obj.location.zip_code === zip) {
                console.log(`Data match`)
                truckInfoArr.push(obj);
              }
            })
            console.log(truckInfoArr, ' data info')
            this.setState({
              getRequestData: truckInfoArr
            });
        }

  render() {
    let truckInfo = this.state.getRequestData;
    let truckInfoArr = [];
    for (var i = 0; i < truckInfo.length; i++){
      // let truck = truckInfo[i];
      truckInfoArr.push(truckInfo[i]);
    }
    return (
      <div className="App">
        <div className="nav-bar">
          <Nav />
          <div className="search">
            <input type="text" placeholder="Search by Zip Code"></input>
            <button type="submit" onClick={this.getZipCode}>Search</button>
          </div>
        </div>

        <DisplayContainerDesktop className="site-info" trucks={truckInfoArr} />

        <footer className="clearfix">
          <p>Made with <span className="heart">♥︎</span> at General Assembly</p>
          <img src={require('./images/yelp-logo.png')} id="yelp-logo" alt="yelp logo" />
        </footer>
      </div>
    );
  }
}

export default Nommad;
