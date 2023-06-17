import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AvatarUI from "../avatar/Avatar";
import UserActivity from "../useractivity/UserActivity";
import "./user.scss";
import { makeStyles } from "@material-ui/core";

function User() {
  const { userId } = useParams();
  const [user, setUser] = React.useState();

  const fetchUser = () => {
    fetch("/users/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(
        (res) => {
          console.log(res);
          setUser(res);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="section">
      {user != null ? <AvatarUI userAvatarId={user.avatar}></AvatarUI> : null}
      <UserActivity key="user_activity" userId={userId}></UserActivity>
    </div>
  );
}

export default User;
