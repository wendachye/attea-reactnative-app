import HttpClient from '@utils/httpClient';

const fetchAccessToken = async refresh_token => {
  try {
    const httpClient = HttpClient({
      defaultBasicAuth: true,
    });

    const params = {
      refresh_token,
    };

    const {data} = await httpClient.post('/customer/refreshToken', params);

    if (data?.code === 3001) {
      return [data?.data, null];
    }

    return [null, data];
  } catch (error) {
    return [null, error];
  }
};

export default fetchAccessToken;
