import React from "react";
import { Link } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import { UserHelper } from "../helpers";
import { Household } from "./components/Household";
import { Services } from "./components/Services";
import { CheckinComplete } from "./components/CheckinComplete";
import { ConfigurationInterface } from "../components";

interface Props { config?: ConfigurationInterface }

export const CheckinPage: React.FC<Props> = (props) => {

  const [currentStep, setCurrentStep] = React.useState<string>("");

  const handleServiceSelected = () => {
    setCurrentStep("household");
  }

  const handleCheckinComplete = () => {
    setCurrentStep("complete");
  }

  const getContent = () => {
    switch (currentStep) {
      case "household":
        return <Household completeHandler={handleCheckinComplete} />
      case "complete":
        return <CheckinComplete />
      default:
        return <Services selectedHandler={handleServiceSelected} />;
    }
  }

  return (
    <Container>
      <Row>
        {
          UserHelper.user?.firstName
            ? (
              <Col lg={9}>
                {getContent()}
              </Col>
            )
            : <h3 className="text-center w-100">Please <Link to="/login/?returnUrl=/checkin">Login</Link> to checkin.</h3>
        }
      </Row>
    </Container>
  )
}
