var {Cc, Ci} = require('chrome');

var env = Cc["@mozilla.org/process/environment;1"].getService(Ci.nsIEnvironment);
var user = env.get("USER") || env.get("USERNAME"); // USER for UNIX, USERNAME for Windows

var pageMod = require("sdk/page-mod");
var mod = null;

var setPageMod = function() {
    var prefs = require("sdk/simple-prefs").prefs;
    
    if (mod) {
        mod.destroy();
    }

    var url = prefs["url"];
    url = url.split(";");
    url = url.filter(Boolean);

    var options = {
        include: url,
        contentScriptFile: "./username.js",
        contentScriptOptions: {
            username: user
        },
        contentScriptWhen: "start"
    };

    if (prefs['java']) {
        options['contentStyleFile'] = "./hide-applet.css";
    }

    mod = pageMod.PageMod(options);
};

require("sdk/simple-prefs").on("", setPageMod);
setPageMod();
