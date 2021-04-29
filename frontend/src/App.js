import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import CreateRecipe from "./pages/CreateRecipe";
import Navbar from "./components/Navbar";
import CreateIngredient from "./pages/CreateIngredient";
import Settings from "./pages/Settings";
import CreateComment from "./pages/CreateComment";
import Home from "./pages/Home";
import NewFeed from "./pages/NewFeed";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Search from "./pages/Search";

import "./css/app.scss";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div>
      <Layout>
        <Navbar />
        <Content className="content-container">
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/feed" component={Feed} />
              <Route exact path="/createpost" component={CreatePost} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/createaccount" component={CreateAccount} />
              <Route exact path="/create-recipe" component={CreateRecipe} />
              <Route
                exact
                path="/create-ingredient"
                component={CreateIngredient}
              />
              <Route exact path="/create-post" component={CreatePost} />
              <Route exact path="/comments" component={CreateComment} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/newfeed" component={NewFeed} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/search" component={Search} />
            </Switch>
          </Router>
        </Content>
      </Layout>
    </div>
  );
};

export default App;
