import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const RecipeReviewCard = ({
  event,
  handleRegisterBtn,
  handleDeregisterBtn,
}) => {
  const { userInfo } = useSelector((state) => state.auth);
  const isRegistered = event.registeredUsers.includes(userInfo._id);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 325, minWidth: 325 }}>
      <CardHeader
        title={event.eventName}
        subheader={new Date(event.date).toLocaleDateString()}
      />
      <CardMedia
        component="img"
        height="194"
        image={
          event.photo ||
          "https://res.cloudinary.com/dhnkuonev/image/upload/v1705600831/tx9lsuldgeqmo6ztwjxw.png"
        }
        alt={event.eventName}
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        style={{ marginLeft: "1rem" }}
      >
        <Chip className="mt-2 p-2" label={event.category || "Category"} />
        <div
          style={{
            marginRight: "1rem",
            marginTop: "0.5rem",
            color: "#333",
          }}
        >
          {event.club}
        </div>
      </Box>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {event.description.length > 100 ? (
            <>
              {event.description.substring(0, 100)}...
              <Button variant="text" color="primary" onClick={handleClickOpen}>
                Show More
              </Button>
            </>
          ) : (
            event.description
          )}
        </Typography>
      </CardContent>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
        mx={2}
      >
        <Typography variant="body1">{`${event.startTime} - ${event.endTime}`}</Typography>
        {isRegistered ? (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeregisterBtn(event._id)}
          >
            Deregister
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleRegisterBtn(event._id)}
          >
            Register
          </Button>
        )}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{event.eventName}</DialogTitle>
        <DialogContent>
          <Typography>{event.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

RecipeReviewCard.propTypes = {
  event: PropTypes.object.isRequired,
  handleRegisterBtn: PropTypes.func.isRequired,
  handleDeregisterBtn: PropTypes.func.isRequired,
};

export default RecipeReviewCard;
