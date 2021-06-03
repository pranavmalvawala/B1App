import { GroupInterface, GroupServiceTimeInterface, PersonInterface, ServiceTimeInterface, VisitInterface } from '../appBase/interfaces';



export class CheckinHelper {
    static pendingVisits: VisitInterface[] = [];
    static existingVisits: VisitInterface[] = [];

    static serviceId: string;
    static serviceTimes: ServiceTimeInterface[];
    static groupServiceTimes: GroupServiceTimeInterface[];
    static groups: GroupInterface[];
    static householdMembers: PersonInterface[];



}
