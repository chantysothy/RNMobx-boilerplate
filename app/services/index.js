/**
 * @flow
 */

import _fetch, { get, post, postForm } from "./_fetch";
import { apiUrl } from "./api";
import {
  get as getFromStorage,
  set as setToStorage,
  removeItem,
  clear as clearStorage
} from "./storage";
import { getJwt, saveJwt, clearJwt } from "./jwt";
import { navigationReset } from "./navigation";
import { getCurrentUser, setCurrentUser } from "./currentUser";

export {
  _fetch,
  get,
  post,
  postForm,
  apiUrl,
  getFromStorage,
  setToStorage,
  getJwt,
  saveJwt,
  navigationReset,
  removeItem,
  clearJwt,
  clearStorage,
  getCurrentUser,
  setCurrentUser
};
