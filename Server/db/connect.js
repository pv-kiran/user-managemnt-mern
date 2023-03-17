// db config
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
async function connect() {
  await mongoose.connect(process.env.MONGO_URL);
}


module.exports = connect ;