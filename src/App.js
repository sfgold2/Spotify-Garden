// React and CSS Imports
import React from "react";
import "./App.scss";
import "globals/hack-styles.scss";

// ** we added
import axios from "axios";
import {useState} from "react";

// Installed dependency imports
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// Website imports for classes you made
import { Card } from "app/containers";

function SampleCard() {

    // ** we added
    
    const [data, setData] = useState(null);

    var token = "BQAkbZMbEkp7uH86SRuTK90-3MRK1IdgquaV4aXme04mwh7aFOMVbeyE67Y2q6au-C4OWMXuJ_qpMVyrqAFhQkcq0SZA7N0yIm0UbU7QShPgI5fbsMcqdPR16kWlPvYfI-8tdu0jwGo3u1jdLtVs";
    
    axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=1&offset=1", 
      {
        headers: {
            Accept: "application/json", 
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
      }
    ).then(function(response){
        //console.log(response.data)
        setData(response.data);
      }
    );

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
            component={SampleCard}
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
