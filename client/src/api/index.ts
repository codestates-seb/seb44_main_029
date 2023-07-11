import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'https://076f-175-208-216-56.ngrok-free.app/'
      : 'https://076f-175-208-216-56.ngrok-free.app/',
});

axiosClient.defaults.withCredentials = true;

interface APICallParams {
  method: string;
  url: string;
  data?: any;
}

class API {
  async CALL({
    method,
    url,
    data = null,
  }: APICallParams): Promise<AxiosResponse | undefined> {
    try {
      const response = await axiosClient({
        url,
        method,
        data,
      });
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // 여기에서 401 오류 처리를 할 수 있습니다.
      }

      console.error('# client-error-axios: ', error);
      return error.response;
    }
  }

  GET(url: string, headers?: any): Promise<AxiosResponse | undefined> {
    return this.CALL({
      method: 'GET',
      url,
      ...(headers && { headers }), // headers가 존재할 경우에만 전달
    });
  }

  POST(
    params: Omit<APICallParams, 'method'>
  ): Promise<AxiosResponse | undefined> {
    return this.CALL({
      method: 'POST',
      ...params,
    });
  }

  PUT(
    params: Omit<APICallParams, 'method'>
  ): Promise<AxiosResponse | undefined> {
    return this.CALL({
      method: 'PUT',
      ...params,
    });
  }

  DELETE(
    params: Omit<APICallParams, 'method'>
  ): Promise<AxiosResponse | undefined> {
    return this.CALL({
      method: 'DELETE',
      ...params,
    });
  }

  PATCH(
    params: Omit<APICallParams, 'method'>
  ): Promise<AxiosResponse | undefined> {
    return this.CALL({
      method: 'PATCH',
      ...params,
    });
  }
}

export default new API();
