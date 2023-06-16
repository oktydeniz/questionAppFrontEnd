import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { Radio } from "@mui/material";

export default function AvatarUI() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>
        <Card sx={{
        maxWidth:345,
        height:330,
        marginTop:2,
        marginLeft:2,
        }}>
          <CardMedia
            sx={{ height: 200 }}
            image="/resources/avatar1.png"
            title="user avatar"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              userName
            </Typography>
            <Typography variant="body2" color="text.secondary">
              User Info 
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={handleOpen} size="small">Change Avatar</Button>
            <BasicModal open={open} handleOpen={handleOpen} handleClose={handleClose}></BasicModal>
          </CardActions>
        </Card>
        </>

      );
}

const BasicModal = ({open, handleOpen, handleClose }) =>  {
    const [checked, setChecked] = React.useState([1]);
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 1,
        p: 2,
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
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
          <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Radio
                edge="end"
                //onChange={handleToggle(value)}
               // checked={selectedAvatar(value)}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/resources/avatar${value + 1}.png`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
          </Box>
        </Modal>
      </div>
    );
  }