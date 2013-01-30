define(function (require) {

    function ProfileView(params) {
        var settings = {},
            el = params.view,
            onNavigate = params.onNavigateFnc;

        this.name = 'ProfileView';

        this.render = function () {
            $('#profile_settings_tmpl').tmpl({'id': 'el'}).appendTo(el);
            this.addListeners();
        }

        this.update = function () {

        }

        this.onTextFocus = function (textField) {
            // check if the info text have been cleared
            if (!$(textField).hasClass('cleared')) {
                $(textField).addClass('cleared');
                // not cleared, we need to clear all the info text and change style for pass
                $(textField).val('');
                // check if its the password field, if so, change the type to password.
                // this method might be a security no-no. But it works.
                if ($(textField).hasClass('input_password')) {
                    $(textField).get(0).type='password';
                }
            }
        }

        this.onButtonClick = function (button) {
            if ($(button).hasClass('button_connect')) {
                // TODO :: settingsProxy.connect
            } else {
                // TODO :: dont know that to do
                console.log('*** DO NOT KNOW WHERE TO GO!')
            }
            console.log('button clicked')
        }

        this.destroy = function () {
            el.empty();
        }

        this.addListeners = function () {
            var that = this;
            $('.settings_back_button').tap(function () { onNavigate({to : 'back'}); });
            $('.text_input').tap(function () { that.onTextFocus(this); });
            $('.settings_button').tap(function () { that.onButtonClick(this); });
        }
    };
    return ProfileView;
});
