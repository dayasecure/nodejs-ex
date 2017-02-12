var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();

var serverUrl =   process.env.OPENSHIFT_APP_DNS  || "localhost:3000"
var mainFile =   process.env.OPENSHIFT_REPO_DIR  || "./"
var api = new ParseServer({
  databaseURI: process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
  cloud: mainFile + 'cloud/main.js', // Absolute path to your Cloud Code
  appId: 'myAppId',
  masterKey: 'myMasterKey', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: serverUrl = 'http://' + serverUrl + "/parse" // Don't forget to change to https if needed
});

// var ParseDashboard = require('parse-dashboard');
var ParseDashboard = require('parse-dashboard');

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": serverUrl,
      "appId": "myAppId",
      "masterKey": "myMasterKey",
      "appName": "MyApp"
    }
  ],
  "users":[
    {
      "user":"daya",
      "pass":"dayasecure"
    }
  ]
}, true);
app.use('/dashboard', dashboard)

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);
//port 1337
app.listen(process.env.NODE_PORT || 3000, process.env.NODE_IP || 'localhost', function() {
  console.log('parse-server-example running on port 3000.');
});