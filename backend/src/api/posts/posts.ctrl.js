import Post from '../../models/post'

export const write = async ctx => {
    const {symptom, visitDate, writtenDate} = ctx.request.body;
    const post = new Post({
      symptom,
      visitDate,
      writtenDate,
    });
    try {
      await post.save(); // 저장이 완료될 때까지 대기
      ctx.body = post;
    } catch (e) {
      ctx.throw(500, e);
    }
};

export const list = async ctx => {
  try {
    const posts = await Post.find().exec();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
}