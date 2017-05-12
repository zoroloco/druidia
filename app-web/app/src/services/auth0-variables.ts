interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'a4CRvjDPEbYnz0xKy-8IIO-ecdw_eGUF',
  CLIENT_DOMAIN: 'druidia.auth0.com',
  AUDIENCE: '59160649eea54b18bdde9af8',
  REDIRECT: 'https://localhost/home',
  SCOPE: 'full_access'
};
