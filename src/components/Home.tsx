import React, { Fragment, useEffect, useState } from "react";
import useLoginStatus from "../helpers/useLoginStatus";
import Header from "./Header";
import StyledHome from "./styles/Home.styled";
import LeftSidebar from "./LeftSidebar";
import NewPost from "./NewPost";
import Post from "./Post";
import RightSidebar from "./RightSidebar";
import { useAppSelector } from "../app/hooks";

interface Props {}

const Home: React.FC<Props> = () => {
  const user = useAppSelector((state) => state.user);
  useLoginStatus(user);

  const people = useAppSelector((state) => state.people.data);

  const posts = useAppSelector((state) => state.posts.data);

  const displayPosts = () => {
    //Get users friendlist
    const person = people.find((person) => person.id === user.id);
    //Filter unaccessible posts
    const filteredPosts = posts.filter(
      (post) =>
        post.userId === user.id || person?.friendList.includes(post.userId)
    );
    const postsToDisplay = filteredPosts.map((post) => {
      return <Post key={post.postId} post={post} />;
    });
    return postsToDisplay;
  };

  //Display sidebars based on screen width
  const [displayLeftSidebar, setdisplayLeftSidebar] = useState(
    window.innerWidth < 1100 ? false : true
  );
  const [displayRightSidebar, setdisplayRightSidebar] = useState(
    window.innerWidth < 900 ? false : true
  );

  const resize = () => {
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
  };
  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
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
          {displayPosts()}
          {posts.length === 0 && (
            <p style={{ textAlign: "center" }}>No posts to show...</p>
          )}
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
