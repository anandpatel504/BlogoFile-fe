import React from "react";
import Signup from "./pages/Signup/index";
import Login from "./pages/Login/index";
import Blogs from "./pages/Blogs/index";
import AboutUs from "./pages/AboutUs/index";
import Footer from "./components/Footer/index";
import Layout from "./layout/index";
import Home from "./pages/Home/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./pages/Errors/404";
import Gallery from "./pages/Gallery/index";
import ImageWithModal from "./components/Model/upload";
import Forgot from "./pages/Forgot";
import ResetPassword from "./pages/Reset";

function App() {
  console.log(process.env);
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route
            path="/about"
            component={() => <Layout children={<AboutUs />} />}
          />
          <Route
            path="/blogs"
            component={() => <Layout children={<Blogs />} />}
          />
          <Route
            path="/gallery"
            component={() => <Layout children={<Gallery />} />}
          />
          <Route path="/zomato" component={() => <Layout />} />
          <Route path="/upload" component={() => <ImageWithModal />} />
          <Route path="/forgot_password" component={() => <Forgot />} />
          <Route path="/reset-password/:token" component={() => <ResetPassword />} />
          <Route
            exact
            path="/"
            component={() => <Layout children={<Home />} />}
          />
          <Route path="*" component={() => <NotFound />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
