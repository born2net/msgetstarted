({
    /// entire structure to: ./dist

    appDir: "../",
    baseUrl: "../",
    dir: "../_dist",
    mainConfigFile: "../init.js",
    optimizeCss: "standard",
    fileExclusionRegExp: /^node_modules$/

    //optimize: "none",

    //browser-sync start --server
    //r.js -o app.build.js

    /// compile used content only to main-built.js
    //  baseUrl: "../",
    // mainConfigFile: "../init.js",
    // name: "init",
    // optimizeCss: "standard",
    // out: "../../_studiolite-dist/init-built.js",
    // include: ["./_common/_js/requirejs/require.js"]
})