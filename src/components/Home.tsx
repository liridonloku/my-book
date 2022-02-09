import React, { Fragment, useState } from "react";
import Header from "./Header";
import StyledHome from "./styles/Home.styled";
import LeftSidebar from "./LeftSidebar";
import NewPost from "./NewPost";
import Post from "./Post";
import RightSidebar from "./RightSidebar";

interface Props {}

const Home: React.FC<Props> = () => {
  //Left Sidebar will be displayed if screen is wider than 1100px
  const [displayLeftSidebar, setdisplayLeftSidebar] = useState(
    window.innerWidth < 1100 ? false : true
  );
  //Right Sidebar will be displayed if screen is wider than 900px
  const [displayRightSidebar, setdisplayRightSidebar] = useState(
    window.innerWidth < 900 ? false : true
  );
  window.addEventListener("resize", () => {
    if (window.innerWidth < 900) {
      setdisplayLeftSidebar(false);
      setdisplayRightSidebar(false);
    } else if (window.innerWidth < 1100) {
      setdisplayLeftSidebar(false);
      setdisplayRightSidebar(true);
    } else {
      setdisplayLeftSidebar(true);
      setdisplayRightSidebar(true);
    }
  });
  return (
    <Fragment>
      <Header />
      <StyledHome>
        {displayLeftSidebar && (
          <div className="left">
            <LeftSidebar />
          </div>
        )}
        <div className="main" data-testid="main">
          <NewPost />
          <Post />
          <Post />
        </div>
        {displayRightSidebar && (
          <div className="right">
            <RightSidebar />
          </div>
        )}
      </StyledHome>
    </Fragment>
  );
};

export default Home;
