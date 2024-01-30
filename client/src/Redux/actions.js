import {
  ACCESS,
  IDRANDOM,
  CLASSFILTER,
  PLATFORM,
  DELETEPLATFORMS,
  GENRES,
  DELETEGENRES,
  USER,
} from "./types";
import axios from "axios";
import store from "./store";

export function access(payload) {
  return {
    type: ACCESS,
    payload,
  };
}

function numRandom() {
  return Math.floor(Math.random() * 948999) + 1;
}

async function dataCard(memoriPag, payload) {
  let retries = 4;
  let arrayPag = [];

  while (retries > 0 && arrayPag.length !== 3) {
    try {
      const { data } = await axios(
        `http://localhost:3001/videogames/${numRandom()}`
      );
      arrayPag.push({ data });
      memoriPag[payload] = arrayPag;
      retries = 3;
    } catch (error) {
      retries--;
    }
  }
  return memoriPag;
}

export function idRandom(payload) {
  return async (dispatch) => {
    const memoriPag = store.getState().pag;

    if (!memoriPag.hasOwnProperty(payload)) {
      let memori = await dataCard(memoriPag, payload);

      dispatch({
        type: IDRANDOM,
        payload: memori,
      });
    }
    if (!memoriPag.hasOwnProperty(payload + 1) && payload + 1 !== 10) {
      let memori = await dataCard(memoriPag, payload + 1);

      return dispatch({
        type: IDRANDOM,
        payload: memori,
      });
    }
    return dispatch({
      type: IDRANDOM,
      payload: memoriPag,
    });
  };
}

export function classGenres(payload) {
  return async (dispatch) => {
    if (payload === "delete") {
      return dispatch({
        type: CLASSFILTER,
        payload: {},
      });
    }
    if (payload === "Top Rated" || payload === "Lowest Rated") {
      const { data } = await axios(
        `http://localhost:3001/filter/?ratings=${payload}`
      );
      if (data) {
        let memori = {};
        let min = 0;
        let max = 10;
        for (let i = 1; i <= 10; i++) {
          memori[i] = data.slice(min, max);
          min += 10;
          max += 10;
        }
        return dispatch({
          type: CLASSFILTER,
          payload: memori,
        });
      }
    }
    if (payload === "name" || payload === "-name") {
      const { data } = await axios(
        ` http://localhost:3001/filter/?name=${payload}`
      );
      let memori = {};
      let min = 0;
      let max = 10;
      for (let i = 1; i <= 10; i++) {
        memori[i] = data.slice(min, max);
        min += 10;
        max += 10;
      }
      return dispatch({
        type: CLASSFILTER,
        payload: memori,
      });
    }

    const { data } = await axios(
      `http://localhost:3001/filter?genres=${payload}`
    );
    let memori = {};
    let min = 0;
    let max = 10;
    for (let i = 1; i <= 10; i++) {
      memori[i] = data.slice(min, max);
      min += 10;
      max += 10;
    }
    return dispatch({
      type: CLASSFILTER,
      payload: memori,
    });
  };
}

export function platform(payload) {
  return {
    type: PLATFORM,
    payload,
  };
}

export function deletePlatform(payload) {
  return {
    type: DELETEPLATFORMS,
    payload,
  };
}

export function genres(payload) {
  return {
    type: GENRES,
    payload,
  };
}

export function deleteGenres(payload) {
  return {
    type: DELETEGENRES,
    payload,
  };
}

export function submmit() {
  return {
    type: "SUBMIT",
  };
}

export function user(payload) {
  return {
    type: USER,
    payload,
  };
}
