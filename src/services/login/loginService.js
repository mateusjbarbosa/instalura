import { setCookie, destroyCookie } from 'nookies';

import isStagingEnv from '../../infra/env/isStagingEnv';

const API_DEV_URL = 'https://instalura-api-git-master-omariosouto.vercel.app';
const API_PROD_URL = 'https://instalura-api.omariosouto.vercel.app';

const BASE_URL = isStagingEnv
  ? API_DEV_URL
  : API_PROD_URL;

async function HttpClient(url, { headers, body, ...options }) {
  return fetch(url, {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...options,
  })
    .then((serverResponse) => {
      if (serverResponse.ok) {
        return serverResponse.json();
      }

      throw new Error('Error on get server response.');
    });
}

const loginService = {
  async login(
    { username, password },
    setCookieModule = setCookie,
    HttpClientModule = HttpClient,
  ) {
    return HttpClientModule(`${BASE_URL}/api/login`, {
      method: 'POST',
      body: {
        username,
        password,
      },
    })
      .then((response) => {
        const { token } = response.data;
        if (!Boolean(hasToken)) {
          throw new Error('Failed to login');
        }

        const DAY_IN_SECONDS = 86400;

        setCookieModule(null, 'APP_TOKEN', token, {
          path: '/',
          maxAge: DAY_IN_SECONDS * 7,
        });

        return {
          token,
        };
      });
  },

  async logout(destroyCookieModule = destroyCookie) {
    destroyCookieModule(null, 'APP_TOKEN');
  },
};

export default loginService;
