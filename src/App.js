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

function SongCard() {

    // ** we added
    
    const [data, setData] = useState(null);

    useEffect(()=>{
      var token = "BQAPXC3x0Z1PWE3yYRZ9nUnG8PFv7zexMDlTCMYu3O9VvoNxZR_btztnaS7akIoFpFe5f_ZL6Z4m2HyX1szMC1U1BNti4ToXwe_hyvnkULoomtAUwEswYB5nr85Khro5wdRWZeUQcHZanSMTVO17";

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

function OtherCard() {
  return (
    <Card style={{ width: "30vw"}}>
      <h1>
        Other Page!
      </h1>
      <p>
        Howdy
      </p>
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
            exact path={"/other"}
            component={OtherCard}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
