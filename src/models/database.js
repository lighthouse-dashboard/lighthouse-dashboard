const database = require('mongoose');
database.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

export default database;

