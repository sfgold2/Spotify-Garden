// React and CSS Imports
import React from "react";
import "./App.scss";
import "globals/hack-styles.scss";

// ** we added
import axios from "axios";
import {useState, useEffect} from "react";

// Installed dependency imports
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// Website imports for classes you made
import { Card } from "app/containers";

const token = "BQCrb0lEfby8kupiV7Upl8wTB3WUChWZSmUEZWu4ZzQAV08Kl48220O0gSU8z19dvpGnOagF-LO8r4Tx5swsfJHGBDIlFIkX_f4jwJrUoHFe2UYQPvLaplo48tUSUa750JfJrTSnW1zj6xY5MA"

function SongCard() {

    // ** function to find 10 songs and return it as an array
    
    const [songName, setData] = useState(null);

    useEffect( ()=>{
async function fetchData(){
let TopSongsAndfeatures = await getTopSongsAndFeatures()
setData(TopSongsAndfeatures)}
fetchData()
}

, [])

  return (
    <Card style={{ width: "30vw"}}>
      <p> {songName!=null ? JSON.stringify(songName) : null} </p>
    </Card>
  );
}

async function getSongFeatures(id){
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
async function getTopSongsAndFeatures() {

  // ** function to get mood and tempo for each song

 let response = await axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=1&offset=1", 
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
    let songFeatures = await getSongFeatures(x.id);
    console.log(songFeatures)
    FeatureArray.push({id: x.id,
      name: x.name,
      features: songFeatures})
  }
  return FeatureArray
}

 function BasicFlower() {

 return (
   <Card style={{ width: "30vw"}}>
     <p> hi riley </p>
   </Card>
);

}

function App() {
  return (
    <div className="app flex-center fill-view">
      <Router>
        <Switch>
          <Route 
            exact path={"/"}
            component={SongCard}
          />
          <Route 
            exact path={"/riley"}
            component={BasicFlower}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
