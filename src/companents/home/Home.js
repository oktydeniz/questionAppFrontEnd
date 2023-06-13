import React, { useEffect, useState } from "react";
import Post from "../post/post";
import "./home.scss";
import { makeStyles } from "@material-ui/core";
import PostForm from "../post/PostForm";

const classes = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f5ff",
  },
}));
export default function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [postList, setPostList] = useState([]);

  const refreshData = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (e) => {
          console.log(e);
          setError(e);
          setIsLoaded(true);
        }
      );
  };

  useEffect(() => {
    refreshData();
  }, [postList]);

  if (error) {
    return <>error</>;
  } else if (!isLoaded) {
    return <> Loading ...</>;
  } else {
    return (
      <div fixed className={classes.container}>
        {localStorage.getItem("currentUser") == null ? null : 
        <PostForm
          key={12}
          userId={localStorage.getItem("currentUser")}
          refreshData={refreshData}
          post={{ userName: localStorage.getItem("userName") }}
        />
      }
        {postList.map((post) => (
          <Post userId={localStorage.getItem("currentUser")} key={post.id} post={post}></Post>
        ))}
      </div>
    );
  }
}
