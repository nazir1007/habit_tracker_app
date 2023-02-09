//---------Importing  models----------//
const User = require('../models/User');
const Habit = require('../models/Habit');

//--------- controller for Dashboard GET----------//
var email = "";

module.exports.dashboard = function (req, res){
    email = req.query.users

    User.findOne({ email: email})
        .then(user => {
            Habit.find({ email: req.query.users },
                (err, habits) => {

                    if (err) {
                        console.log(err);
                    } else {
                        var days = [];
                        days.push(getDays(0));
                        days.push(getDays(1));
                        days.push(getDays(2));
                        days.push(getDays(3));
                        days.push(getDays(4));
                        days.push(getDays(5));
                        days.push(getDays(6));
                        res.render('dashboard', { habits, user, days });
                    }
                });
        });
};


//------------------Function to return date string--------------//
function getDays(n) {
    let d = new Date();
    d.setDate(d.getDate() + n);
    var newDate = d.toLocaleDateString('pt-br').split('/').reverse().join('-');
    var day;
    switch (d.getDay()) {
        case 0: day = 'Sun';
            break;
        case 1: day = 'Mon';
            break;
        case 2: day = 'Tue';
            break;
        case 3: day = 'Wed';
            break;
        case 4: day = 'Thu';
            break;
        case 5: day = 'Fri';
            break;
        case 6: day = 'Sat';
            break;
    }
    return { date: newDate, day };
}


//-------------controller for Handle Change View: Daily <--> Weekly--------------//
module.exports.userView = function (req, res){
    User.findOne({
        email
    })
        .then((user) => {
            user.view = user.view === 'daily' ? 'weekly' : 'daily';
            user.save()
                .then(user => {
                    return res.redirect('back');
                })
                .catch(err => {
                    console.log(err);
                })
                .catch(err => {
                    console.log("Error changing the view!");
                    return;
                })
        })
};

//--------- controller for Dashboard Add Habit----------//
module.exports.createDashboard = function (req, res){
    const { content } = req.body;

    Habit.findOne({ content: content, email: email })
        .then((habit) => {
            if (habit) {

                //---------Update existing habit----------//
                let dates = habit.dates, timezoneoffset = (new Date()).getTimezoneOffset() * 60000;
                var today = (new Date(Date.now() - timezoneoffset)).toISOString().slice(0, 10);
                dates.find(function (item) {
                    if (item.date == today) {
                        console.log("Habit Exists")
                        req.flash('error_msg',
                            'Habit already exists');
                        res.redirect('back');
                    }
                    else {
                        dates.push({ date: today, complete: 'none' });
                        habit.dates = dates;
                        habit.save()
                            .then(habit => {
                                console.log(habit);
                                res.redirect('back');
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                });
            }
            else {
                let dates = [], timezoneoffset = (new Date()).getTimezoneOffset() * 60000;
                var localISOTime = (new Date(Date.now() - timezoneoffset)).toISOString().slice(0, 10);
                dates.push({ date: localISOTime, complete: 'none' });
                const newHabit = new Habit({
                    content,
                    email,
                    dates
                });

                //---------Save Habit----------//
                newHabit
                    .save()
                    .then((habit) => {
                        console.log(habit);
                        res.redirect('back');
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
};


//---------controller for Dashboard Add/Remove Habit to/from Favorites----------//
module.exports.favouriteHabit = function(req, res){
    let id = req.query.id;
    Habit.findOne({
        _id: {
            $in: [id]
        },
        email
    })
        .then((habit) => {
            habit.favourite = habit.favourite ? false : true;
            habit.save()
                .then(habit => {
                    req.flash('success_msg',
                        habit.favourite ? 'Habit added to favourites' : 'Habit removed from favourites');
                       
                    return res.redirect('back');
                })
                .catch(err => {
                    console.log(err);
                })
                .catch(err => {
                    console.log("Error adding to favourites");
                    return;
                })
        })
}

//-------------controller for Update status of habit completion--------------//
module.exports.statusUpdate= function(req, res){
    var d = req.query.date;
    var id = req.query.id;
    Habit.findById(id, (err, habit) => {
        if (err) {
            console.log("Error updating status");
        }
        else {
            let dates = habit.dates;
            let found = false;
            dates.find(function (item) {
                if (item.date === d) {
                    if (item.complete === 'yes') {
                        item.complete = 'no';
                    }
                    else if (item.complete === 'no') {
                        item.complete = 'none';
                    }
                    else if (item.complete === 'none') {
                        item.complete = 'yes';
                    }
                    found = true;
                }
            })
            if (!found) {
                dates.push({ date: d, complete: 'yes' })
            }
            habit.dates = dates;
            habit.save()
                .then(habit => {
                    console.log(habit);
                    res.redirect('back');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    })
};

//---------controlleDeleting a habit----------//
module.exports.remove = function(req, res){
    let id = req.query.id;
    Habit.deleteMany({
        _id: {
            $in: [id]
        },
        email
    }, (err) => {
        if (err) {
            console.log("Error in deleting record(s)!");
        }
        else {
            req.flash('success_msg', 'Record(s) deleted successfully');
            return res.redirect('back');
        }

    })
};
