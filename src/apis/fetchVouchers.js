import HttpClient from '@utils/httpClient';
import fetchAccessToken from '@apis/fetchAccessToken';

const fetchAPI = async (accessToken, userId, page, active) => {
  try {
    const httpClient = HttpClient({
      oauthToken: accessToken,
    });

    const {data} = await httpClient.get(
      `/voucher/getvoucher?cu_id=${userId}&limit=10&page=${page}&active=${active}`,
    );

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

const fetchVouchers = async (accessToken, userId, page, active) => {
  const [data, error] = await fetchAPI(accessToken.access_token, userId);

  if (error) {
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.code === 2002
    ) {
      const [newAccessToken, newAccessTokenError] = await fetchAccessToken(
        accessToken.refresh_token,
      );

      if (newAccessTokenError) {
        return [null, newAccessTokenError, null];
      }

      const [newData, newError] = await fetchAPI(
        newAccessToken?.access_token,
        userId,
        page,
        active,
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

export default fetchVouchers;
