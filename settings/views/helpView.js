define(function (require) {

    function HelpView(params) {
        var settings = {},
            el = params.view,
            onNavigate = params.onNavigateFnc;

        this.name = 'HelpView';

        this.render = function () {
            $('#help_settings_tmpl').tmpl({'id': 'el'}).appendTo(el);
            this.addListeners();
        }

        this.destroy = function () {
            el.empty();
        }

        this.addListeners = function () {
            $('.settings_back_button').tap(function () { onNavigate({to : 'back'}); });
        }
    };
    return HelpView;
});
