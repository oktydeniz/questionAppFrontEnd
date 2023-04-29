import React from "react";
import { useParams } from "react-router-dom";
function User() {
  const { userId } = useParams();

  return <>User {userId}</>;
}

export default User;