if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}


const express = require('express');
const app2 = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const initializePassport = require ('./passport-config')


initializePassport(
  passport, 
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id))

const users = []

app2.set('view-engine','ejs')
app2.use(express.urlencoded({ extended: false}))
app2.use(flash())
app2.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: false
}))

app2.use(passport.initialize())
app2.use(passport.session())
app2.use(methodOverride('_method'))
app2.get('/', checkAuthenticated, (req,res)=>{
  res.render('home.ejs')
})

app2.get('/login', checkNotAuthenticated, (req, res) =>{
  res.render('login.ejs')
})

app2.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app2.get('/register', checkNotAuthenticated, (req, res) =>{
  res.render('register.ejs')
})

app2.post('/register', checkNotAuthenticated,  async (req,res)=>{
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      
      password: hashedPassword
    }) 
    res.redirect('/login')
  } catch{
    res.redirect('/register')
  }
  console.log(users)
})

app2.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated (req, res, next){
  if (req.isAuthenticated()){
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated  (req, res, next){
  if (req.isAuthenticated()){
    return res.redirect('/')
  }
  next()
}
app2.listen(2500)

