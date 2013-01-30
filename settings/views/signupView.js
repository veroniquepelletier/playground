define(function (require) {

    function SignupView(params) {
        var settings = {},
            el = params.view;
            footer = $('.footer'),
            onNavigate = params.onNavigateFnc;

        this.name = 'SignupView';

        this.render = function () {
            $('#signup_settings_tmpl').tmpl({'id': 'el'}).appendTo(el);
            $('#footer_tmpl').tmpl({'id': 'footer'}).appendTo(footer);
             this.addListeners();
        }

        this.destroy = function () {
            el.empty();
            footer.empty();
        }

        this.update = function (orientation) {
            console.log('update')
            if (orientation === 'landscape') {
                footer.removeClass('footer_portrait').addClass('footer_landscape');
            } else {
                footer.removeClass('footer_landscape').addClass('footer_portrait');
            }
        }

        this.showErrorText = function (text) {

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
            // need to validate all the information
            // first, if the pass is the same
            if( $('.password1').val() !== $('.password2').val() || $('.password1').val().length === 0){
                console.log('NOT THE SAME PASS OR TOO SHORT PASS!!!');
            } else {
                // everything is fine, we can send the email and show conformation
                onNavigate({to : 'ConfirmationRegisterView'});
            }
        }

        this.addListeners = function () {
            var that = this;
            $('.settings_back_button').tap(function () { onNavigate({to : 'back'}); });
            $('.signin_link').tap(function () { onNavigate({to : 'SigninView'}); });
            $('.text_input').tap(function () { that.onTextFocus(this); });
            $('.signup_button').tap(function () { that.onButtonClick(this); });
        }
    };
    return SignupView;
});
