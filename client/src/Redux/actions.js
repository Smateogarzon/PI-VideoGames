import {ACCESS} from './types';
import axios from 'axios';

export function access(payload) {
  return {
    type: ACCESS,
    payload,
  };
}
