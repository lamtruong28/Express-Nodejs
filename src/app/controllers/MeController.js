const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    //[GET] me/stored/courses
    stroredCourses(req, res, next) {
        //#region
        // Course.countDeleted()
        //     .then(deleteCount => console.log(deleteCount))
        //     .catch(next);
        // Course.find({})  //{}: nếu rỗng là lấy tất cả,
        //     .then(courses => res.render('me/stored-courses', { courses: multipleMongooseToObject(courses) }))
        //     .catch(next);
        //Note: không thể truyền data giữa 2 promise => Dùng Promise.all()
        //#endregion

        Promise.all([Course.find({}), Course.countDeleted()]) // sẽ trả lại 1 mảng, có số lượng tương ứng với số lượng phần tử mảng ở prameter
            .then(([courses, deleteCount]) =>
                res.render('me/stored-courses', {
                    courses: multipleMongooseToObject(courses),
                    deleteCount,
                }),
            )
            .catch(next);
    }
    //[GET] me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({}) //{}: nếu rỗng là lấy tất cả,
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}
module.exports = new MeController();
