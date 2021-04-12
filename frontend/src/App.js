import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/feed" component={Feed} />
      <Route exact path="/createpost" component={CreatePost} />
    </Switch>
  </Router>
);

export default App;
