import {
  ACCESS,
  IDRANDOM,
  CLASSFILTER,
  PLATFORM,
  DELETEPLATFORMS,
} from './types';

const initialState = {
  access: false,
  pag: {},
  classGenres: {},
  platforms: [],
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
      console.log('Payload:', payload);
      console.log('State platforms:', state.platforms);

      state.platforms.forEach((element) => {
        if (element !== payload) console.log(element);
      });

      return {...state, platforms: []};
    default:
      return state;
  }
}
