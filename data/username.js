var getUserName = function() { return self.options.username; };
var signonApplet = createObjectIn(unsafeWindow, { defineAs: "signonApplet" });

exportFunction(getUserName, signonApplet, { defineAs: "getUserName" });
