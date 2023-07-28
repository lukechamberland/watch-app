const db = require('../connection');

const findOrCreateUser = async(user) => {
    const dbUser = await db.pool.query('SELECT * FROM users WHERE login_auth = $1', [user.sub]);

    if (dbUser.rows.length > 0) {
        return dbUser.rows[0].id;
    } else {
        const newUser = await db.pool.query('INSERT INTO users (user_name, email, login_auth) VALUES ($1, $2, $3) RETURNING *', [user.name, user.email, user.sub]);
        return newUser.rows[0].id;
    }
};


module.exports = {
    findOrCreateUser,
};