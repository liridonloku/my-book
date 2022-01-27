import React, { Fragment } from "react";
import Header from "./Header";
import NewPost from "./NewPost";
import { StyledHome } from "./styles/Home.styled";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <Fragment>
      <Header />
      <StyledHome>
        <div className="left">Left</div>
        <div className="main" data-testid="main">
          <NewPost />
        </div>
        <div className="right">Right</div>
      </StyledHome>
    </Fragment>
  );
};

export default Home;
