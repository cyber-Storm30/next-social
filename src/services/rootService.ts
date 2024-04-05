import axios, { AxiosResponse, AxiosError } from "axios";
axios.defaults.withCredentials = true;

export const BASE_URI = "http://localhost:8000";
// export const BASE_URI =
//   "http://ec2-35-154-110-25.ap-south-1.compute.amazonaws.com:8000";
export const SOCKET_URI = "http://localhost:5001";
// export const SOCKET_URI =
//   "http://ec2-3-110-183-97.ap-south-1.compute.amazonaws.com:5001";

export const postData = async (
  url: string,
  requestData: any = null
): Promise<any> => {
  const apiUri = `${BASE_URI}${url}`;
  try {
    const response = await axios.post(apiUri, JSON.stringify(requestData), {
      headers: {
        "Content-Type ": "application/json",
      },
    });
    const { status } = response;
    const responseJson = response.data;
    return { ...responseJson, status };
  } catch (error: any) {
    const err = {
      data: error?.response.data,
      status: error?.response.status,
    };
    return err;
  }
};

export const patchData = async (
  url: string,
  requestData: any = null
): Promise<any> => {
  const apiUri = `${BASE_URI}${url}`;
  try {
    const response: AxiosResponse<any> = await axios.patch(
      apiUri,
      JSON.stringify(requestData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { status } = response;
    const responseJson = response.data;
    return { ...responseJson, status };
  } catch (error) {
    console.log("PATCH ERROR", error);
    return (error as AxiosError).response
      ? (error as AxiosError).response!.data
      : error;
  }
};

export const getData = async (
  url: string,
  requestData: Record<string, any> = {},
  token: string | null = null
): Promise<any> => {
  const apiUri = `${BASE_URI}${url}`;
  try {
    const response: AxiosResponse<any> =
      Object.keys(requestData).length !== 0
        ? await axios.get(apiUri, {
            headers: {},
            params: requestData,
          })
        : await axios.get(apiUri, {
            headers: {
              secretapikey: token,
            },
          });
    const { status } = response;
    const responseJson = await response.data;
    return { ...responseJson, status };
  } catch (error) {
    console.log(error);
    return (error as AxiosError).response
      ? (error as AxiosError).response!.data
      : error;
  }
};
