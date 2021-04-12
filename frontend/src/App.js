import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import CreateRecipe from "./pages/CreateRecipe";
import NavHeader from "./components/NavHeader";
import CreateIngredient from "./pages/CreateIngredient";
import Settings from "./pages/Settings";
<<<<<<< HEAD
import CreateComment from "./pages/CreateComment";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/createaccount" component={CreateAccount} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/comments" component={CreateComment} />
    </Switch>
  </Router>
=======
import Home from "./pages/Home";

const App = () => (
  <div>
    <NavHeader />
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/createaccount" component={CreateAccount} />
        <Route exact path="/create-recipe" component={CreateRecipe} />
        <Route exact path="/create-ingredient" component={CreateIngredient} />
        <Route exact path="/settings" component={Settings} />
      </Switch>
    </Router>
  </div>
>>>>>>> 57aa8dcfd8def6f373bbff85adc8ee180c0ebb50
);

export default App;
