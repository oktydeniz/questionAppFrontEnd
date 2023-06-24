import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./navbar.scss";
import { LockOpen } from "@mui/icons-material";

function Navbar() {
  let userId = localStorage.getItem("currentUser");
  let navigate = useNavigate();

  const onclick = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userName");
    navigate(0);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            <Link className="link" to="/">
              Home
            </Link>
          </Typography>
          <Typography variant="h6" component="div">
            {localStorage.getItem("currentUser") == null ? (
              <Link className="link" to={{ pathname: "/auth" }}>
                Login/Register
              </Link>
            ) : (
              <>
                <IconButton className="link" onClick={(e) => onclick(e)}>
                  {" "}
                  <LockOpen style={{ color: "white" }}></LockOpen>
                </IconButton>
                <Link className="link" to={{ pathname: "/users/" + userId }}>
                  Profile
                </Link>
              </>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
