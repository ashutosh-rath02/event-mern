import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, Chip } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const RecipeReviewCard = ({
  event,
  handleRegisterBtn,
  handleDeregisterBtn,
}) => {
  const { userInfo } = useSelector((state) => state.auth);
  const isRegistered = event.registeredUsers.includes(userInfo._id);

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
      <Chip
        className="mt-2 p-2"
        style={{ marginLeft: "1rem" }}
        label={event.category || "Category"}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {event.description}
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
    </Card>
  );
};

RecipeReviewCard.propTypes = {
  event: PropTypes.object.isRequired,
  handleRegisterBtn: PropTypes.func.isRequired,
  handleDeregisterBtn: PropTypes.func.isRequired,
};

export default RecipeReviewCard;
