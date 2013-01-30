define(function (require) {

    function SigninView(params) {
        var settings = {},
            el = params.view;
            footer = $('.footer'),
            onNavigate = params.onNavigateFnc;

        this.name = 'SigninView';

        this.render = function () {
            $('#signin_settings_tmpl').tmpl({'id': 'el'}).appendTo(el);
            $('#footer_tmpl').tmpl({'id': 'footer'}).appendTo(footer);
            this.addListeners();
        }

        this.update = function (orientation) {

            console.log('update ::' + orientation)
            if (orientation === 'landscape') {
                footer.removeClass('footer_portrait').addClass('footer_landscape');
            } else {
                footer.removeClass('footer_landscape').addClass('footer_portrait');
            }
        }

        this.onConnectionComplete = function (success) {

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

        this.onCheckBoxClick = function (checkbox) {
            // TODO :: link it to BE
            if($(checkbox).hasClass('check_box_off')) {
                $(checkbox).removeClass('check_box_off').addClass('check_box_on');
            } else {
                 $(checkbox).removeClass('check_box_on').addClass('check_box_off');
            }
        }

        this.destroy = function () {
            el.empty();
            footer.empty();
        }

        this.addListeners = function () {
            var that = this;
            $('.settings_back_button').tap(function () { onNavigate({to : 'back'}); });
            $('.password_forgot').tap(function () { onNavigate({to : 'ForgotPassView'}); });
            $('.register').tap(function () { onNavigate({to : 'SignupView'}); });
            $('.text_input').tap(function () { that.onTextFocus(this); });
            $('.check_box').tap(function () { that.onCheckBoxClick(this); });
            $('.settings_button').tap(function () { that.onButtonClick(this); });
        }
    };

    return SigninView;
});
