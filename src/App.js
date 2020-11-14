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

function SampleCard() {

    // ** we added
    
    const [data, setData] = useState(null);

    useEffect(()=>{
      var token = "BQDiEM-kAECnpMaPYpKzmViXOdBxmdWzCE7qutuqHu-S64v82R5Ey8bxBn9drx3mf-SHoyDdrUfayhcqfCifNtLMCgEybI5vGLSVlvW5UlVgJmpYXo8mC0cv05YOVOViAieEqvHSqkNot5vb8fES";

    axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=1&offset=1", 
      {
        headers: {
            Accept: "application/json", 
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
      }
    ).then(function(response){
        console.log(response.data.items)
        setData(response.data.items);
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
