import Joi from 'joi';
import User from '../../models/user';

export const register = async ctx => {
    const schema = Joi.object().keys({
        useremail: Joi.string()
//        .alphanum()
        .min(3)
        .max(20)
        .required(),
        username: Joi.string().required(),
        userphone: Joi.string().required(),
        password: Joi.string().required(),
    });

    const result = Joi.validate(ctx.request.body, schema);
    if(result.error){
        ctx.status = 400;
        ctx.body = {
            "success": 0
        };
        return;
    }

    const { useremail, username, userphone, password } = ctx.request.body;
    try {
        //useremail 이미 존재하는지 확인
        const exists = await User.findByUseremail(useremail);
        if(exists) {
            ctx.status = 409;
            ctx.body = {
                "success": 2,
            }
            return;
        }
        const user = new User({
            useremail,
            username,
            userphone,
        });
        await user.setPassword(password);
        await user.save(); //데이터베이스에 저장
        ctx.body = {
            data: user.serialize(),
            "success": 1,
        }
    } catch(e){
        ctx.throw(500, e);
    }
};

export const login = async ctx => {
    const { useremail, password } = ctx.request.body;

    if(!useremail || !password){
        ctx.status = 401;
        ctx.body = {
            "success": 0,
        }
        return;
    }

    try {
        const user = await User.findByUseremail(useremail);
        if(!user){
            ctx.status = 401;
            ctx.body = {
                "success": 0,
            }
            return;
        }
        const valid = await user.checkPassword(password);
        if(!valid){
            ctx.status = 401;
            ctx.body = {
                "success": 0,
            }
            return;
        }
        ctx.body = {
            data: user.serialize(),
            "success": 1
        };
    } catch(e) {
        ctx.throw(500, e);
    }
};

export const check = async ctx => {

};

export const logout = async ctx => {

};