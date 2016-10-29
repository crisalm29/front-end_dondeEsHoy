WazeLink
===========

Encke Technologies PhoneGap Waze Link

Background
--------------------------------------------------

This plugin developed after needing this functionality for many apps and having no central way to update every app without re-writing the plugin for every app. This code is no secret and please use it if it suites you. I provide no support or guarantees to this code.

This supports the current version of Cordova (3.5.0) and may support versions until 3.0.

If you have any changes, please advise.

Information
--------------------------------------------------

How to use
--------------------------------------------------
To add the plugin:

	cordova plugin add https://github.com/encke/wazelink.git
	
** must be ran in the root directory of your cordova project.

To use:

	WazeLink.open( 'waze://?ll=9.08986,-84.46466' );
	
