import { getData, postData } from "./rootService";

export const getPendingConnectionRequests = async (userId: string) => {
  try {
    const response = await getData(`/connection/pending/requests/${userId}`);
    return response;
  } catch (err) {
    return err;
  }
};

export const getPeopleYouMayKnow = async (userId: string) => {
  try {
    const response = await getData(`/auth/people/${userId}`);
    return response;
  } catch (err) {
    return err;
  }
};

export const sendConnectionRequest = async (
  senderId: string,
  receiverId: string
) => {
  try {
    const response = await postData("/connection/send/", {
      senderId,
      receiverId,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const accpetConnectionRequest = async (
  senderId: string,
  receiverId: string
) => {
  try {
    const response = await postData("/connection/accept/", {
      senderId,
      receiverId,
      status: 2,
    });
    return response;
  } catch (err) {
    return err;
  }
};
