import HttpClient from '@utils/httpClient';

const signIn = async params => {
  try {
    const httpClient = HttpClient({
      defaultBasicAuth: true,
    });

    const {data} = await httpClient.post('/customer/login', params);

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export default signIn;
