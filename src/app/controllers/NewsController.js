//function constructer
class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }
    // [GET] /news/:slug
    show(req, res) {
        res.send('Details news');
    }
}

module.exports = new NewsController();
