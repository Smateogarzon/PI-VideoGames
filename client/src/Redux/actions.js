import {ACCESS, IDRANDOM} from './types';
import axios from 'axios';
import store from './store';
import {LuHourglass} from 'react-icons/lu';

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
      const {data} = await axios(
        `http://localhost:3001/videogames/${numRandom()}`,
      );
      arrayPag.push({data});
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
