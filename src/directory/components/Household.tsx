import React from "react";
import { ApiHelper, EnvironmentHelper } from "../../components";
import { Row, Col } from "react-bootstrap"
import { PersonInterface } from "../../appBase/interfaces"
import { Spinner } from "react-activity";

interface Props { person: PersonInterface, selectedHandler: (personId: string) => void }

export const Household: React.FC<Props> = (props) => {
    const [members, setMembers] = React.useState<PersonInterface[]>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const getMember = (member: PersonInterface) => {
        const m = member;
        return (<a href="about:blank" className="bigLinkButton householdMember" onClick={(e) => { e.preventDefault(); props.selectedHandler(m.id) }}>
            <Row>
                <Col xs={2}><img src={EnvironmentHelper.ContentRoot + member?.photo} alt="avatar" className="img-fluid" /></Col>
                <Col xs={10}>
                    {member?.name?.display}
                    <div><span>{member?.householdRole}</span></div>
                </Col>
            </Row>
        </a>);
    }

    const getMembers = () => {
        if (isLoading) return (<Spinner />)
        else {
            var result: JSX.Element[] = [];
            members?.forEach(m => {
                if (m.id !== props.person.id) result.push(getMember(m))
            });
            return (result);
        }
    }

    const loadMembers = () => {
        if (props.person?.householdId) {
            ApiHelper.get("/people/household/" + props.person?.householdId, "MembershipApi").then(data => {
                setMembers(data);
                setIsLoading(false);
            });
        }
    }

    React.useEffect(loadMembers, [props.person]);

    return (<>{getMembers()}</>)
}