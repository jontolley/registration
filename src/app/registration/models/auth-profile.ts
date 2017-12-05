export class AuthProfile {
    constructor(
        public sub: string,
        public name: string,
        public email: string,
        public nickname: string,
        public picture: string,
        public email_verified: boolean
    ) {  }
}
