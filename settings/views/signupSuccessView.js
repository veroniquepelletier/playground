define(function (require) {

    function SignupSuccessView(params) {
        var settings = {},
            el = params.view;

        this.render = function () {
            $('#signup_success_settings_tmpl').tmpl({'id': 'toto'}).appendTo(el);
        }

        this.update = function () {

        }

        this.destroy = function () {
            el.empty();
        }

        this.addListeners = function () {

        }
    };
    return SignupSuccessView;
});
