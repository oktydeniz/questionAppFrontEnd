import React from "react";
import { OutlinedInput, makeStyles } from "@material-ui/core";
import { CardContent, InputAdornment } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  comment: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  },
}));

export default function Comments(props) {
  const { comment, post } = props;
  const classes = useStyles();
  return (
    <CardContent className={classes.comment}>
      <OutlinedInput
        disabled
        fullWidth
        id="outlited-adorment-amount"
        startAdornment={
          <InputAdornment position="start">
            <Link
              className={classes.link}
              to={{ pathname: "/users/" + post.userId }}
            >
              <Avatar className={classes.small} aria-label="recipe">
              {post.userName!= null ? post.userName.charAt(0).toUpperCase() : null}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        value={comment.text}
        style={{ color: "black", backgroundColor: "white" }}
      ></OutlinedInput>
    </CardContent>
  );
}
