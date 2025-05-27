const http = require('http');
const app = require('./app');

//we are using port here 
const port = process.env.PORT || 3000;

//creating server and passing app that we created 
const server = http.createServer(app);

//letting server run on a certain port via listen 
//we also need an extension : npm i dotenv & cors
// the reason behind is not to make your app running on a fixed port instead we should get idea of which port to use from an environmental varibale

//running a callback here means when server will start to listen port  we will console.log that thing
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

