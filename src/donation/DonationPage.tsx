import React from "react";
import { PersonHelper } from "../helpers";
import { DonationPage as BaseDonationPage } from "../appBase/donationComponents/DonationPage";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export const DonationPage = () => (
  <Container>
    {
      PersonHelper.person?.id
        ? (
          <Row>
            <Col lg={9}>
              <BaseDonationPage personId={PersonHelper.person.id} />
            </Col>
          </Row>
        )
        : <h3 className="text-center">Please <Link to="/login/?returnUrl=/donate">Login</Link> to make a donation.</h3>
    }
  </Container>
)
