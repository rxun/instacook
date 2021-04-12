import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import CreateRecipe from "./pages/CreateRecipe";
import NavHeader from "./components/NavHeader";

const App = () => (
  <div>
    <NavHeader/>
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/createaccount" component={CreateAccount} />
        <Route exact path="/create-recipe" component={CreateRecipe} />
      </Switch>
    </Router>
  </div>
);

export default App;
