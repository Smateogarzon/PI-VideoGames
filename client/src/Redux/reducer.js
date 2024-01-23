import { ACCESS, IDRANDOM } from "./types";

const initialState = {
  access: false,
  pag: {},
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ACCESS:
      return { ...state, access: payload };
    case IDRANDOM:
      return { ...state, pag: payload };
    default:
      return state;
  }
}
