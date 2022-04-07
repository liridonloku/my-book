import React, { Fragment, useEffect, useState } from "react";
import useLoginStatus from "../helpers/useLoginStatus";
import Header from "./Header";
import StyledHome from "./styles/Home.styled";
import LeftSidebar from "./LeftSidebar";
import NewPost from "./NewPost";
import Post from "./Post";
import RightSidebar from "./RightSidebar";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { PostData } from "../app/features/posts/posts";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAuth } from "firebase/auth";
import { login } from "../app/features/user/user";

interface Props {}

const Home: React.FC<Props> = () => {
  const user = useAppSelector((state) => state.user);
  useLoginStatus(user);

  const dispatch = useAppDispatch();

  const friends = useAppSelector((state) => state.friends.data);
  const posts = useAppSelector((state) => state.posts.data);

  const [relevantPosts, setrelevantPosts] = useState<PostData[]>([]);
  const [hasMore, sethasMore] = useState(true);

  useEffect(() => {
    const filteredPosts = posts.filter(
      (post) => post.userId === user.id || friends.includes(post.userId)
    );
    setrelevantPosts(filteredPosts.slice(0, 5));
    if (filteredPosts.length <= 5) {
      sethasMore(false);
    }
  }, [friends, posts, user.id]);

  useEffect(() => {
    if (!user.name) {
      const newUser = getAuth().currentUser;
      if (newUser) {
        const name = newUser.displayName || "";
        const email = newUser.email || "";
        const id = newUser.uid;
        const photoUrl = newUser.photoURL || "";
        dispatch(login({ name, id, email, photoUrl }));
      }
    }
  }, [dispatch, user.name]);

  const addMore = () => {
    //Filter unaccessible posts
    const filteredPosts = posts.filter(
      (post) => post.userId === user.id || friends.includes(post.userId)
    );
    if (relevantPosts.length >= filteredPosts.length) {
      sethasMore(false);
      return;
    }
    const postsToAdd = filteredPosts.slice(
      relevantPosts.length,
      relevantPosts.length + 5
    );
    setTimeout(() => {
      setrelevantPosts((previous) => previous.concat(postsToAdd));
    }, 500);
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
          <InfiniteScroll
            dataLength={relevantPosts.length}
            next={addMore}
            hasMore={hasMore}
            loader={
              <div className="loading-posts">
                <div className="lds-dual-ring"></div>
              </div>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>No posts to show...</p>
            }
          >
            {relevantPosts.map((post) => (
              <Post key={post.postId} post={post} />
            ))}
          </InfiniteScroll>
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
