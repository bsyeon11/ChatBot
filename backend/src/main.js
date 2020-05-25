require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import api from './api';

const { PORT, MONGO_URI } = process.env;

mongoose
.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch(e=>{
        console.error(e);
});

const app = new Koa();
const router = new Router(); 

router.use('/api', api.routes()); // api 라우트 연동
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());
/*
app.use(async (ctx, next) => {
    console.log(ctx.url);
    console.log(1);
    if(ctx.query.authorized !== '1'){
        ctx.status = 401;
        return;
    }
    await next();
    console.log('END');
});

app.use((ctx, next)=>{
    console.log(2);
    next(); //다음 미들웨어 실행
})
//app 인스턴스에 라우터 적용
app.use(ctx => {
    ctx.body = 'hello world';
})
*/
const port = PORT;
app.listen(port, () => {
    console.log("Listening to port %d", port);
});
