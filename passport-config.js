const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function return_data(err, data, ans) {
    return data
}

function initialize(passport, getUserByEmail, getUserById) {
    let user;
    const authenticateUser = async (email, password, done) => {
        user = await getUserByEmail(email, return_data)
        if (user.length == 0)
            return done(null, false, { message: 'Email inexistent.' } )
        try {
            if (await bcrypt.compare(password, user[0].Parola)) {
                return done(null, user[0]);
            }
            else
                return done(null, false, { message: 'Parola gresita.' });
        }
        catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.Id))
    passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

module.exports = initialize