
	var exec = require('cordova/exec');
	
	var wazelink = function( url )	{
		exec( null, null, "WazeLink", "execute", [url] );
	};
	
	module.exports = wazelink;
