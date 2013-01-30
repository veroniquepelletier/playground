define(function (require) {

    function AboutView(params) {
        var settings = {},
            el = params.view,
            onNavigate = params.onNavigateFnc;

        this.name = 'AboutView';

        this.render = function () {
            console.log('rendering about')

            $('#about_settings_tmpl').tmpl(function () {
                return {
                    version         : '1.0',
                    client          : 'TV5',
                    revision_date   : 'revision_date',
                    revision_id     : 'revision_id',
                    commit_tag      : 'commit_tag'
                };
            }).appendTo(el);


            this.addListeners();
        }

        this.destroy = function () {
            el.empty();
        }

        this.addListeners = function () {
            $('.settings_back_button').tap(function () { onNavigate({to : 'back'}); });
        }
    };
    return AboutView;
});
