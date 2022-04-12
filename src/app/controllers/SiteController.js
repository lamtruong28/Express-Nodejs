const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
//function constructer
class SiteController {
    // [GET] home
    index(req, res, next) {
        //promises
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            }) //truyền data (courses) dưới dạng object sang home.hbs
            .catch(next);
        // res.render('home');
    }
    // [GET] search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
