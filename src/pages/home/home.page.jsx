import React from "react";
import { Route } from "react-router-dom";
import TagBar from "../../components/tagbar/tagbar.component";
import LatestHomePage from "./components/latest-homepage/latest-homepage";
import SectionHomePage from "./components/section-homepage/section-homepage";

import "./home.styles.scss";

const HomePage = ({ match }) => {
  return (
    <div className="home-page container-fluid text-center p-0">
      <TagBar />
      <Route exact path={`${match.path}`} component={LatestHomePage} />
      <Route exact path={`${match.path}t/:tagId`} component={SectionHomePage} />
    </div>
  );
};

export default HomePage;
