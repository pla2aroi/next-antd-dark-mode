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
    var _a = react_1.useState(true), isLoadScript = _a[0], setIsLoadScript = _a[1];
    react_script_hook_1.default({
        src: options.lessJSPath,
        checkForExisting: true,
        onload: function () {
            if (!window.less)
                return;
            window.less.options.env = !!options.isDebugLog ? 'development' : 'production';
            window.less.options.async = false;
            window.less.options.logLevel = !!options.isDebugLog ? 2 : 0;
            window.less.options.javascriptEnabled = true;
            window.less.sheets = [loadLess(options.lessFilePath)];
            setTimeout(function () { return setIsLoadScript(false); }, 100);
        },
    });
    var onModifyVars = function (vars, cb) {
        if (!window.less) {
            if (typeof cb === 'function')
                cb(false);
            return;
        }
        window.less
            .modifyVars(vars)
            .then(function () {
            if (typeof cb === 'function')
                cb(true);
        })
            .catch(function () {
            if (typeof cb === 'function')
                cb(false);
        });
    };
    return {
        isLoadScript: isLoadScript,
        onModifyVars: onModifyVars,
    };
};
exports.default = useDarkMode;
