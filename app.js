var express      = require('express')
   ,exphbs       = require('express-handlebars')
   ,path         = require('path')
   ,bodyParser   = require('body-parser')
   ,querystring  = require('querystring')
   ,cookieParser = require('cookie-parser')
   ,app          = express()
   ,port         = 3000
/*
var CLIENT_ID = '839b60144cdf4d3398a681d976208eae';
var CLIENT_SECRET = 'c0e83e9a2c37401bab7f74eb2ad77a49';
var ACCESS_TOKEN = '';
var REDIRECT_URI = '';
*/

var client_id = '839b60144cdf4d3398a681d976208eae';
var client_secret = 'c0e83e9a2c37401bab7f74eb2ad77a49';
var redirect_uri = 'http://localhost:3000/callback';



var stateKey = 'spotify_auth_state';

app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}))
   .use(express.static(__dirname + '/public'))
   .use(cookieParser());

app.get('/', function(req, res){
  res.render('home')
})


app.get('/authorize', function(req, res){
  var scope = 'user-read-private user-read-email';
  var qs = {
    client_id: client_id,
    redirect_uri: redirect_uri,
    response_type: 'code',
    scope: scope
  }

  var query = querystring.stringify(qs)
  var url = 'https://accounts.spotify.com/authorize?' + query

    res.redirect(url)
})
/*
app.get('/login', function(req, res){

  var state = generateRandomString(16);
  res.cookie(stateKey, state)

  var scope = 'user-read-private user-read-email';


  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: stategit
    }));


    res.redirect('localhost:3000/callback');


})
*/
app.get('/callback', function(req, res){
  res.render('test')
})


app.listen(port)
console.log('Server running at 127.0.0.1:' +port +'/')
