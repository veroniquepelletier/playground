define(function (require) {

    var jqueryTap       = require('plugins/jqueryTap');

    function MainView(params) {
        var settings    = {},
            el          = params.view,
            onNavigate  = params.onNavigateFnc;

        this.name = 'MainView';

        this.render = function () {
            $('#main_settings_tmpl').tmpl({'id': 'MainView'}).appendTo(el);
            this.addListeners();
        }

        this.destroy = function () {
            el.empty();
        }

        this.onClick = function (viewName) {
            onNavigate({to : viewName});
        }

        this.update = function () {

        }


        this.addListeners = function () {
            var that = this;
            $('.settings_back_button').tap(function () { that.onClick('tv5'); });
            $('.button_twitter').tap(function () { that.onClick('TwitterSettingsView'); });
            $('.button_facebook').tap(function () { that.onClick('FacebookSettingsView'); });
            $('.button_help').tap(function () { that.onClick('HelpView'); });
            $('.button_about').tap(function () { that.onClick('AboutView'); });
            $('.button_profile').tap(function () { that.onClick('ProfileView'); });
            $('.button_connexion').tap(function () { that.onClick('SigninView'); });

        }
    };
    return MainView;
});
