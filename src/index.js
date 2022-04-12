const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');
db.connect();

//Midleware xử lý data submit từ form thông qua HTML:(thông qua library body-parser đã được tích hợp sẵn trong express 4.16 trở lên)
app.use(express.urlencoded({ extended: true }));
// Gởi data từ code javascript xử dụng library XMLHttpReques, fetch, axios,... (gởi bằng get or post đều được)
app.use(express.json());
//Static:
app.use(express.static(path.join(__dirname, 'public')));
//Logger:
app.use(morgan('combined'));
//Override method:
app.use(methodOverride('_method'));
//Template Engines:
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'main',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
// Routes init:
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
