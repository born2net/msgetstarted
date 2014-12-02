/**
 App router and layout router responsible for kick starting the application as
 well as management for sizing events
 @class LayoutRouter
 @constructor
 @return {Object} instantiated AppRouter
 **/
define(['underscore', 'jquery', 'backbone', 'text', 'AppAuth', 'AppEntryFaderView', 'LoginView', 'AppContentFaderView', 'AppSelectorView', 'WaitView', 'bootbox', 'XDate', 'SignagePlayerView', 'CreateAccView', 'RenameView', 'ChangePassView', 'ChangeBusinessView', 'ForgetPassView', 'StudioSelectView', 'StudioListView', 'AccountView', 'WebDeskSelectView'],
    function (_, $, Backbone, text, AppAuth, AppEntryFaderView, LoginView, AppContentFaderView, AppSelectorView, WaitView, Bootbox, XDate, SignagePlayerView, CreateAccView, RenameView, ChangePassView, ChangeBusinessView, ForgetPassView, StudioSelectView, StudioListView, AccountView, WebDeskSelectView) {

        BB.SERVICES.LAYOUT_ROUTER = 'LayoutRouter';
        BB.SERVICES.APP_CONTENT_MAILWASP_FADER_VIEW = 'AppContentMailWaspFaderView';
        BB.SERVICES.APP_CONTENT_EVERNODES_FADER_VIEW = 'AppContentEverNodesFaderView';

        /**
         Event fired when app resized
         @event APP_SIZED
         @static
         @final
         **/
        BB.EVENTS.APP_SIZED = 'APP_SIZED';

        var LayoutRouter = BB.Router.extend({

            /**
             Constructor
             @method initialize
             **/
            initialize: function () {
                var self = this;
                BB.comBroker.setService(BB.SERVICES['LAYOUT_ROUTER'], self);
                BB.comBroker.setService('XDATE', new XDate());

                self._initLoginPage();
                self._listenLoadAppSelector();
                self._listenSizeChanges();

                $(window).trigger('resize');
                $('[data-toggle="tooltip"]').tooltip({'placement': 'bottom', 'delay': 1000});
            },

            /**
             Router definition to function maps
             @method routes
             **/
            routes: {
                "appMailWasp": "_routeAppMailWasp",
                "appEverNodes": "_routeAppEverNodes",
                "appSelector": "_routeAppSelector",
                "authenticate/:user/:pass": "_routeAuthenticate",
                "authenticating": "_routeAuthenticating",
                "forgetPassword": "_routeForgetPassword",
                "createAcc": "_routeCreateAcc",
                "studioSelectView": "_routeStudioSelectView",
                "changePassword": "_routeChangePassword",
                "changeBusiness": "_routeChangeBusiness",
                "authenticated": "_routeAuthenticated",
                "unauthenticated": "_routeUnauthenticated",
                "authenticationFailed": "_routeAuthenticationFailed",
                "selectStudioLite": "_routeSelectStudioLite",
                "selectStudioPro": "_routeSelectStudioPro",
                "start": "_routeStart"
            },

            _routeStart: function(){
                this.navigate('authenticate/_/_', {trigger: true});
            },

            /**
             Initiate user credential route authentication
             @method authenticate
             @param {String} i_user
             @param {String} i_pass
             **/
            _routeAuthenticate: function (i_user, i_pass) {
                this.m_appAuth.authenticate(i_user, i_pass);
            },

            /**
             In process of route authentication
             @method authenticating
             **/
            _routeAuthenticating: function () {
                this.m_appEntryFaderView.selectView(this.m_mainAppWaitView);
            },

            _routeForgetPassword: function(){
                this.m_appEntryFaderView.selectView(this.m_forgetPassView);
            },

            _routeChangePassword: function(){
                this.m_appEntryFaderView.selectView(this.m_changePassView);
            },

            _routeCreateAcc: function(){
                this.m_appEntryFaderView.selectView(this.m_accountView);
            },

            _routeStudioSelectView: function(){
                this.m_appEntryFaderView.selectView(this.m_studioSelectView);
            },

            _routeChangeBusiness: function(){
                this.m_appEntryFaderView.selectView(this.m_changeBusinessView);
            },


            /**
             Authentication passed, load app page route
             @method authenticating
             **/
            _routeAuthenticated: function () {
                this.navigate('appSelector', {trigger: true});
            },

            /**
             No authentication passed, load Login page route
             @method authenticating
             **/
            _routeUnauthenticated: function () {
                var self = this;
                self.m_appEntryFaderView.selectView(this.m_loginView);
            },

            /**
             Failed user authentication route
             @method authenticationFailed
             **/
            _routeAuthenticationFailed: function () {
                Bootbox.dialog({
                    message: $(Elements.MSG_BOOTBOX_WRONG_USER_PASS).text(),
                    title: $(Elements.MSG_BOOTBOX_PROBLEM).text(),
                    buttons: {
                        danger: {
                            label: $(Elements.MSG_BOOTBOX_OK).text(),
                            className: "btn-danger",
                            callback: function () {
                            }
                        }
                    }
                });
                this.m_appEntryFaderView.selectView(this.m_loginView);
            },

            /**
             Route selected StudioLite app
             @method _routeSelectStudioLite
             **/
            _routeSelectStudioLite: function(){
                this.m_appEntryFaderView.selectView(this.m_studioLiteView);
            },

            /**
             Route selected StudioPro app
             @method _routeSelectStudioPro
             **/
            _routeSelectStudioPro: function(){
                this.m_appEntryFaderView.selectView(this.m_studioProView);
            },

            /**
             On successful authentication load app selector
             @method _routeAppSelector
             **/
            _routeAppSelector: function () {
                if (!this.m_appAuth.authenticated) {
                    this.navigate('unauthenticated', {trigger: true});
                    return;
                }
                this._disableBack();
                this.m_appEntryFaderView.selectView(this.m_appSelectorView);
            },

            /**
             Enter the MailWasp app
             @method _routeAppMailWasp
             **/
            _routeAppMailWasp: function () {
                var self = this;
                if ($(Elements.APP_MAILWASP_CONTENT).children().length == 0) {
                    require(['text!_templates/_templateMailWasp.html', 'MailWasp'], function (template, MailWasp) {
                        $(Elements.APP_MAILWASP_CONTENT).append(template);
                        self.m_mailWasp = new MailWasp({
                            el: Elements.APP_NAVIGATOR_WASP,
                            'stackView': self.m_appContentMailWaspFaderView
                        });
                        self.m_appEntryFaderView.selectView(self.m_appContentMailWaspFaderView);
                        BB.comBroker.getService(BB.SERVICES.APP_SELECTOR).selectApp(BB.CONSTS.MAILWASP);
                        self._updateLayout();
                    });
                } else {
                    self.m_appEntryFaderView.selectView(self.m_appContentMailWaspFaderView);
                    BB.comBroker.getService(BB.SERVICES.APP_SELECTOR).selectApp(BB.CONSTS.MAILWASP);
                    self._updateLayout();
                }
            },

            /**
             Enter the EverNodes app
             @method _routeAppEverNodes
             **/
            _routeAppEverNodes: function () {
                var self = this;
                if ($(Elements.APP_EVERNODES_CONTENT).children().length == 0) {
                    require(['text!_templates/_templateEverNodes.html', 'EverNodes'], function (template, EverNodes) {
                        $(Elements.APP_EVERNODES_CONTENT).append(template);
                        self.m_everNodes = new EverNodes({
                            el: Elements.APP_NAVIGATOR_EVER,
                            'stackView': self.m_appContentEverNodesFaderView
                        });
                        self.m_appEntryFaderView.selectView(self.m_appContentEverNodesFaderView);
                        BB.comBroker.getService(BB.SERVICES.APP_SELECTOR).selectApp(BB.CONSTS.EVERNODES);
                        self._updateLayout();
                    });
                } else {
                    self.m_appEntryFaderView.selectView(self.m_appContentEverNodesFaderView);
                    BB.comBroker.getService(BB.SERVICES.APP_SELECTOR).selectApp(BB.CONSTS.EVERNODES);
                    self._updateLayout();
                }
            },

            /**
             Create two StackView views: AppEntryFaderView and AppContentFaderView
             AppEntryFaderView allows for page selection between login page and main app content page
             AppContentFaderView serves as dual purpose view. On one hand it serves as simple show/hide div for  main login page / content page,
             on the other hand it itself is a StackView.Fader that allows for show/hide between main content sections including campaigns,
             stations, resources, settings etc
             @method _initLoginPage
             **/
            _initLoginPage: function () {

                this.m_appAuth = new AppAuth();

                this.m_appEntryFaderView = new AppEntryFaderView({
                    el: Elements.APP_ENTRY,
                    duration: 500
                });

                this.m_appSelectorView = new AppSelectorView({
                    el: Elements.APP_SELECTOR,
                    duration: 650
                });

                this.m_appContentMailWaspFaderView = new AppContentFaderView({
                    el: Elements.APP_MAILWASP_CONTENT,
                    duration: 650
                });

                this.m_appContentEverNodesFaderView = new AppContentFaderView({
                    el: Elements.APP_EVERNODES_CONTENT,
                    duration: 650
                });

                this.m_loginView = new LoginView({
                    el: Elements.APP_LOGIN
                });

                this.m_signagePlayerView = new SignagePlayerView({
                    el: Elements.SIGNAGE_PLAYER_VIEW
                });

                this.m_createAccView = new CreateAccView({
                    el: Elements.CREATE_ACC_VIEW
                });

                this.m_renameView = new RenameView({
                    el: Elements.RENAME_VIEW
                });

                this.m_changePassView = new ChangePassView({
                    el: Elements.CHANGE_PASS_VIEW
                });

                this.m_changeBusinessView = new ChangeBusinessView({
                    el: Elements.CHANGE_BUSINESS_VIEW
                });

                this.m_forgetPassView = new ForgetPassView({
                    el: Elements.FORGET_PASS_VIEW
                });

                this.m_studioSelectView = new StudioSelectView({
                    el: Elements.STUDIO_SELECT_VIEW
                });

                this.m_studioLiteView = new StudioListView({
                    el: Elements.STUDIO_LITE_VIEW,
                    stackView: this.m_appEntryFaderView
                });

                this.m_studioProView = new StudioListView({
                    el: Elements.STUDIO_PRO_VIEW,
                    stackView: this.m_appEntryFaderView
                });

                this.m_accountView = new AccountView({
                    el: Elements.ACCOUNT_VIEW
                });

                this.m_webDeskSelectView = new WebDeskSelectView({
                    el: Elements.WEB_DESK_SELECT_VIEW
                });

                this.m_mainAppWaitView = new WaitView({
                    el: Elements.WAITS_SCREEN_ENTRY_APP
                });

                this.m_logoutView = new BB.View({
                    el: Elements.APP_LOGOUT
                });

                this.m_appEntryFaderView.addView(this.m_appSelectorView);
                this.m_appEntryFaderView.addView(this.m_signagePlayerView);
                this.m_appEntryFaderView.addView(this.m_createAccView);
                this.m_appEntryFaderView.addView(this.m_renameView);
                this.m_appEntryFaderView.addView(this.m_changePassView);
                this.m_appEntryFaderView.addView(this.m_changeBusinessView);
                this.m_appEntryFaderView.addView(this.m_forgetPassView);
                this.m_appEntryFaderView.addView(this.m_studioSelectView);
                this.m_appEntryFaderView.addView(this.m_studioLiteView);
                this.m_appEntryFaderView.addView(this.m_studioProView);
                this.m_appEntryFaderView.addView(this.m_accountView);
                this.m_appEntryFaderView.addView(this.m_webDeskSelectView);
                this.m_appEntryFaderView.addView(this.m_loginView);
                this.m_appEntryFaderView.addView(this.m_logoutView);
                this.m_appEntryFaderView.addView(this.m_appContentMailWaspFaderView);
                this.m_appEntryFaderView.addView(this.m_appContentEverNodesFaderView);
                this.m_appEntryFaderView.addView(this.m_mainAppWaitView);

                BB.comBroker.setService(BB.SERVICES['APP_AUTH'], this.m_appAuth);
                BB.comBroker.setService(BB.SERVICES.APP_CONTENT_MAILWASP_FADER_VIEW, this.m_appContentMailWaspFaderView);
                BB.comBroker.setService(BB.SERVICES.APP_CONTENT_EVERNODES_FADER_VIEW, this.m_appContentEverNodesFaderView);
            },

            /**
             Listen to selection of going back to app selection screen
             @method _listenLoadAppSelector
             **/
            _listenLoadAppSelector: function () {
                var self = this;
                $(Elements.APP_LOGO_TEXT).on('click', function (e) {
                    self.navigate('appSelector', {trigger: true});
                });
            },

            /**
             Listen to application size changes and lazy update when so
             @method _listenSizeChanges
             **/
            _listenSizeChanges: function () {
                var self = this;
                var lazyLayout = _.debounce(self._updateLayout, 150);
                $(window).resize(lazyLayout);
            },

            /**
             Update key element height changes on size change and notify event subscribers
             @method _updateLayout
             **/
            _updateLayout: function () {
                var self = BB.comBroker.getService(BB.SERVICES['LAYOUT_ROUTER']);
                var b = $('body');
                self._appHeight = parseInt(b.css('height').replace('px', ''));
                self._appWidth = parseInt(b.css('width').replace('px', ''));
                var h = self._appHeight - 115; // reduce footer

                $(Elements.CLASS_APP_HEIGHT).height(h);
                $(Elements.PROP_PANEL_WRAP).height(h);
                $(Elements.MAIN_PANEL_WRAP).height(h);
                $(Elements.APP_NAVIGATOR_WASP).height(h);
                $(Elements.APP_NAVIGATOR_EVER).height(h);
                $(Elements.RESOURCE_LIB_LIST_WRAP).height(h);
                $(Elements.PRICING_TABLE_WRAP).height(h - 200);

                BB.comBroker.fire(BB.EVENTS.APP_SIZED, this, null, {width: self._appWidth, height: self._appHeight});
            },

            /**
             Disable browser back button
             @method disableBack
             **/
            _disableBack: function () {
                var self = this;
                window.location.hash = "start_";
                window.location.hash = "Again-start_";//for google chrome
                window.onhashchange = function () {
                    window.location.hash = "start_";
                }
            },

            /**
             Get latest registered app width
             @return {Number} width
             **/
            getAppWidth: function () {
                return this._appWidth;
            },

            /**
             Get latest registered app height
             @return {Number} height
             **/
            getAppHeight: function () {
                return this._appHeight;
            }
        });

        return LayoutRouter;
    });