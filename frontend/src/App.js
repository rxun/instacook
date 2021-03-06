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
import Follows from "./pages/Follows";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Search from "./pages/Search";
import PostDetails from "./pages/PostDetails";

import "./css/app.scss";
import Profile from "./pages/Profile";
import { ProvideAuth } from "./utils/useAuth";
import LikedPosts from "./pages/LikedPosts";

const App = () => {
  return (
    <ProvideAuth>
      <Router>
        <Layout>
          <Navbar />
          <Content className="content-container">
            <Switch>
              <Route exact path="/" component={NewFeed} />
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
              <Route path="/profile" component={Profile} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/post/:id" component={PostDetails} />
              <Route exact path="/follows" component={Follows} />
              <Route exact path="/liked-posts" component={LikedPosts} />
            </Switch>
          </Content>
        </Layout>
      </Router>
    </ProvideAuth>
  );
};

export default App;
