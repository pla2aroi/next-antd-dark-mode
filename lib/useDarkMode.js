"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_script_hook_1 = require("react-script-hook");
var loadLess = function (src) {
    var link = document.createElement('link');
    link.rel = 'stylesheet/less';
    link.type = 'text/css';
    link.href = src;
    return link;
};
var useDarkMode = function (options) {
    var _a = react_1.useState(false), isLoadScript = _a[0], setIsLoadScript = _a[1];
    react_script_hook_1.default({
        src: options.lessJSPath,
        checkForExisting: true,
        onload: function () {
            if (!window.less)
                return;
            window.less.options.env = 'production';
            window.less.options.async = false;
            window.less.options.logLevel = 0;
            window.less.options.javascriptEnabled = true;
            window.less.sheets = [loadLess(options.lessFilePath)];
            setTimeout(function () { return setIsLoadScript(true); }, 500);
        },
    });
    var onModifyVars = function (vars, cb) {
        if (!!window.less) {
            window.less
                .modifyVars(vars)
                .then(function () { return cb(true); })
                .catch(function () {
                cb(false);
                console.error('failed to update theme');
            });
        }
    };
    return {
        isLoadScript: isLoadScript,
        onModifyVars: onModifyVars,
    };
};
exports.default = useDarkMode;