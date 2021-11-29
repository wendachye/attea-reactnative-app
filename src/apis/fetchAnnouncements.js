import HttpClient from '@utils/httpClient';

const fetchPromotions = async params => {
  try {
    const httpClient = HttpClient({
      guestOAuthToken: true,
    });

    const {data} = await httpClient.get('/insta/getMediaList', {params});

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export default fetchPromotions;
