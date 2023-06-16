import React from "react";
import { useParams } from "react-router-dom";
import AvatarUI from "../avatar/Avatar";
function User() {
  const { userId } = useParams();

  return <>
  <AvatarUI></AvatarUI>
  </>;
}

export default User;
