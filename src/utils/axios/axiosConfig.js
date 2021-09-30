import axios from 'axios';
import { API_INFO as info } from '../../globals';

export const instance = axios.create({
  baseURL: info.url,
});
