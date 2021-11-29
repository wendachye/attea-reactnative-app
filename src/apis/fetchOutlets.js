import HttpClient from '@utils/httpClient';

const fetchOutlets = async () => {
  try {
    const httpClient = HttpClient({
      guestOAuthToken: true,
    });

    const {data} = await httpClient.get('/outlet/getoutletlist');

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export default fetchOutlets;
