const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

//function constructer
class CoursesController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                course
                    ? res.render('courses/show', {
                          course: mongooseToObject(course),
                      })
                    : res.send('404 not found!'),
            )
            .catch(next);
    }
    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }
    // [POST] /courses/store
    store(req, res, next) {
        const formData = { ...req.body }; //Copy
        const course = new Course(formData);
        course
            .save() // ||*.save():  thêm mới database;
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }
    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id }) //method delete của plugin mongoose-delete
            .then(() => res.redirect('back')) //Quay lại trang trước
            .catch(next);
    }
    // [PATCH] /courses/:id/restored
    restored(req, res, next) {
        Course.restore({ _id: req.params.id }) //method delete của plugin mongoose-delete
            .then(() => res.redirect('back')) //Quay lại trang trước
            .catch(next);
    }
    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id }) //method deleteOne của mongoose
            .then(() => res.redirect('back')) //Quay lại trang trước
            .catch(next);
    }
    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.coursesId } }) // $in duyệt qua trong 1 list
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restored':
                Course.restore({ _id: { $in: req.body.coursesId } }) // $in duyệt qua trong 1 list
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'deleteForce':
                Course.deleteOne({ _id: { $in: req.body.coursesId } }) // $in duyệt qua trong 1 list
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }
}

module.exports = new CoursesController();
