class Store {
    constructor() {
        this.redis = redis;
    }

    async get(sid) {
        let data = await this.redis.get(`SESSION:${sid}`);
        return data ? JSON.parse(data) : {};
    }

    async set(sid, session) {
        await this.redis.set(
            `SESSION:${sid}`, JSON.stringify(session), "EX", config.session.max_age);
        return sid;
    }

    async destroy(sid) {
        return await this.redis.del(`SESSION:${sid}`);
    }
}

const store = new Store(),
    sessionKey = config.session.key;

function redisErrorHandler(err) {
    logger.error(`[Redis] ${err}`);
}

module.exports = async (ctx, next) => {
    const sid = ctx.cookies.get(sessionKey) || ObjectID().toString();
    ctx.session = await store.get(sid).catch(redisErrorHandler);
    ctx.session_id = sid;

    await next();

    if (!ctx.session) {
        await store.destroy(sid).catch(redisErrorHandler);
        return;
    }

    // set/update session
    await store.set(sid, ctx.session).catch(redisErrorHandler);
    ctx.cookies.set(sessionKey, sid);
};