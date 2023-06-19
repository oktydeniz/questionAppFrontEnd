import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AvatarUI from "../avatar/Avatar";
import UserActivity from "../useractivity/UserActivity";
import "./user.scss";
import { makeStyles } from "@material-ui/core";
import { GetWithAuth } from "../../services/HttpService";

function User() {
  const { userId } = useParams();
  const [user, setUser] = React.useState();

  const fetchUser = () => {
    GetWithAuth("/users/" + userId,)
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
      {user != null ? <AvatarUI userName={user.userName} userAvatarId={user.avatar} userId={userId} ></AvatarUI> : null}
      {
        localStorage.getItem("currentUser") == userId ? <UserActivity key="user_activity" userId={userId}></UserActivity> : null 
      }
    </div>
  );
}

export default User;
