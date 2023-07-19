const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')


const app = express()

app.use(express.static('dist'))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

let baseURL = "https://api.meaningcloud.com/sentiment-2.1";
const apiKey = process.env.API_KEY;

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.post('/postData', getAPIDetails = (req, res) => {
    let text = req.body;
    APIDetails = {
        baseURL: baseURL,
        apiKey: apiKey,
        text: text
    };
    res.send(APIDetails);
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})



