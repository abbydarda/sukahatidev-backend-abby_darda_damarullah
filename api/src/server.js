const express = require('express');
const routes = require('./routes');

const app = express();
const bodyParser = require('body-parser');
const {
 appConfig: { APP },
} = require('./config');
const {
 errorHandlerMid: { errorHandler },
} = require('./middlewares');
const PORT = APP.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.use(errorHandler);
app.listen(PORT, () => {
 console.log(`Server berjalan di PORT ${PORT}`);
});
