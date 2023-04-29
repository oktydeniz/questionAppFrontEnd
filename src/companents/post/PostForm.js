import "./post.scss";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core";
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const classes = makeStyles((theme) => ({
  links: {
    textDecoration: "none",
    boxShadow: "none",
    margin: 20,
    color: "white",
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostForm(props) {
  const { post, userId, refreshData } = props;
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [isSend, setIsSend] = React.useState(false);

  const handleSubmit = (e) => {
    savePost();
    setIsSend(true);
    if (refreshData) {
      refreshData();
      setText("");
      setTitle("");
    }
  };

  const savePost = () => {
    fetch("/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        userId: userId,
        text: text,
      }),
    })
      .then((response) => {
        response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTitle = (value) => {
    setTitle(value);
    setIsSend(false);
  };

  const handleText = (value) => {
    setText(value);
    setIsSend(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSend(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div>
      <Snackbar open={isSend} autoHideDuration={1300} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Your Post is Send !
        </Alert>
      </Snackbar>

      <Card className="card" sx={{ width: 800 }}>
        <CardHeader
          sx={{
            textAlign: "left !important",
          }}
          avatar={
            <Link className="link" to={{ pathname: "/users/" + post.userId }}>
              <Avatar
                sx={{
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  color: "white",
                }}
                aria-label="recipe"
              >
                {post.userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }
          title={
            <OutlinedInput
              fullWidth
              id="outlited-adorment-amount"
              multiline
              value={title}
              placeholder="Title"
              onChange={(i) => handleTitle(i.target.value)}
              inputProps={{ maxLength: 25 }}
            ></OutlinedInput>
          }
        />
        <CardContent
          sx={{
            textAlign: "left !important",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <OutlinedInput
              fullWidth
              id="outlited-adorment-amount"
              multiline
              placeholder="Text"
              value={text}
              onChange={(i) => handleText(i.target.value)}
              inputProps={{ maxLength: 255 }}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    varyant="contained"
                    onClick={(e) => handleSubmit(e)}
                    style={{
                      background:
                        "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                      color: "white",
                    }}
                  >
                    POST
                  </Button>
                </InputAdornment>
              }
            ></OutlinedInput>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
