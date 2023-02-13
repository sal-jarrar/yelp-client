import React, { ReactElement } from "react";
import { Container, Row, Col } from "react-bootstrap";

type ChildrenType = {
  children: ReactElement | ReactElement[];
};

const FormContainer = ({ children }: ChildrenType) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
