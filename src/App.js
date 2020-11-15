//  TEAM RILEE (Riley & Lee :) )
//  otherwise known as fifteam (team 15)

// template used: Zothacks UCI 2020 React Template 

// React and CSS Imports
import React from "react";
import "./App.scss";
import "globals/hack-styles.scss";

// Installed dependency imports
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// for API/site data
import axios from "axios";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

// imports for classes you made
import { Card } from "app/containers";
import { Flower } from "app/containers";

const authorizationURL = "https://accounts.spotify.com/en/authorize?client_id=351cbabf37f84280ad75451c114a4765&redirect_uri=http://127.0.0.1:3000&response_type=token&scope=user-top-read";

// ============= API SONG DATA RETRIEVAL ==============

// request data about a song with API
async function getSongFeatures(id, token){
  let response = await axios.get("https://api.spotify.com/v1/audio-features/" + id, 
      {
        headers: {
            Accept: "application/json", 
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
      }
    )
  return (response.data)
}

// create a list with each song's mood/tempo data
async function getTopSongsAndFeatures(token) {

  let response = await axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=15&offset=0", 
    {
      headers: {
          Accept: "application/json", 
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
      }
    }
  )
  let FeatureArray = []
  for await(let x of response.data.items){
    let songFeatures = await getSongFeatures(x.id, token);
      FeatureArray.push([x.name, songFeatures["tempo"], songFeatures["energy"]]);
  }
  return FeatureArray
}

// request user's top songs, return data on their songs in array
function SongCard({token}) {
  const [songData, setData] = useState(null);

  useEffect( ()=>{
    async function fetchData(){
      let TopSongsAndfeatures = await getTopSongsAndFeatures(token)
      setData(TopSongsAndfeatures)
    }
    fetchData()
  }
  ,[] )

  return (
    <div className="flex-center">
      <Card > <div> <b> Color : </b>Energy Level <br></br> <br></br> <b>Size:</b> BPM </div></Card>
      <SongGarden characteristics = {songData}/>
    </div>
  );
}


// ============ BUILD FLOWERS ================

// construct flowers out of song data
function SongGarden({characteristics}) {
  
  var listItems = [];
  if (characteristics != null){
    for (var i = 0; i < characteristics.length; i++){ 
      var tempo = characteristics[i][1];
      var energy = characteristics[i][2];
      var pos = (100*i).toString();

      var color = "#554971";
      var size = "1";

      if (energy < .3){
        color = "#554971";
      }
      else if (energy < .4){
        color = "#839D9a";
      }
      else if (energy < .5){
        color = "#BF211E";
      }
      else if (energy < .6){
        color = "#E53d00";
      }
      else if (energy < .8){
        color = "#e76b74";
      }
      else {
        color = "#E9CE2C";
      }

      if (tempo < 90){
        size = ".4";
      }
      else if (tempo < 100){
        size = ".5";
      }
      else if (tempo < 110){
        size = ".8";
      }
      else if (tempo < 120){
        size = ".9";
      }
      else {
        size = "1";
      }

      listItems.push(<Flower key={i} className="flex-split" style = {{backgroundColor: color}} position = {{left: pos+"px", transform: "scale(" + size + ")"}}> </Flower>);

    }
  }
  
  return (
    <div className="wrapper">
        {listItems}
    </div>
  );
}


// ========== SITE NAVIGATION =============

// build start page, if user authenticated -> get token
function StartPage({token, setToken}) {
   
  const history = useHistory();
  if(window.location.hash){
    const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
    window.location.hash = ''; 
    setToken(hash.access_token);
    history.push("/garden");
  }

  return (
        <Card>
            <h1><b> Spotify Garden </b></h1>
            <a href={authorizationURL}><b> Click to Begin</b> </a>
            <h4> Spotify Garden will create a garden for you! <br></br> Each flower's color and size represent's <br></br>the mood and BPM of your recent top 15 songs.</h4>
        </Card>
  );
}

// initalize pages
function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="app flex-center fill-view">
      <Router>
        <Switch>
          <Route exact path={"/"}> 
            <StartPage token={token} setToken={setToken}></StartPage> 
          </Route>
          <Route exact path={"/garden"}> 
            <SongCard token = {token}> </SongCard>
          </Route>          
        </Switch>
      </Router>
    </div>
  );
}

export default App;