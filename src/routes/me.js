const express = require('express');
const route = express.Router();

const meController = require('../app/controllers/MeController');

route.get('/stored/courses', meController.stroredCourses);
route.get('/trash/courses', meController.trashCourses);

module.exports = route;
