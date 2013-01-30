define(function (require) {

    var SettingsProxy = {

        userID: null,
        // VO
        settings: {
            version: {
                commitID: '',
                commitDate: '',
                commitTag: ''
            },
            preferences: {
                broadcast: {
                    likes: [],
                    checkins: [],
                    favourites: []
                }
            },
            accounts: {
                twitter: {
                    authorized: false,
                    screenName: '',
                    displayName: ''
                },
                facebook: {
                    authorized: false,
                    screenName: '',
                    displayName: ''
                }
            }
        },

        urlFavouritePost: "/api/v1.0/favourites",
        urlUserSettings: "/api/v1.0/settings",
        urlCheckins: "/api/v1.0/checkins",
        urlLikes: "/api/v1.0/likes",

        // Methods
        setID: function (id) {
            this.userID = id;
        },

        setSettings:function (settings) {
            $.extend(this.settings, settings);
            this.settings.version.commitDate = (new Date(this.settings.version.commitDate)).toString();
        },

        isFacebookEnabled: function (type) {
            // type can beparams like, checkin or favorites
            var arr;
            switch (type) {
                case 'likes' : arr = this.settings.preferences.broadcast.likes; break;
                case 'checkins' : arr = this.settings.preferences.broadcast.checkins; break;
                case 'favourites' : arr = this.settings.preferences.broadcast.favourites; break;
            }
            return (this.settings.accounts.facebook.authorized && arr.indexOf("facebook"));
        },

        getSettings: function() {
            return this.settings;
        },

        getSettingsBroadcast: function() {
            return this.settings.preferences.broadcast;
        },

        jsonRequest: function(type, url, data, callback) {
            callback = callback || this.emptyFunction;

            $.ajax({
                type: type,
                url: url,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    callback(data.results, data && data.status === 'success');
                }
            })
        },

        setFavourites: function (data, callback) {
            data.userId = this.userID;
            this.jsonRequest("POST", this.urlFavouritePost, data, callback);
        },

        setCheckins: function (data, callback) {
            data.userId = this.userID;
            this.jsonRequest("POST", this.urlCheckins, data, callback);
        },

        setLikes: function (data, callback) {
            data.userId = this.userID;
            this.jsonRequest("POST", this.urlLikes, data, callback);
        },

        getID: function () {

            // Check if there is already a unique Id.
            if (localStorage) {
                this.userID = localStorage.uniqueId;
            }

            if (!this.userID) {
                // generates one
                this.userID = utils.createUID();
            }

            if (localStorage) {
                localStorage.userID = this.userID;
            }

            return this.userID;
        },

        signon: function(callback) {
        // TODO :: check when the userID is undefined and check it
            var that = this;
            $.post("/api/v1.0/signon", {deviceId: this.getID()}, function(res) {
                if(res.status !== 'success') {
                    console.log('ERROR: USER ID NOT DEFINED');
                    return;
                }
                that.userID = res.results.userId;
                callback(that.userID);
            });
        },


        loadSettings: function (options) {
            var that = this;
            $.get(this.urlUserSettings, {userId: this.userID}, function (data) {
                if(data.status === 'success') {
                    that.setSettings(data.results);
                    if(options) {
                        options.callback(that.user);
                    }
                }
            })
        },


        saveSettings: function (userSettings, callback) {
            var params = {};
            // Only the preferences can be modified.
            params.preferences = userSettings.preferences;
            params.userId = this.userID;
            this.setSettings(userSettings);
            this.jsonRequest("PUT", this.urlUserSettings, params, callback);
        },

        emptyFunction: function () {

        }
    }

    return SettingsProxy;
});
