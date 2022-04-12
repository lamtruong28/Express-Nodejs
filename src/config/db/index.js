const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/Learn_Nodejs_express_F8',
        );
        console.log('connect database successfully!');
    } catch (e) {
        console.log('connect database fail!: ', e.message);
    }
}
module.exports = { connect };
