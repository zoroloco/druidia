interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: '',
  CLIENT_DOMAIN: 'druidia.auth0.com',
  AUDIENCE: '',
  REDIRECT: 'https://localhost/home',
  SCOPE: 'full_access'
};
