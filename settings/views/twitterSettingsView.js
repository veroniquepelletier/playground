define(function (require) {

    var SlidingToggle       = require('plugins/slidingToggle'),
        SettingsProxy       = require('models/settingsProxy');

    function TwitterSettingsView(params) {
        var settings        = {},
            el              = params.view,
            onNavigate      = params.onNavigateFnc,
            userSettings    = SettingsProxy.getSettings();

        this.name = 'TwitterSettingsView';

        this.render = function () {
            $('#twitter_settings_tmpl').tmpl({'id': 'toto'}).appendTo(el);
            this.addListeners();
            this.handleCheckBox($("#listen_sliding", el), userSettings.preferences.broadcast.checkins, "twitter");
        }

        this.handleCheckBox = function($checkBox, items, itemName) {
            var slidingOptions = {
                    checked: $.inArray(itemName, items) !== -1,
                    onChange: function (checked) {
                        if (checked) {
                            if ($.inArray(itemName, items) === -1) {
                                // security check to prevent duplicate
                                items.push(itemName);
                            }
                        } else {
                            items.splice(items.indexOf(itemName), 1);
                        }
                        SettingsProxy.saveSettings(userSettings);
                    }
                };

            SlidingToggle.create($checkBox, slidingOptions);
        }

        this.destroy = function () {
            el.empty();
        }

        this.addListeners = function () {
            $('.settings_back_button').tap(function () { onNavigate({to : 'back'}); });
        }
    };
    return TwitterSettingsView;
});
