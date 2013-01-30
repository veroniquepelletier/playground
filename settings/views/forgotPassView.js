define(function (require) {

    function ForgotPassView(params) {
        var settings = {},
            el = params.view,
            onNavigate = params.onNavigateFnc;

        this.name = 'ForgotPassView';

        this.render = function () {
            $('#forgot_password_settings_tmpl').tmpl({'id': 'el'}).appendTo(el);
            this.addListeners();
        }

        this.destroy = function () {
            el.empty();
        }

        this.addListeners = function () {
            $('.settings_back_button').tap(function () { onNavigate({to : 'back'}); });
        }
    };
    return ForgotPassView;
});
