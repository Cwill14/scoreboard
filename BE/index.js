const server = require('./server');
// const port = PROCESS.ENV.PORT || 4000;
const port = 4000;

server.listen(4000, () => {
    console.log(`now listening for requests on port ${port}`)
})