import axios from 'axios';
import {encode as btoa} from 'base-64';
import {
  API_BASE_URL,
  API_BASIC_AUTH_USERNAME,
  API_BASIC_AUTH_PASSWORD,
  API_GUEST_OAUTH_TOKEN,
} from '@env';
import {useSelector, useDispatch} from 'react-redux';
import {updateAccessToken} from '@redux/slices/userSlice';

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const METHOD_DELETE = 'DELETE';

const useHttpClient = props => {
  let configs = {
    baseURL: props?.baseURL ? props.baseURL : API_BASE_URL,
    timeout: props?.timeout ? props.timeout : 30000,
    defaultBasicAuth: props?.defaultBasicAuth ? true : false,
    userOAuthToken: props?.userOAuthToken ? true : false,
    guestOAuthToken: props?.guestOAuthToken ? true : false,
    basicAuth: props?.basicAuth ? props.basicAuth : null,
    oAuthToken: props?.oAuthToken ? props.oAuthToken : null,
  };
  const dispatch = useDispatch();
  const {accessToken} = useSelector(state => state.user);

  let instance = axios.create({
    baseURL: configs.baseURL,
    timeout: configs.timeout,
  });

  const setBasicAuthHeader = (username, password) => {
    instance.defaults.headers.common = {
      Authorization: `Basic ${btoa(username + ':' + password)}`,
    };
  };

  const setOAuthHeader = bearerToken => {
    instance.defaults.headers.common = {
      Authorization: `Bearer ${bearerToken}`,
    };
  };

  if (configs.defaultBasicAuth) {
    setBasicAuthHeader(API_BASIC_AUTH_USERNAME, API_BASIC_AUTH_PASSWORD);
  }

  if (configs.basicAuth) {
    setBasicAuthHeader(configs.basicAuth.username, configs.basicAuth.password);
  }

  if (configs.guestOAuthToken) {
    setOAuthHeader(API_GUEST_OAUTH_TOKEN);
  }

  if (configs.userOAuthToken) {
    setOAuthHeader(accessToken?.access_token);
  }

  if (configs.oAuthToken) {
    setOAuthHeader(configs.oAuthToken);
  }

  const GET = async url => {
    try {
      return await instance.get(url);
    } catch (error) {
      console.log('useHttpClient GET', error);

      if (error?.response?.status === 401) {
        if (error?.response?.data?.code === 2002) {
          return refreshToken(METHOD_GET, url);
        }
      }

      throw error;
    }
  };

  const POST = async (url, params) => {
    try {
      return await instance.post(url, params);
    } catch (error) {
      console.log('useHttpClient POST', error);

      if (error?.response?.status === 401) {
        if (error?.response?.data?.code === 2002) {
          return refreshToken(METHOD_POST, url, params);
        }
      }

      throw error;
    }
  };

  const PUT = async (url, params) => {
    try {
      return await instance.put(url, params);
    } catch (error) {
      console.log('useHttpClient PUT', error);

      if (error?.response?.status === 401) {
        if (error?.response?.data?.code === 2002) {
          return refreshToken(METHOD_PUT, url, params);
        }
      }

      throw error;
    }
  };

  const DELETE = async url => {
    try {
      return await instance.delete(url);
    } catch (error) {
      console.log('useHttpClient DELETE', error);

      if (error?.response?.status === 401) {
        if (error?.response?.data?.code === 2002) {
          return refreshToken(METHOD_DELETE, url);
        }
      }

      throw error;
    }
  };

  const refreshToken = async (method, url, params) => {
    try {
      const {data} = await fetchRefreshToken(accessToken.refresh_token);
      setOAuthHeader(data?.access_token);
      dispatch(updateAccessToken.trigger({accessToken: data}));

      switch (method) {
        case METHOD_GET:
          GET(url);
          break;
        case METHOD_POST:
          POST(url, params);
          break;
        case METHOD_PUT:
          PUT(url, params);
          break;
        case METHOD_DELETE:
          GET(url);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log('useHttpClient refreshToken', error);
      throw error;
    }
  };

  const fetchRefreshToken = async refresh_token => {
    try {
      let newInstance = axios.create({
        baseURL: configs.baseURL,
        timeout: configs.timeout,
      });

      newInstance.defaults.headers.common = {
        Authorization: `Basic ${btoa(
          API_BASIC_AUTH_USERNAME + ':' + API_BASIC_AUTH_PASSWORD,
        )}`,
      };

      const params = {
        refresh_token,
      };

      return await newInstance.post('/customer/refreshToken', params);
    } catch (error) {
      console.log('useHttpClient fetchRefreshToken', error?.response?.data);
      throw error;
    }
  };

  return {instance, GET, POST, PUT, DELETE, refreshToken};
};

export default useHttpClient;
