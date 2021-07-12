const express = require('express');
const app = express();

const { config } = require('./config/index');

const moviesApi = require('./routes/movies.routes');

const {
    logErrors,
    errorHandler,
    wrapErrors,
} = require('./utils/middleware/errorHandler');

const notFoundHandler = require('./utils/middleware/notFoundHandler')

// Body parser
app.use(express.json());

// Routes
moviesApi(app);

// Catch 404
app.use(notFoundHandler)

// Errors Middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
    console.log(`Listening http://localhost:${config.port}`);
});
