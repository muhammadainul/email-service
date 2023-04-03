const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const port = process.env.PORT || 3000;  

// const forever = require('forever-monitor');

// const child = new (forever.Monitor)('./core/mail.js', {
//     silent: true
// });

server.listen(port, () => {
    console.log(`${process.env.NAMESPACE} service listening on ${process.env.NODE_ENV} at port ${port}`);
    // child.start();
});

// child.on('exit', (forever) => {
//     console.log(`===== mail has exited ====`);
//     // console.log(forever);
//     console.log(`===== mail has exited end ====`);
// });

// child.on('restart', (forever) => {
//     console.log(`===== mail has restarted ====`);
//     // console.log(forever);
//     console.log(`===== mail has restarted end ====`);
// });

// child.on('start', (forever) => {
//     console.log(`===== mail has started ====`);
//     // console.log(forever);
//     console.log(`===== mail has started end ====`);
// });

// child.on('stop', (forever) => {
//     console.log(`===== mail has stopped ====`);
//     // console.log(forever);
//     console.log(`===== mail has stopped end ====`);
// });

// child.on('error', (forever) => {
//     console.log(`===== mail has error ====`);
//     // console.log(forever);
//     console.log(`===== mail has error end ====`);
// }); 