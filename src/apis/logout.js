import HttpClient from '@utils/httpClient';

const logout = async accessToken => {
  try {
    const httpClient = HttpClient({
      defaultBasicAuth: true,
    });

    const params = {
      accessToken,
    };

    const {data} = await httpClient.post('/customer/logout', params);

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export default logout;
