import { ACTION1 } from './types';
const ROOT_URL = 'http://localhost:3090';

export function msgAction(arg) {
  return {
    type: ACTION1,
    payload: arg
  };
}
