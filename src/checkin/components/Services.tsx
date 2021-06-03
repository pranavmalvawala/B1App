import React from "react";
import { ApiHelper, CheckinHelper } from "../../components";
import { Spinner } from "react-activity";
import { ServiceInterface } from "../../appBase/interfaces";
import { GroupInterface, GroupServiceTimeInterface, ServiceTimeInterface } from '../../appBase/interfaces';
import { ArrayHelper } from '../../appBase/helpers';

interface Props { selectedHandler: () => void }

export const Services: React.FC<Props> = (props) => {

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [services, setServices] = React.useState<ServiceInterface[]>([]);

    const loadData = () => {
        setIsLoading(true);
        console.log("loading");
        ApiHelper.get("/services", "AttendanceApi").then(data => {
            setServices(data);
            setIsLoading(false);
        });
    }

    const getResults = () => {
        if (isLoading) return (<Spinner />)
        else {
            var result: JSX.Element[] = [];
            services.forEach(s => {
                const service = s;
                result.push(<a href="about:blank" className="bigLinkButton" onClick={(e) => { e.preventDefault(); selectService(service.id) }}>
                    {s.campus.name} - {s.name}
                </a>);
            });
            return (result);
        }
    }

    const selectService = (serviceId: string) => {
        setIsLoading(true);

        const promises: Promise<any>[] = [
            ApiHelper.get("/servicetimes?serviceId=" + serviceId, "AttendanceApi").then(times => { CheckinHelper.serviceId = serviceId; CheckinHelper.serviceTimes = times; }),
            ApiHelper.get("/groupservicetimes", "AttendanceApi").then(groupServiceTimes => { CheckinHelper.groupServiceTimes = groupServiceTimes }),
            ApiHelper.get("/groups", "MembershipApi").then(groups => { CheckinHelper.groups = groups })
        ];

        Promise.all(promises).then(() => {
            //for simplicity, iterate the group service times and add groups to the services.
            CheckinHelper.serviceTimes.forEach(st => {
                st.groups = [];
                ArrayHelper.getAll(CheckinHelper.groupServiceTimes, "serviceTimeId", st.id).forEach((gst: GroupServiceTimeInterface) => {
                    const g: GroupInterface = ArrayHelper.getOne(CheckinHelper.groups, "id", gst.groupId);
                    st.groups?.push(g);
                })
            });
            console.log(JSON.stringify(CheckinHelper.serviceTimes));

            setIsLoading(false);
            props.selectedHandler();
        });

    }


    React.useEffect(() => {
        loadData()
    }, []);

    return (
        <>
            <h2>Select a service:</h2>
            { getResults()}
        </>
    )
}