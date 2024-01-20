import {ACCESS, GENRES} from './types';
import axios from 'axios';

export function access(payload) {
  return {
    type: ACCESS,
    payload,
  };
}

export function genres() {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('http://localhost:3001/genres');
      const genres = data.map((genre) => genre.name);
      const imgsGenres = data.map((genre) => genre.image);
      console.log([genres, imgsGenres]);
      dispatch({
        type: GENRES,
        payload: [genres, imgsGenres],
      });
    } catch (error) {
      console.error(error);
    }
  };
}
