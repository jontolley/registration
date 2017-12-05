import { Subgroup } from "./subgroup";

export class UserWithSubgroups {
    public numberOfSubgroups:number;
    public subgroups:Subgroup[];

    constructor(
        public subscriberId:string,
        public name:string
    ) {  }
}
