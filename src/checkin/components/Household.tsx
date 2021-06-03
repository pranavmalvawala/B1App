import React from "react";
import { CheckinHelper, EnvironmentHelper } from "../../components";
import { Spinner } from "react-activity";
import { PersonInterface, ServiceTimeInterface } from "../../appBase/interfaces";
import { Row, Col } from "react-bootstrap";
import { Groups } from "./Groups";

interface Props { }

export const Household: React.FC<Props> = (props) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [showGroups, setShowGroups] = React.useState<boolean>(false);
    const [selectedMember, setSelectedMember] = React.useState<PersonInterface>(null);


    const selectMember = (member: PersonInterface) => {
        if (selectedMember === member) setSelectedMember(null);
        else setSelectedMember(member);
    }

    const getMembers = () => {
        if (showGroups) return (<Groups />)
        else if (isLoading) return (<Spinner />)
        else {
            var result: JSX.Element[] = [];
            CheckinHelper.householdMembers.forEach(m => {
                result.push(getMember(m));
            });
            return (result);
        }
    }

    const getMember = (member: PersonInterface) => {
        const arrow = (member === selectedMember) ? (<i className="fas fa-angle-down"></i>) : (<i className="fas fa-angle-right"></i>);
        const serviceTimeList = (member === selectedMember) ? getMemberServiceTimes() : null;
        return (<>
            <a href="about:blank" className="bigLinkButton checkinPerson" onClick={(e) => { e.preventDefault(); selectMember(member) }}>
                <Row>
                    <Col xs={1}>{arrow}</Col>
                    <Col xs={2}>
                        <img src={EnvironmentHelper.ContentRoot + member.photo} alt="avatar" className="img-fluid" />
                    </Col>
                    <Col xs={9}>
                        {member.name.display}
                    </Col>
                </Row>
            </a>
            {serviceTimeList}
        </>);
    }

    const getMemberServiceTimes = () => {
        var result: JSX.Element[] = [];
        CheckinHelper.serviceTimes.forEach(st => {
            result.push(getServiceTime(st));
        })
        return result;
    }

    const getServiceTime = (st: ServiceTimeInterface) => {
        return (<div className="checkinServiceTime">
            <Row>
                <Col xs={4}>
                    <i className="far fa-clock"></i> {st.name}
                </Col>
                <Col xs={8}>
                    <a className="bigLinkButton serviceTimeButton" href="about:blank" onClick={(e) => { e.preventDefault(); selectServiceTime(st) }}>NONE</a>
                </Col>
            </Row>
        </div>);
    }

    const selectServiceTime = (st: ServiceTimeInterface) => {
        CheckinHelper.selectedServiceTime = st;
        setShowGroups(true);

    }

    return (
        <>
            {getMembers()}
        </>
    )
}