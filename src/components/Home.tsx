import React, { Fragment } from "react";
import Header from "./Header";
import { StyledHome } from "./styles/Home.styled";

type Props = {};
let array: string[] = [];
for (let i = 0; i < 100; i++) {
  array.push(`Number ${i}`);
}

const Home = (props: Props) => {
  return (
    <Fragment>
      <Header />
      <StyledHome>
        <div className="left">Left</div>
        <div className="main">Middle</div>
        <div className="right">Right</div>
      </StyledHome>
    </Fragment>
  );
};

export default Home;
