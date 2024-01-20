import {ACCESS} from './types';

const initialState = {
  access: false,
};

export default function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case ACCESS:
      return {...state, access: payload};

    default:
      return state;
  }
}
