import { Subgroup } from "./subgroup";

export class UserWithSubgroups {
    
    public subscriberId:string;
    public name:string;
    public numberOfSubgroups:number;
    public subgroups:Subgroup[];

    constructor() {
        this.subgroups = [];
    }
}
