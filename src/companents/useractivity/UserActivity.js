import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Post from "../post/post";
import { PostWithAuth, GetWithAuth } from "../../services/HttpService";

export default function UserActivity({ userId }) {
  const [page, setPage] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [currentPost, setClickedPost] = React.useState();
  const [rows, setActivityList] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleSelectedPost = (id) => {
    GetWithAuth("/posts/" + id)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setClickedPost(result);
          console.log(result);
          handleClickOpen();
        },
        (err) => {
          console.log(err);
          setIsLoaded(true);
          setError(err);
        }
      );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigateTo = (e, row) => {
    handleSelectedPost(row[1]);
  };

  const getActivities = () => {
    GetWithAuth("/users/activity/" + userId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setActivityList(result);
          console.log(result);
        },
        (err) => {
          console.log(err);
          setIsLoaded(true);
          setError(err);
        }
      );
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <Paper sx={{ width: "30%", overflow: "hidden", height: 300 }}>
      <TableContainer sx={{ height: 250 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>User Activity</TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <>
                  <TableRow
                    onClick={(e) => navigateTo(e, row)}
                    hover
                    role="text"
                    tabIndex={-1}
                    key={row.code}
                  >
                    {row[3] + " " + row[0] + " your post"}
                  </TableRow>
                  <OpenDialog
                    open={open}
                    handleClose={handleClose}
                    post={currentPost}
                  />
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OpenDialog = ({ open, handleClose, post }) => {
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Post post={post}></Post>
      </Dialog>
    </div>
  );
};
