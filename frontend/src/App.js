import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Comments from "./pages/Comments";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/createaccount" component={CreateAccount} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/comments" component={Comments} />
    </Switch>
  </Router>
);

export default App;
