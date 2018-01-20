interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
    apiUrl: string;
}

export const AUTH_CONFIG: AuthConfig = {
    clientID: 'otOQqNLsdg41z2xnzed1hbXZQGH2AWXb',
    domain: 'tolleyfam.auth0.com',
    //callbackURL: 'http://encampment.local:4200/register/callback',
    callbackURL: 'https://sunrise2018.org/register/callback',
    apiUrl: 'https://sunrise2018.org/api'
};
