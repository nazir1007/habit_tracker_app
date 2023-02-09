//--------- Importing user model ----------//
const User = require('../models/User');

//---------controller for Login Page----------//
module.exports.login = function (req, res)  { 
   return res.render('login')
};

//---------controller for Register Page----------//
module.exports.register = function(req, res) {
   return res.render('register');
};

//---------controller for Register Handle----------//
module.exports.createRegister = function(req, res){
    const {name, email, password} = req.body;

  //---------Checking for errors----------//
    let errors = [];

    if(!name || !email || !password)  {
        errors.push({msg : 'Please enter all fields' })
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password
        });
    } else {

         //---------Validation Passed----------//
        User.findOne({ email: email,
                       password: password
                    }).then(user => {
            if(user){
                errors.push({msg : 'Email ID already exists'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password
                });
            } else {
                     const newUser = new User({
                          name, 
                          email,
                          password
                      });

               //---------Save user----------//
                   newUser.save()
                  .then((user) => {
                   req.flash('success_msg',
                   'You are now registered successfully and can Log in now'
                 );
                 res.redirect('/users/login');
                })
                .catch((err) => {
                   console.log(err);
               });
           }
        }) 
    }
};  

//--------- controller for Login Handle----------//
module.exports.createLogin= function(req, res) {
    const { name, email, password } = req.body;

  //---------Checking user in database----------//
    User.findOne({
         email: email,
         password: password
        })
       .then (user => {
        if (!user){
            let errors = [];
            errors.push({ msg: 'Email or Password is incorrect' });
            res.render('login', { 
                errors,
                name,
                email,
                password         
            });
        } else { 

             //--------- Redirect to dashboard ----------//
           return res.redirect(`/dashboard?users=${user.email}`);
        }
    })
};

//--------- controller for Logout Handle ----------//
module.exports.logout = function(req, res){
    req.flash('success_msg',
    'You have logged out');

    //---------Redirect to Login page ----------//
   return res.redirect(`/users/login`);
};