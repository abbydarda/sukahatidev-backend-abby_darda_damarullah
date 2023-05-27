const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { appConfig } = require('./config');
const PORT = appConfig.APP.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
 console.log(`Server berjalan di PORT ${PORT}`);
});
