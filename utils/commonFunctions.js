import { SELECT_OPTIONS, STATUS } from "./constants";

export const getFilteredListItem = (list, filterParam) => {
  if (filterParam === SELECT_OPTIONS.UPCOMING) {
    return list.filter((item) => item.upcoming);
  } else if (filterParam === SELECT_OPTIONS.FAILED) {
    return list.filter((item) => !item.launch_success && !item.upcoming);
  } else if (filterParam === SELECT_OPTIONS.SUCCESSFUL) {
    return list.filter((item) => item.launch_success);
  }
  return list;
};

export const getStatus = (launchDetail) => {
  if (launchDetail.upcoming) {
    return STATUS.UPCOMING;
  } else if (launchDetail.launch_success) {
    return STATUS.SUCCESSFUL;
  } else return STATUS.FAILED;
};
