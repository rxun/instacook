import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import CreateRecipe from "./pages/CreateRecipe";
import NavHeader from "./components/NavHeader";
import CreateIngredient from "./pages/CreateIngredient";
import Settings from "./pages/Settings";
import Home from "./pages/Home";

const App = () => (
  <div>
    <NavHeader />
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/feed" component={Feed} />
        <Route exact path="/createpost" component={CreatePost} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/createaccount" component={CreateAccount} />
        <Route exact path="/create-recipe" component={CreateRecipe} />
        <Route exact path="/create-ingredient" component={CreateIngredient} />
        <Route exact path="/settings" component={Settings} />
      </Switch>
    </Router>
  </div>
);

export default App;
