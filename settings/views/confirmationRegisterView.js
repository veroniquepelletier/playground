define(function (require) {

    function ConfirmationRegisterView(params) {
        var settings = {},
            el = params.view,
            onNavigate = params.onNavigateFnc;

        this.name = 'ConfirmationRegisterView';

        this.render = function () {
            $('#confirmation_register_settings_tmpl').tmpl({'id': 'el'}).appendTo(el);
            this.addListeners();
        }

        this.destroy = function () {
            el.empty();
        }

        this.addListeners = function () {
            $('.settings_back_button').tap(function () { onNavigate({to : 'back'}); });
        }
    };
    return ConfirmationRegisterView;
});
