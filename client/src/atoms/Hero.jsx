import { Container, Card } from "react-bootstrap";
import PropTypes from "prop-types";

const Hero = ({ events }) => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <div>
          {events &&
            events.map((event) => (
              <Card key={event._id} className="my-3">
                <Card.Img variant="top" src={event.photo} />
                <Card.Body>
                  <Card.Title>{event.eventName}</Card.Title>
                  <div className="d-flex justify-content-between">
                    <p className="text-muted">{event.category}</p>
                    <p className="text-muted">{event.date}</p>
                  </div>
                  <Card.Text>{event.description}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <p className="text-muted">{`Start: ${event.startTime}`}</p>
                    <p className="text-muted">{`End: ${event.endTime}`}</p>
                  </div>
                </Card.Body>
              </Card>
            ))}
        </div>
      </Container>
    </div>
  );
};
Hero.propTypes = {
  events: PropTypes.array.isRequired,
};

export default Hero;
