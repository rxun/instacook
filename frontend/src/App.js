import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import CreateRecipe from "./pages/CreateRecipe";
import NavHeader from "./components/NavHeader";
import CreateIngredient from './pages/CreateIngredient';

const App = () => (
  <div>
    <NavHeader/>
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/createaccount" component={CreateAccount} />
        <Route exact path="/create-recipe" component={CreateRecipe} />
        <Route exact path="/create-ingredient" component={CreateIngredient} />
      </Switch>
    </Router>
  </div>
);

export default App;
