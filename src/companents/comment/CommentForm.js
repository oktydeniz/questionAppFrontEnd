import React from "react";
import { OutlinedInput, makeStyles } from "@material-ui/core";
import { Button, CardContent, InputAdornment } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { PostWithAuth, RefreshToken } from "../../services/HttpService";
import { useNavigate } from "react-router-dom";
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
  const { comment, post, setCommentRefresh } = props;
  let navigate = useNavigate();
  const [text, setText] = React.useState("");
  const classes = useStyles();

  const handleText = (value) => {
    setText(value);
  };
  const handleSubmit = (value) => {
    sendComment();
    setText("");
    setCommentRefresh();
  };
  const sendComment = () => {
    PostWithAuth("/comments", {
      postId: post.id,
      userId: localStorage.getItem("currentUser"),
      comment: text,
    } )
      .then((res) => {
        if(!res.ok) {
            RefreshToken()
            .then((res) => { if(!res.ok) {
                logout();
            } else {
               return res.json()
            }})
            .then((result) => {
                console.log(result)

                if(result != undefined){
                    localStorage.setItem("token",result.accessToken);
                    sendComment();
                    setCommentRefresh();
                }})
            .catch((err) => {
                console.log(err)
            })
        } else 
        res.json()
    })
      .catch((err) => {
        console.log(err)
      })
  };
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("userName")
    navigate.go(0)
  }
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
              {post.userName!= null ? post.userName.charAt(0).toUpperCase() : null}
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
