import React from "react";
import { ConfigHelper, PersonHelper } from "../helpers";
import { DonationPage as BaseDonationPage } from "../appBase/donationComponents/DonationPage";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { OneTimeDonation } from "../appBase/donationComponents/components";

export const DonationPage = () => (
  <Container>
    {
      PersonHelper.person?.id
        ? (
          <Row>
            <Col lg={9}>
              <BaseDonationPage personId={PersonHelper.person.id} appName="B1App" />
            </Col>
          </Row>
        )
        : (<>
          <Row>
            <Col xl={8}>
              <h3>Make a One Time Donation</h3>

              <OneTimeDonation churchId={ConfigHelper.churchId} />
            </Col>
            <Col xl={4}>
              <h3 className="text-center">Manage Donations</h3>
              <p>Please login to make a recurring donation or manage donations</p>
              <Link to="/login/?returnUrl=/donate" className="btn btn-block btn-info">Login</Link>
            </Col>
          </Row>
        </>)
    }
  </Container>
)
