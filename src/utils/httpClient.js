import axios from 'axios';
import {encode as btoa} from 'base-64';
import {
  API_BASE_URL,
  API_BASIC_AUTH_USERNAME,
  API_BASIC_AUTH_PASSWORD,
  API_GUEST_OAUTH_TOKEN,
} from '@env';

/**
 *
 * @param {object} props configs object to create axios instance
 * @param {string} props.baseURL base url
 * @param {number} props.timeout timeout
 * @param {boolean} props.defaultBasicAuth indicate to use default Basic Authentication
 * @param {boolean} props.guestOAuthToken indicate to use guest OAuth Token
 * @param {object} props.basicAuth Basic Authentication
 * @param {object} props.oauthToken OAuth Token
 *
 * @return {AxiosInstance} axios instance
 *
 */

const httpClient = props => {
  let configs = {
    baseURL: props?.baseURL ? props.baseURL : API_BASE_URL,
    timeout: props?.timeout ? props.timeout : 30000,
    defaultBasicAuth: props?.defaultBasicAuth ? true : false,
    guestOAuthToken: props?.guestOAuthToken ? true : false,
    basicAuth: props?.basicAuth ? props.basicAuth : null,
    oauthToken: props?.oauthToken ? props.oauthToken : null,
  };

  let instance = axios.create({
    baseURL: configs.baseURL,
    timeout: configs.timeout,
  });

  if (configs.defaultBasicAuth) {
    instance.defaults.headers.common = {
      Authorization: `Basic ${btoa(
        API_BASIC_AUTH_USERNAME + ':' + API_BASIC_AUTH_PASSWORD,
      )}`,
    };
  }

  if (configs.guestOAuthToken) {
    instance.defaults.headers.common = {
      Authorization: `Bearer ${API_GUEST_OAUTH_TOKEN}`,
    };
  }

  if (configs.oauthToken) {
    instance.defaults.headers.common = {
      Authorization: `Bearer ${configs.oauthToken}`,
    };
  }

  if (configs.basicAuth) {
    instance.defaults.headers.common = {
      Authorization: `Basic ${btoa(
        configs.basicAuth?.username + ':' + configs.basicAuth?.password,
      )}`,
    };
  }

  return instance;
};

export default httpClient;
