import moment from "moment";

export const formatDate = (val: string) => {
  const hour = moment(val).fromNow();
  return hour;
};
