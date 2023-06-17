import React from "react";
import { OutlinedInput, makeStyles } from "@material-ui/core";
import { Button, CardContent, InputAdornment } from "@mui/material";
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

export default function CommentForm(props) {
  const { comment, post } = props;

  const [text, setText] = React.useState("");
  const classes = useStyles();

  const handleText = (value) => {
    setText(value);
  };
  const handleSubmit = (value) => {
    sendComment();
    setText("");
  };
  const sendComment = () => {
    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        postId: post.id,
        userId: localStorage.getItem("currentUser"),
        comment: text,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  return (
    <CardContent className={classes.comment}>
      <OutlinedInput
        fullWidth
        value={text}
        id="outlited-adorment-amount"
        startAdornment={
          <InputAdornment position="start">
            <Link
              className={classes.link}
              to={{ pathname: "/users/" + post.userId }}
            >
              <Avatar className={classes.small} aria-label="recipe">
                {post.userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <Button
              varyant="contained"
              onClick={(e) => handleSubmit(e)}
              style={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
              }}
            >
              Send
            </Button>
          </InputAdornment>
        }
        onChange={(i) => handleText(i.target.value)}
        inputProps={{ maxLength: 255 }}
        style={{ color: "black", backgroundColor: "white" }}
      ></OutlinedInput>
    </CardContent>
  );
}
