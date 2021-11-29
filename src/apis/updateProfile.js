import HttpClient from '@utils/httpClient';

const updateProfile = async (accessToken, params) => {
  try {
    const httpClient = HttpClient({
      oauthToken: accessToken,
    });

    const {data} = await httpClient.post('/customer/updateProfile', params);

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export default updateProfile;
