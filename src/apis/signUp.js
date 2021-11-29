import HttpClient from '@utils/httpClient';

const signUp = async params => {
  try {
    const httpClient = HttpClient({
      defaultBasicAuth: true,
    });

    const {data} = await httpClient.post('/customer/register', params);

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export default signUp;
