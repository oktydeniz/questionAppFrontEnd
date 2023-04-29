import ReactDOM from "react-dom";
import "./post.scss";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentIcon from "@mui/icons-material/Comment";
import { makeStyles } from "@material-ui/core";
import { Container } from "@mui/system";
import Comments from "../comment/Comment";
import CommentForm from "../comment/CommentForm";

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

export default function Post(props) {
  const { post, userId } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(post.likes.length);
  const [error, setError] = React.useState(false);
  const [likeId, setLikeId] = React.useState(null);
  const isInitializedMount = React.useRef(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshData();
  };
  const refreshData = () => {
    fetch(`/comments?postId=${post.id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setComments(result);
          setIsLoaded(true);
          setError(false);
        },
        (e) => {
          console.log(e);
          setIsLoaded(true);
          setError(true);
        }
      );
  };

  React.useEffect(() => {
    if (isInitializedMount.current) {
      isInitializedMount.current = false;
    } else {
      refreshData();
    }
  }, [comments]);

  const handleClick = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setLikeCount(likeCount + 1);
      saveLike();
    } else {
      setLikeCount(likeCount - 1);
      deleteLike();
    }
  };

  const saveLike = () => {
    fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: post.id,
        userId: userId,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteLike = () => {
    fetch("/likes/" + likeId, {
      method: "DELETE",
    }).catch((error) => {
      console.log(error);
    });
  };

  const checkLikes = () => {
    var control = post.likes.find((like) => like.userId === userId);
    if (control != null) {
      setLikeId(control.id);
      setIsLiked(true);
    }
  };

  React.useEffect(() => {
    checkLikes();
  }, []);

  return (
    <Card className="card" sx={{ width: 800 }}>
      <CardHeader
        sx={{
          textAlign: "left !important",
        }}
        avatar={
          <Link className="link" to={{ pathname: "/users/" + post.userId }}>
            <Avatar
              sx={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
              }}
              aria-label="recipe"
            >
              {post.userName.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }
        title={post.title}
      />
      <CardContent
        sx={{
          textAlign: "left !important",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {post.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleClick} aria-label="add to favorites">
          <FavoriteIcon style={isLiked ? { color: "red" } : null} />
        </IconButton>
        {likeCount}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container fixed className={classes.container}>
          {error
            ? "Error"
            : true
            ? comments.map((comment) => (
                <Comments
                  key={comment.id}
                  post={post}
                  comment={comment}
                ></Comments>
              ))
            : "Loading"}
          <CommentForm post={post}></CommentForm>
        </Container>
      </Collapse>
    </Card>
  );
}
