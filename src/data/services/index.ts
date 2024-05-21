import { LoginUser, RegisterUser, Task, User } from "src/types";
import { useFetch } from "../utils";
import { CredentialResponse } from "@react-oauth/google";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

type ErrorResponse = {
  data: unknown;
  message: string;
};

type APIResponse = { data: { data: unknown } };

const raiseAlert = (message: string) => {
  const customEvent = new CustomEvent("renderComponent", {
    detail: { severity: "error", title: "Error", message },
  });
  document.dispatchEvent(customEvent);
};
class ApiService {
  private static instance: ApiService;

  login = async (credentialResponse: CredentialResponse): Promise<User> => {
    try {
      const { data: response }: APIResponse = await useFetch(
        `${BASE_URL}api/login`,
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({ credentialResponse }),
        }
      );
      return response?.data as unknown as User;
    } catch (err: any) {
      raiseAlert((err?.data as unknown as ErrorResponse)?.message);
      return Promise.reject((err as unknown as ErrorResponse)?.data);
    }
  };

  logout = async (): Promise<unknown | Error> => {
    try {
      const { data: response }: APIResponse = await useFetch(
        `${BASE_URL}api/logout`,
        {
          mode: "cors",
          method: "DELETE",
          headers: {
            Authorization: sessionStorage.getItem("user_auth_token") ?? "",
          },
        }
      );
      return response?.data;
    } catch (err: any) {
      raiseAlert((err?.data as unknown as ErrorResponse)?.message);
      return Promise.reject((err as unknown as ErrorResponse)?.data || false);
    }
  };

  getFiles = async (): Promise<any> => {
    try {
      const { data: response }: APIResponse = await useFetch(
        `${BASE_URL}api/code-samples`,
        {
          mode: "cors",
          method: "GET",
          headers: {
            Authorization: sessionStorage.getItem("user_auth_token") ?? "",
          },
        }
      );
      return response?.data as unknown as boolean;
    } catch (err: any) {
      raiseAlert((err?.data as unknown as ErrorResponse)?.message);
      return Promise.reject((err as unknown as ErrorResponse)?.data || false);
    }
  };

  getCodeEditSampleForView = async (payload: any): Promise<any> => {
    try {
      const { data: response }: APIResponse = await useFetch(
        `${BASE_URL}api/code-samples/view`,
        {
          mode: "cors",
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            Authorization: sessionStorage.getItem("user_auth_token") ?? "",
          },
        }
      );
      return response?.data as unknown as Task;
    } catch (err: any) {
      raiseAlert((err?.data as unknown as ErrorResponse)?.message);
      return Promise.reject((err as unknown as ErrorResponse)?.data);
    }
  };

  getCodeEditSample = async (id: string): Promise<any> => {
    try {
      const { data: response }: APIResponse = await useFetch(
        `${BASE_URL}api/code-samples/${id}/edit`,
        {
          mode: "cors",
          method: "GET",
          headers: {
            Authorization: sessionStorage.getItem("user_auth_token") ?? "",
          },
        }
      );
      return response?.data as unknown as Task;
    } catch (err: any) {
      raiseAlert((err?.data as unknown as ErrorResponse)?.message);
      return Promise.reject((err as unknown as ErrorResponse)?.data);
    }
  };

  saveReview = async (payload: any): Promise<any> => {
    try {
      const { data: response }: APIResponse = await useFetch(
        `${BASE_URL}api/code-samples/save`,
        {
          mode: "cors",
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            Authorization: sessionStorage.getItem("user_auth_token") ?? "",
          },
        }
      );
      return response?.data as unknown as Task;
    } catch (err: any) {
      raiseAlert((err?.data as unknown as ErrorResponse)?.message);
      return Promise.reject((err as unknown as ErrorResponse)?.data);
    }
  };



  public static getInsance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }
}

const instance = ApiService.getInsance();
export default instance;
