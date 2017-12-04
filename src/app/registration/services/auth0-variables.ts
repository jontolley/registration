interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
    apiUrl: string;
}

export const AUTH_CONFIG: AuthConfig = {
    clientID: 'otOQqNLsdg41z2xnzed1hbXZQGH2AWXb',
    domain: 'tolleyfam.auth0.com',
    callbackURL: 'http://authdemo.dev:4200/callback',
    apiUrl: 'https://sunrise2018.org/api'
};
