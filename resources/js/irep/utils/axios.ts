import { useGlobalStore } from "../store/useGlobal";
import axios from "axios";

const createAxios = () => {
  const globalStore = useGlobalStore();

  const ajaxAxios = axios.create({
    baseURL: globalStore.irePlaginWp?.ajax_url,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    withCredentials: true,
  });

  return ajaxAxios;
};

export default createAxios;
