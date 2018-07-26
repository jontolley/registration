import { Accommodation } from "./accommodation";
import { MeritBadge } from "./meritBadge";
import { Attendance } from "./attendance";

export class Attendee {    
    public id:number;
    public subgroupId:number;
    public firstName:string;
    public lastName:string;
    public isAdult:boolean;

    public dateOfBirth:Date;
    public triathlon:boolean;
    public isWithMinor:boolean;
    public shirtSize:string;

    public insertedBy:string;
    public insertedOn:Date;
    public updatedBy:string;
    public updatedOn:Date;

    public accommodations:Accommodation[];
    public meritBadges:MeritBadge[];
    public attendance:Attendance;

    constructor() {  }
}