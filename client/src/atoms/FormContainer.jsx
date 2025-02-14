import { Container, Row, Col } from "react-bootstrap";

import PropTypes from "prop-types";

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center w-full">
        <Col xs={12} md={12} className="card p-5">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormContainer;
