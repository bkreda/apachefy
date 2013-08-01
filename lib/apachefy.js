#! /usr/bin/env node

var fs   = require('fs');
var exec = require('child_process').exec;
var util = require('util');

//Constants
//------------------------------------------------------------------------

//var APACHE2_HOME = "/home/reda/tmp/";
var APACHE2_HOME = "/etc/apache2/";

var SITE_ENABLED_DIR = APACHE2_HOME + "sites-enabled/";

console.log("→ process.cwd: " + process.cwd());
console.log("→ dirname: " + __dirname);

var currentDir = process.cwd();

//------------------------------------------------------------------------
//
//At install time only.
//console.log(util.format('★ Copy assets/apachefy.conf to %s', SITE_ENABLED_DIR));
//fs.createReadStream('assets/apachefy.conf').pipe(fs.createWriteStream(SITE_ENABLED_DIR + 'apachefy.conf'));

//At each exec
//Read files.apachefy
//Replace __PWD__ by the path where the command was called.
//copy the result files.apachefy to sites-enabled
fs.readFile('assets/files.apachefy.conf', 'utf8', function (err, data) {
	if(err){
		return console.log("✘ Error reading files.apachefy.conf: " + err);
	}

	var result = data.replace(/__PWD__/g, currentDir);

	console.log(util.format('★ Copy files.apachefy.conf to %s', SITE_ENABLED_DIR));
	fs.writeFile(SITE_ENABLED_DIR + 'files.apachefy.conf', result, 'utf8', function(err){
		if(err){
			return console.log('✘ Unable to write files.apachefy.conf: ' + err);
		}
	});
});

//At each exec
console.log("★ Reload apache2");
exec('apache2ctl graceful', function (error, stdout, stderr) {      // one easy function to capture data/errors
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('✘ exec error: ' + error);
    }
});