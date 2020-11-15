// React and CSS Imports
import React from "react";
import "./App.scss";
import "globals/hack-styles.scss";
// Installed dependency imports
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// added by lee
import axios from "axios";
import {useState, useEffect} from "react";

// Website imports for classes you made
import { Card } from "app/containers";
import { Flower } from "app/containers";

// added by lee
import { Garden } from "app/containers";

const token = "BQA9bOV-zLKvgPCvQHC4F1fcSZbh2fpwEp3Ewtyla2Us47feE7wkSmNpXqGZjHuu045S7VIV9zKbCpHJ1vS2hzHjoMZjTvXiZh6lvIA0ZhcB3jIb6Ow2iZkhs4KlRioaDTC4Zc_k8J0TLhgGiHYD"

function SongCard() {

    // ** function to find 10 songs and return it as an array
    
    const [songName, setData] = useState(null);

    useEffect( ()=>{
      async function fetchData(){
      let TopSongsAndfeatures = await getTopSongsAndFeatures()
      setData(TopSongsAndfeatures)}
      fetchData()
      }
    , [] )

  return (
    <Card style={{ width: "30vw"}}>
      <p> {songName!=null ? JSON.stringify(songName) : null} </p>
    </Card>
  );
}
/*
      axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=1&offset=1", 
        {
          headers: {
              Accept: "application/json", 
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
          }
        }
      ).then(function(response){
          let map_names = response.data.items.map(x => x.id)
          console.log(map_names)
          setData(map_names);
        }
      );
    }, [])

    return (
      <Card style={{ width: "30vw"}}>
        <p> {data!=null ? JSON.stringify(data) : null} </p>
      </Card>
    );
}

*/

function SongGarden() {
  var characteristics = [["red", 60],["blue", 80]];
  var listItems = [];
  
  for (var i = 0; i < characteristics.length; i++){
    listItems.push(<p class={characteristics[i][0]}> hi </p>);
  }

  return (
    <div>
        {listItems}
    </div>
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


// Riley's Playground
function BasicFlower() {
  return (
    <div class="circle"></div>
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
            component={Flower}
          />
          <Route 
            exact path={"/lee"}
            component={SongGarden}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
