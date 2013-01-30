define(function (require) {
    var MainView                    = require('views/mainView'),
        AboutView                   = require('views/aboutView'),
        HelpView                    = require('views/helpView'),
        SigninView                  = require('views/signinView'),
        ConfirmationRegisterView    = require('views/confirmationRegisterView'),
        ForgotPassView              = require('views/forgotPassView'),
        SignupView                  = require('views/signupView'),
        SignupSuccessView           = require('views/signupSuccessView'),
        FacebookSettingsView        = require('views/facebookSettingsView'),
        TwitterSettingsView         = require('views/twitterSettingsView'),
        ProfileView                 = require('views/profileView'),
        SettingsProxy               = require('models/settingsProxy'),


        App = {

        currentView: null,
        el: null,
        history: [],

        onNavigate: function(params) {
            if( params.to === 'tv5') {
                window.location.href = "/app/tv5";
            }

            if (params.to === 'back') {
                this.onNavigate({to : this.history.pop(), from: 'back'});
                return;
            }

            if(this.currentView) {
                this.currentView.destroy();
                if(params.from !== 'back') {
                    // we can add it to history
                    this.history.push(this.currentView.name);
                }
            }

            var options = {
                view            : this.el,
                onNavigateFnc   : $.proxy(this.onNavigate, this)
            }

            switch(params.to) {
                case 'MainView'                 :  this.currentView = new MainView(options); break;
                case 'TwitterSettingsView'      :  this.currentView = new TwitterSettingsView(options); break;
                case 'FacebookSettingsView'     :  this.currentView = new FacebookSettingsView(options); break;
                case 'SigninView'               :  this.currentView = new SigninView(options); break;
                case 'ForgotPassView'           :  this.currentView = new ForgotPassView(options); break;
                case 'SignupView'               :  this.currentView = new SignupView(options); break;
                case 'ConfirmationRegisterView' :  this.currentView = new ConfirmationRegisterView(options); break;
                case 'AboutView'                :  this.currentView = new AboutView(options); break;
                case 'HelpView'                 :  this.currentView = new HelpView(options); break;
                case 'ProfileView'              :  this.currentView = new ProfileView(options); break;
            }

            this.currentView.render();
            if (this.currentView.update) {
                this.currentView.update(this.getOrientation());
            }
        },

        getQueryParameterByName: function(name) {
            var match = window.RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
            return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : null;
        },



        onSignonComplete: function(userID) {
            // check if there any parametres
            var signin = this.getQueryParameterByName("signin");
            if (signin === 'true') {
                this.history.push('MainView');  // to be able to go back to settings -- TO CHANGE POSSIBLY
                this.onNavigate({to: 'SigninView'});
            } else{
                this.onNavigate({to: 'MainView'});
            }
        },

        getOrientation: function () {
            if (window.hasOwnProperty("orientation")) {
                return (window.orientation === 90 || window.orientation === -90) ? 'landscape' : 'portrait';
            } else {
                return ($(window).height() < $(window).width()) ? 'landscape' : 'portrait';
            }
        },

        addListeners: function() {
            var that = this,
                supportsOrientationChange = "onorientationchange" in window,
                orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

            window.addEventListener(orientationEvent, function() {
                console.log('orientation changed')
                that.currentView.update(that.getOrientation());
            }, false);
        },

        signin: function () {
            SettingsProxy.signon($.proxy(this.onSignonComplete, this));
        },

        start: function () {
            console.log('starting app in dev mode')
            this.el = $('.content');
            this.signin();
            this.addListeners();
        }
    };
    return App;
});
