// Set the require.js configuration
require.config({

  // Initialize the application with the main application file.
    deps: ["main"],
    paths: {
        // JavaScript folders.
        libs: "../../assets/js/libs",
        plugins: "../../assets/js/plugins",

        // Libraries.
        jquery: "../../assets/js/libs/jquery",
        jquerytmpl: "../../assets/js/libs/jquery-tmpl",
    },

    shim: {
        'jquerytmpl': ['jquery'],
    }


    // TODO :: uglifyjs

});

// pre loading of jquery, jquery-tmpl and masonry
require([
    'jquery',
    'jquerytmpl'
],
function($, tmpl) {
    // dependencies loaded
});
