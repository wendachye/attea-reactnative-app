import HttpClient from '@utils/httpClient';

const verifyOtp = async params => {
  try {
    const httpClient = HttpClient({
      guestOAuthToken: true,
    });

    const {data} = await httpClient.post('/customer/validateOTP', params);

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export default verifyOtp;
