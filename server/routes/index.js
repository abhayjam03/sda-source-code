

const initializeRoutes = (app) => {
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/academy', require('./routes/academy'));
    app.use('/api/courses', require('./routes/courses'));
    app.use('/api/forces', require('./routes/forces'));
    app.use('/api/schools', require('./routes/schools'));
}

export default initializeRoutes;