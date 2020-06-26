if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport');
const methodOverride = require('method-override')
const Promise = require('promise')

const http = require('http').Server(app)
const io = require('socket.io')(http)
const multer = require('multer')
const multerConf = {
    storage: multer.diskStorage({
        destination: function(req, file, next) {
            next(null, process.cwd() + '/Images/')
        },
        filename: function (req, file, next) {
            const ext = file.mimetype.split('/')[1]
            next(null, req.body.Id + '.' + ext)
        }
    }),
    fileFilter: function (req, file, next) {
        if (!file) {
            next()
        }
        const image = file.mimetype.startsWith('image/')
        if (image) {
            next(null, true)
            connection.query('update utilizatori set DefaultAvatar = "' + req.body.Id + '" where id = "' + req.body.Id + '"')
        }
        else {
            next(null, false)
        }
    }
}

const ejs = require('ejs')

const initializePassport = require('./passport-config')
const randomstring = require('randomstring')
const nodemailer = require('nodemailer')
const format = "/verify?token="

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'username',
        pass: 'admin'
    }
})

const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'algoritmiicpp',
    charset: 'utf8mb4'
})

connection.connect(error => {
    if (!!error)
        console.log('Baza de date nu este deschisa.')
    else
        console.log('Conectat la baza de date.')
})


async function getUserByEmail(email) {
    const ans = new Promise((resolve, reject) => {
        connection.query("SELECT * from utilizatori where email = '" + email + "'", async (err, rows, field) => {
            if (err)
                reject(err)
            resolve(rows)
        })
    })
    return await ans
}

async function getUserById(id) {
    const ans = new Promise((resolve, reject) => {
        connection.query("SELECT * FROM utilizatori where id = '" + id + "'", async (err, rows, field) => {
            if (err)
                reject(err)
            resolve(rows)
        })
    })
    return await ans
}

async function getOnline() {
    const ans = new Promise((resolve, reject) => {
        connection.query("SELECT * from utilizatori where OnChat = 1", async (err, rows, field) => {
            if (err)
                reject(err)
            resolve(rows)
        })
    })
    return await ans
}

async function getMessages() {
    const ans = new Promise((resolve, reject) => {
        connection.query("SELECT * from mesaje m, utilizatori u where m.id = u.id", async (err, rows, field) => {
            if (err)
                reject(err)
            resolve(rows)
        })
    })

    return await ans
}

initializePassport(passport, getUserByEmail, getUserById)

const users = []

app.set('view-engine', 'ejs')
app.set('views', __dirname)
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname))
app.use(express.static('public'))

app.get('/', async (req, res) => {
    login = req.isAuthenticated()
    let id = current_user = name = admin = 0
    if (login) {
        id = req.session.passport.user
        current_user = await getUserById(id)
        name = current_user[0].Nume
        admin = current_user[0].Admin
    }

    res.render('Home.ejs', { login: login, name: name, admin: admin}, function(err, html) {
        if (err)
            res.redirect('/404')
        else
            res.send(html)
    })
})

app.get('/Home', async (req, res) => {
    login = req.isAuthenticated()
    let id = current_user = name = admin = 0
    if (login) {
        id = req.session.passport.user
        current_user = await getUserById(id)
        name = current_user[0].Nume
        admin = current_user[0].Admin
    }

    res.render('Home.ejs', { login: login, name: name, admin: admin}, function(err, html) {
        if (err)
            res.redirect('/404')
        else
            res.send(html)
    })
})

app.get('/404', (req, res) => {
    login = req.isAuthenticated()
    res.render('404.ejs', { login: login })
})

app.get('/Bubblesort', async (req, res) => {
    login = req.isAuthenticated()
    if (login) {
        const id = req.session.passport.user
        const current_user = await getUserById(id)
        const name = current_user[0].Nume
        const admin = current_user[0].Admin
    }

    if (login) {
        res.render('Bubblesort.ejs', { login: login, name: name, admin: admin}, function(err, html) {
            if (err)
                res.redirect('/404')
            else
                res.send(html)
        })
    }
    else {
        res.render('Login.ejs', { message: "Trebuie sa fii autentificat pentru a vedea acest continut." })
    }
})

app.get('/Quicksort', async (req, res) => {
    login = req.isAuthenticated()
    if (login) {
        const id = req.session.passport.user
        const current_user = await getUserById(id)
        const name = current_user[0].Nume
        const admin = current_user[0].Admin
    }

    if (login) {
        res.render('Quicksort.ejs', { login: login, name: name, admin: admin}, function(err, html) {
            if (err)
                res.redirect('/404')
            else
                res.send(html)
        })
    }
    else {
        res.render('Login.ejs', { message: "Trebuie sa fii autentificat pentru a vedea acest continut." })
    }
})

app.get('/Radixsort', async (req, res) => {
    login = req.isAuthenticated()
    if (login) {
        const id = req.session.passport.user
        const current_user = await getUserById(id)
        const name = current_user[0].Nume
        const admin = current_user[0].Admin
    }

    if (login) {
        res.render('Radixsort.ejs', { login: login, name: name, admin: admin}, function(err, html) {
            if (err)
                res.redirect('/404')
            else
                res.send(html)
        })
    }
    else {
        res.render('Login.ejs', { message: "Trebuie sa fii autentificat pentru a vedea acest continut." })
    }
})

app.get('/Contact', async (req, res) => {
    login = req.isAuthenticated()
    if (login) {
        const id = req.session.passport.user
        const current_user = await getUserById(id)
        const name = current_user[0].Nume
        const admin = current_user[0].Admin
    }

    res.render('Contact.ejs', { login: login, name: name, admin: admin}, function(err, html) {
    if (err)
        res.redirect('/404')
    else
        res.send(html)
    })

})

app.get('/Login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs', { message: "" }, function(err, html) {
        if (err)
            res.redirect('/404');
        else
            res.send(html);
    })
})

app.get('/Register', checkNotAuthenticated, (req, res) => {
    res.render('Register.ejs', { error: 0 })
})

async function callback(req, res, used) {
    if (used == 0) {

        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 16)
            const hashedVerification = randomstring.generate(128)
            connection.query("INSERT INTO utilizatori VALUES ('" + Date.now().toString() + "', '" + req.body.name + "', '" + req.body.email + "', '" + hashedPassword + "', '" + false + "', '" + false + "', '" + hashedVerification + "', '#ffffff', '0', 'default')")
            const for_mail = await ejs.renderFile('mail.ejs', { name: req.body.name, link: req.protocol + '://' + req.get('host') + format + hashedVerification })
            transporter.sendMail({
                from: 'algoritmiicpp@gmail.com',
                to: req.body.email,
                subject: 'Activarea contului pe AlgoritmiCPP',
                html: for_mail
            }, (err, info) => {
                if (err)
                    console.log(err)
            })
            res.render('login.ejs', { message: "Succes! Verifica adresa de e-mail " + req.body.email + " pentru a activa contul." })
        }
        catch (error) {
            res.redirect('/Register');
        }
    }
}

app.post('/Register', checkNotAuthenticated, async (req, res) => {
    let used = 1
    connection.query("SELECT * FROM utilizatori WHERE email = '" + req.body.email + "' or nume = '" + req.body.name + "'", (err, rows, field) => {
        if (err)
            console.log(err)
        if (rows.length === 0) {
            used = 0
        }
        else {
            if (rows[0].Nume == req.body.name) {
                res.render('Register.ejs', { error: "Numele este deja folosit." })
                return;
            }
            if (rows[0].Email == req.body.email) {
                res.render('Register.ejs', { error: "Email-ul este deja folosit." })
                return;
            }
        }
        callback(req, res, used)
    })
})

app.post('/Login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), async (req, res) => {
    if (req.body.remember == undefined)
        req.body.remember = 0
    
    if (req.body.remember) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000
    }
    else {
        req.session.cookie.expires = false;
    }

    const id = req.session.passport.user
    const current_user = await getUserById(id)
    const verified = current_user[0].Verificat
    if (verified) {
        res.redirect('/Home')
    }
    else {
        req.logOut()
        res.render('login.ejs', { message: "Contul dumneavoastra nu a fost inca validat. Verificati email-ul trimis pe adresa " +  current_user[0].Email + "." })
    }
})


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

app.delete('/Logout', (req, res) => {
    req.logOut()
    res.redirect('/Home')
})

app.get('/Verify', (req, res) => {
    if (req.originalUrl == "/verify") {
        res.redirect('/404')
        return
    }

    connection.query("SELECT * from utilizatori where Cod = '" + req.query.token + "'", (err, rows, field) => {
        if (rows.length == 0)
            res.render('Verify.ejs', { token_available: 0, email: "" })
        else {
            connection.query("UPDATE utilizatori SET verificat = 1, cod = NULL WHERE Cod = '" + req.query.token + "'", (err, rows, field) => {
                res.render('Verify.ejs', { token_available: 1, email: rows[2] })
            })
        }
    })

})

app.get('/Chat', async (req, res) => {
    login = req.isAuthenticated()
    if (login) {
        const id = req.session.passport.user
        const current_user = await getUserById(id)
        const Mesaje = await getMessages()
        const online = await getOnline()
        const name = current_user[0].Nume
        const color = current_user[0].CuloareMesaje
        const admin = current_user[0].Admin
        const avatar = current_user[0].DefaultAvatar

        res.render('Chat.ejs', { login: login, admin: admin, mesaje: Mesaje, id: id, nume: name, culoare: color, online: online, avatar: avatar }, (err, html) => {
            if (err) {
                console.log(err)
                res.redirect('/404')
            }
            else
                res.send(html)
        })
    }
    else
        res.redirect('/404')
})

app.get('/Edit', async (req, res) => {
    login = req.isAuthenticated()
    if (login) {
        const id = req.session.passport.user
        const current_user = await getUserById(id)
        const admin = current_user[0].Admin
        if (admin) {
            connection.query('select * from utilizatori', (error, results, fields) => {
                if (error)
                    return console.error(error.message)
                res.render('Edit.ejs', { login: login, admin: admin, data: results, current: [] }, (err, html) => {
                    if (err)
                        res.redirect('/404')
                    else
                        res.send(html)
                })
            })
        }
        else
            res.redirect('/404')
    }
    else
        res.redirect('/404')
})

app.put('/Edit', multer(multerConf).single('imageSelector'), (req, res) => {

    if (req.body.to_delete == 1) {
        connection.query("delete from utilizatori where id = '" + req.body.Id + "'", (error, results, field) => {
            res.redirect('/Edit')
        })
    }
    else {
        connection.query("update utilizatori set Nume = '" + req.body.nume + "', Email = '" + req.body.email + "', Admin = '" + req.body.admin + "', Verificat = '" + req.body.verificat + "' where Id = '" + req.body.Id + "'", (error, results, field) => {
            res.redirect('/Edit')
        })
    }
})

app.post('/Edit', async (req, res) => {
    login = req.isAuthenticated()
    if (login) {
        const id = req.session.passport.user
        const current_user = await getUserById(id)
        const admin = current_user[0].Admin
        if (admin) {
            let all_accounts
            connection.query("select * from utilizatori", (error, results, field) => {
                if (error)
                    return console.error(error.message)
                else
                    all_accounts = results
            })
            if (req.body.to_modify) {
                connection.query("select * from utilizatori where id = '" + req.body.id + "'", (error, results, fields) => {
                    res.render('Edit.ejs', { login: login, admin: admin, data: all_accounts, current: results, edit_now: 1 }, (err, html) => {
                        if (err)
                            res.redirect('/404')
                        else
                            res.send(html)
                    })
                })
            }
        }
    }
    else
        res.redirect('/404')
})

app.put('/Profil', multer(multerConf).single('imageSelector'), async (req, res) => {
    login = req.isAuthenticated()
    if (login) {
        const current_user = await getUserById(req.body.Id);
        connection.query("update utilizatori set Nume = '" + req.body.Nume + "', Email = '" + req.body.Email + "' where id = '" + req.body.Id + "'", (error, results, field) => {
            if (error)
                console.log(error)
            req.flash('message', 'Datele contului tău au fost modificate cu succes!');
            res.redirect('/Profil');    
        })
    }
    else {
        res.redirect('/404');
    }
})

app.get('/Profil', async (req, res) => {
    login = req.isAuthenticated()
    if (login) {
        const id = req.session.passport.user
        const current_user = await getUserById(id);
        const admin = current_user[0].Admin
        res.render('Profile.ejs', { admin: admin, message: req.flash('message')[0], login: login, data: current_user }, (err, html) => {
            if (err)
                res.redirect('/404')
            else
                res.send(html)
        })

    }
    else
        res.redirect('/404')
})

const server = http.listen(8080, async ()  => {
    connection.query('update utilizatori set onchat = 0');
    console.log('Server-ul este pornit.')
})

var currentSockets = {};

io.on('connection', socket => {

    socket.on('user-entered', async (id, data, avatar) => {
        const current_user = await getUserById(id)
        const name = current_user[0].Nume
        const culoare = current_user[0].CuloareMesaje
        currentSockets[socket.id] = [id, name];
        connection.query('update utilizatori set onchat = 1 where id = "' + id + '"');
        io.emit('add-user-online', name, id, avatar);
        ///io.emit('chat-message', data, name + ' s-a conectat!', culoare, name, '-1');
    })

    socket.on('send-chat-message', (message, nume, culoare, data, id, avatar) => {
        if (message.replace(/\s/g, '').length) {
            io.emit('chat-message', data, nume + ': ' + message, culoare, nume, id, avatar)
            connection.query('INSERT INTO mesaje VALUES ("' + id + '", "' + nume + '", "' + data + '", "' + message + '")')
        }
    })

    socket.on('modifiedColor', (culoare, id) => {
        io.emit('modifyUserColor', culoare, id)
        connection.query("UPDATE utilizatori set culoaremesaje = '" + culoare + "' where id = '" + id + "'")
    })
    
    socket.on('userWriting', (nume, data, id, culoare) => {
        io.emit('currentlyWriting', data, nume, culoare, id);
        ///io.emit('chat-message', data, nume + ' scrie un mesaj...', culoare, nume, id + 'writing');
    })

    socket.on('userStoppedWriting', (id) => {
        io.emit('stopWriting', id);
    })

    socket.on('disconnect', async () => {
        try {
            const id = currentSockets[socket.id][0]
            const name = currentSockets[socket.id][1]
            delete currentSockets[socket.id]

            connection.query("UPDATE utilizatori set onchat = 0 where id = '" + id + "'")
            io.emit('setOffline', id, name)
            ///io.emit('chat-message', data, name + ' s-a deconectat.', culoare, name, '-1')
        }
        catch (error) {
            ///console.log('Utilizatorul a fost deja delogat.')
        }
    })

})
