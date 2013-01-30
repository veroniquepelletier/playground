define(function (require) {

    var SlidingToggle       = require('plugins/slidingToggle'),
        SettingsProxy       = require('models/settingsProxy');


    function FacebookSettingsView(params) {
        var settings        = {},
            el              = params.view,
            onNavigate      = params.onNavigateFnc,
            userSettings    = SettingsProxy.getSettings();

        this.name = 'FacebookSettingsView';

        this.update = function () {

        }

        this.render = function () {
            $('#facebook_settings_tmpl').tmpl({'id': 'toto'}).appendTo(el);
            this.addListeners();
            this.handleCheckBox($("#checkins_sliding", el), userSettings.preferences.broadcast.checkins, "facebook");
            this.handleCheckBox($("#likes_sliding", el), userSettings.preferences.broadcast.likes, "facebook");
            this.handleCheckBox($("#favourites_sliding", el), userSettings.preferences.broadcast.favourites, "facebook");
        }

        this.createSlidingToggle = function() {
            $('#checkins_sliding').SlidingToggle()
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
    return FacebookSettingsView;
});
