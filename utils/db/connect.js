const mongoose = require("mongoose");

const DB_URL = "mongodb+srv://root:vepKDUC1jgVZBn1O@moneyheist.2zigbzx.mongodb.net/?retryWrites=true&w=majority"

const connect = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = connect;