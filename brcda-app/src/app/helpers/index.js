/**
 * File Name: helpers/index.js
 * Utitlity functions
 * Author: Subrahmanyam Poluru
 */


import { FAKE_DB_NAME } from "../constants";
import moment from "moment";

/**
 * param = []
 * Sample Array [...notes]
 * usage setStorage(arr);
 */
export function setStorage(notes) {
  return localStorage.setItem(FAKE_DB_NAME, JSON.stringify(notes));
}

/**
 * Return Array of Objects [...notes]
 * usage getStorage(arr);
 */
export function getStorage() {
  return JSON.parse(localStorage.getItem(FAKE_DB_NAME));
}


/**
 * param = string
 * Sorted Array by Ascending
 * usage compareByAsc(key);
 */
export const compareByAsc = (key) => {
  return function (a, b) {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  };
};

/**
 * param = string
 * Sorted Array by Descending
 * usage compareByDesc(key);
 */
export const compareByDesc = (key) => {
  return function (a, b) {
    if (a[key] < b[key]) return 1;
    if (a[key] > b[key]) return -1;
    return 0;
  };
};

/**
 * param = array, string
 * Get length of array between given dates
 * usage getNotesByDates(arr, '7');
 */
export const getNotesByDates = (arr, days) => {
  let startDate = moment().subtract(days, "d").format("MM/DD/YYYY");
  let endDate = moment().format("MM/DD/YYYY");
  let results = arr.filter((a) => {
    let date = a.endDate;
    return date >= startDate && date <= endDate;
  });
  return results.length;
};
