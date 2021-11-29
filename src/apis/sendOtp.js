import HttpClient from '@utils/httpClient';

const sendOtp = async params => {
  try {
    const httpClient = HttpClient({
      guestOAuthToken: true,
    });

    const {data} = await httpClient.post('/customer/sendOTP', params);

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export default sendOtp;
