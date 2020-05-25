/* eslint-disable prettier/prettier */
// auth 라우터를 api 라우터에 적용
import Router from 'koa-router';
import posts from './posts';
import auth from './auth';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());

//라우터를 내보냅니다.
export default api;