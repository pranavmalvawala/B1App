import React from "react";
import { CheckinHelper } from "../../components";
import { Spinner } from "react-activity";
import { PersonInterface } from "../../appBase/interfaces";


interface Props { }

export const Household: React.FC<Props> = (props) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const selectMember = (member: PersonInterface) => {

        console.log(member);
    }

    const getMembers = () => {
        if (isLoading) return (<Spinner />)
        else {
            var result: JSX.Element[] = [];
            CheckinHelper.householdMembers.forEach(m => {
                const member = m;
                result.push(<a href="about:blank" className="bigLinkButton" onClick={(e) => { e.preventDefault(); selectMember(member) }}>
                    {m.name.display}
                </a>);
            });
            return (result);
        }
    }

    return (
        <>
            <h2>Select people:</h2>
            {getMembers()}
        </>
    )
}