import HttpClient from '@utils/httpClient';
import fetchAccessToken from '@apis/fetchAccessToken';

const fetchAPI = async (accessToken, userId, page) => {
  try {
    const httpClient = HttpClient({
      oauthToken: accessToken,
    });

    const {data} = await httpClient.get(
      `/points/getpoints?cu_id=${userId}&page=${page}&limit=10`,
    );

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

const fetchPoints = async (accessToken, userId, page) => {
  const [data, error] = await fetchAPI(accessToken.access_token, userId, page);

  if (error) {
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.code === 2002
    ) {
      const [newAccessToken, newAccessTokenError] = await fetchAccessToken(
        accessToken.refresh_token,
      );

      if (newAccessTokenError) {
        return [null, error, null];
      }

      const [newData, newError] = await fetchAPI(
        newAccessToken.access_token,
        userId,
        page,
      );

      if (newError) {
        return [null, newError, null];
      }

      return [newData, null, newAccessToken];
    }

    return [null, error, null];
  }

  return [data, null, null];
};

export default fetchPoints;
