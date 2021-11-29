import HttpClient from '@utils/httpClient';

const forgetPassword = async params => {
  try {
    const httpClient = HttpClient({
      guestOAuthToken: true,
    });

    const {data} = await httpClient.post('/customer/forgetPassword', params);

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export default forgetPassword;
