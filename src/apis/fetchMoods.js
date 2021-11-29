import HttpClient from '@utils/httpClient';

const fetchMoods = async () => {
  try {
    const httpClient = HttpClient({
      guestOAuthToken: true,
    });

    const {data} = await httpClient.get('/mood/getmood');

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export default fetchMoods;
