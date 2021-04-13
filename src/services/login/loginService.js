import { setCookie, destroyCookie } from 'nookies';

const API_URL = 'https://instalura-api.omariosouto.vercel.app/api/login';

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
  async login({ username, password }) {
    return HttpClient(API_URL, {
      method: 'POST',
      body: {
        username,
        password,
      },
    })
      .then((response) => {
        const { token } = response.data;
        const DAY_IN_SECONDS = 86400;

        setCookie(null, 'APP_TOKEN', token, {
          path: '/',
          maxAge: DAY_IN_SECONDS * 7,
        });

        return {
          token,
        };
      });
  },

  logout() {
    destroyCookie(null, 'APP_TOKEN');
  },
};

export default loginService;
