import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import TaxForm from "./components/TaxForm";
import TaxPaid from "./components/TaxPaid";
import SelectPolicies from "./components/SelectPolicies";
import PolicyDetails from "./components/PolicyDetails";
import BookPolicy from "./components/BookPolicy";
import Confirmation from "./components/Confirmation";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" exact component={Home} />
          <Route path="/taxform" exact component={TaxForm} />
          <Route path="/taxpaid" exact component={TaxPaid} />
          <Route path="/selectpolicies" exact component={SelectPolicies} />
          <Route path="/policydetails" exact component={PolicyDetails} />
          <Route path="/bookpolicy" exact component={BookPolicy} />
          <Route path="/confirmation" exact component={Confirmation} />
        </div>
      </Router>
    );
  }
}

export default App;
