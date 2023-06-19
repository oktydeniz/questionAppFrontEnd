import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { PuthWithAuth } from "../../services/HttpService";
export default function AvatarUI({ userAvatarId, userId, userName }) {
  const [open, setOpen] = React.useState(false);
  const [avatarId, setAvatarId] = React.useState(userAvatarId);

  const handleProfileChange = (value) => {
    setAvatarId(value);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    fetchAvatar();
  };
  const fetchAvatar = () => {
    PuthWithAuth("/users/" + localStorage.getItem("currentUser"),{
      avatar: avatarId,
    })
      .then((res) => res.json())
      .then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          width: 345,
          height: 435,
          marginTop: 2,
          marginLeft: 2,
        }}
      >
        <CardMedia
          sx={{ height: 300 }}
          image={`/resources/avatar${avatarId}.png`}
          title="user avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            User Info
          </Typography>
        </CardContent>
        <CardActions>
          {
            localStorage.getItem("currentUser") == userId ? <Button onClick={handleOpen} size="small">
            Change Avatar
          </Button> : null
          }
          <BasicModal
            open={open}
            handleOpen={handleOpen}
            handleProfileChange={handleProfileChange}
            handleClose={handleClose}
          ></BasicModal>
        </CardActions>
      </Card>
    </>
  );
}

const BasicModal = ({ open, handleOpen, handleClose, handleProfileChange }) => {
  const [checked, setChecked] = React.useState(0);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 1,
    p: 2,
  };

  const handleToggle = (value) => () => {
    setChecked(value);
    if (handleProfileChange) {
      handleProfileChange(value);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <List
            dense
            sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}
          >
            {[0, 1, 2, 3, 4].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem
                  style={{
                    background:
                      checked === value + 1
                        ? "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
                        : null,
                  }}
                  onClick={handleToggle(value + 1)}
                  key={value}
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${value + 1}`}
                        src={`/resources/avatar${value + 1}.png`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      style={{
                        color: checked === value + 1 ? "white" : "black",
                      }}
                      id={labelId}
                      primary={`Avatar ${value + 1}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Modal>
    </div>
  );
};
