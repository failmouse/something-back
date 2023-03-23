const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/user.routes');
const config = require('./src/config');

app.use(bodyParser.json());

app.use('/users', userRoutes);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
