import {
  ACCESS,
  IDRANDOM,
  CLASSFILTER,
  PLATFORM,
  DELETEPLATFORMS,
  GENRES,
  DELETEGENRES,
  USER,
  LIBRARY,
  ARRAYIDS,
  DELETEIDS,
} from './types';

const initialState = {
  access: false,
  pag: {},
  classGenres: {},
  platforms: [],
  genres: [],
  userName: '',
  lib: [],
  ids: [],
};

export default function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case ACCESS:
      return {...state, access: payload};
    case IDRANDOM:
      return {...state, pag: payload};
    case CLASSFILTER:
      return {...state, classGenres: payload};
    case PLATFORM:
      const newPlatforms = [...state.platforms, payload];
      return {...state, platforms: newPlatforms};
    case DELETEPLATFORMS:
      const newPlatforms2 = state.platforms.filter((element) => {
        return element !== payload.trim();
      });
      return {...state, platforms: newPlatforms2};
    case GENRES:
      const newGenres = [...state.genres, payload];
      return {...state, genres: newGenres};
    case DELETEGENRES:
      const newGenres2 = state.genres.filter((element) => {
        return element !== payload.trim();
      });
      return {...state, genres: newGenres2};
    case 'SUBMIT':
      return {...state, platforms: [], genres: []};
    case USER:
      return {...state, userName: payload};
    case LIBRARY:
      return {...state, lib: payload};
    case ARRAYIDS:
      const newIds = [...state.ids, payload];
      return {...state, ids: newIds};
    case DELETEIDS:
      const newIds2 = state.ids.filter((element) => {
        return element !== payload;
      });
      return {...state, ids: newIds2};
    default:
      return state;
  }
}
