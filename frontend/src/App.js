import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
    </Switch>
  </Router>
);

export default App;
