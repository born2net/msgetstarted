/**
 The AppSelector is essentially an App redirector view that redirects to lite or pro account per the credentials authenticated
 @class AppSelectorView (AppRedirector)
 @constructor
 @return {object} instantiated AppSelectorView
 **/
define(['jquery', 'backbone', 'StackView', 'Base64', 'platform', 'Elements'], function ($, Backbone, StackView, Base64, platform, Elements) {

    BB.SERVICES.APP_SELECTOR = 'AppSelectorView';

    var AppSelectorView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.m_navigationCreated = false;
            Backbone.StackView.ViewPort.prototype.initialize.call(this);
            BB.comBroker.setService(BB.SERVICES.APP_SELECTOR, self);
            self.m_businessModel = BB.comBroker.getService(BB.SERVICES.BUSINESS_MODEL);
            self.m_loggedOut = false;
            self.m_loadTimer = 3000;
            self._listenSelection();
            self._listenLoggedout();
        },

        _listenSelection: function () {
            var self = this;
            self.listenTo(self.options.stackView, BB.EVENTS.SELECTED_STACK_VIEW, function (e) {
                if (e != self) return;
                self._render();
            });
        },

        _listenLoggedout: function () {
            var self = this;
            BB.comBroker.listen(BB.EVENTS.APP_LOGOUT, function (e) {
                self.m_loggedOut = true;
            })
        },

        _render: function () {
            var self = this;
            var msg = $(Elements.LOADING_STUDIO_TEXT).text();
            switch (BB.STUDIO_TYPE) {

                case BB.CONSTS.STUDIO_LITE:
                {
                    msg = msg + ' StudioLite...';
                    setTimeout(function () {
                        // if logged out during timer, don't redirect app
                        if (self.m_loggedOut)
                            return;
                        var credentials = 'user=' + self.m_businessModel.get('contactEmail') + ',pass=' + self.m_businessModel.get('newAccPassword');
                        credentials = $.base64.encode(credentials);
                        var url = BB.Pepper.getStudioLiteURL();
                        url = url + '?param=' + credentials;
                        $(location).attr('href', url);
                    }, self.m_loadTimer);
                    break;
                }

                case BB.CONSTS.STUDIO_DASH:
                {
                    // in cloud use StudioDashboard
                    if (BB.globs['MEDIA_CLOUD']){
                        msg = msg + ' StudioDashboard...';
                        setTimeout(function () {
                            // if logged out during timer don't redirect app
                            if (self.m_loggedOut)
                                return;
                            var credentials = 'user=' + self.m_businessModel.get('contactEmail') + ',pass=' + self.m_businessModel.get('newAccPassword');
                            credentials = $.base64.encode(credentials);
                            credentials = credentials.replace(/=/,'');
                            var url = BB.Pepper.getStudioDashURL(credentials);
                            $(location).attr('href', url);
                        }, self.m_loadTimer);
                        break;

                    } else {

                        // in private server / hybrid servers use StudioEnterprise
                        msg = msg + '...';
                        if (BB.APPS_SUPPORT == BB.CONSTS.OS_FLASH) {
                            setTimeout(function () {
                                // if logged out during timer, don't redirect app
                                if (self.m_loggedOut)
                                    return;
                                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDesk', {trigger: true});
                            }, self.m_loadTimer);
                        } else {
                            setTimeout(function () {
                                // if logged out during timer, don't redirect app
                                if (self.m_loggedOut)
                                    return;
                                var os = platform.os.family;
                                var re = os.match(new RegExp('windows', "ig"));
                                if (_.isNull(re)){
                                    Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDeskNoFlash', {trigger: true});
                                } else {
                                    // Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDeskNoFlash', {trigger: true});
                                    Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDeskNoFlashWin', {trigger: true});
                                }
                            }, self.m_loadTimer);
                        }
                        break;
                    }
                    break;
                }

                case BB.CONSTS.STUDIO_PRO:
                {
                    msg = msg + '...';
                    if (BB.APPS_SUPPORT == BB.CONSTS.OS_FLASH) {
                        setTimeout(function () {
                            // if logged out during timer, don't redirect app
                            if (self.m_loggedOut)
                                return;
                            Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDesk', {trigger: true});
                        }, self.m_loadTimer);
                    } else {
                        setTimeout(function () {
                            // if logged out during timer, don't redirect app
                            if (self.m_loggedOut)
                                return;
                            var os = platform.os.family;
                            var re = os.match(new RegExp('windows', "ig"));
                            if (_.isNull(re)){
                                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDeskNoFlash', {trigger: true});
                            } else {
                                // Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDeskNoFlash', {trigger: true});
                                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDeskNoFlashWin', {trigger: true});
                            }
                        }, self.m_loadTimer);
                    }
                    break;
                }
            }
            $(Elements.LOADING_STUDIO).text(msg);
        },

        ////////////////////////////////////
        // all the code below is currently
        // not being used since we are using
        // just a simple redirect to StudioLite / Pro
        // instead of app selector.
        // using: Elements.APP_REDIRECT,
        // not using: Elements.APP_SELECTOR,
        ////////////////////////////////////
        events: {
            'click button': function (e) {
                var self = this;
                var t = $(e.target).hasClass('fa') ? $(e.target).parent() : e.target;
                var appName = $(t).attr('name');
                switch (appName) {
                    case BB.CONSTS.MAILWASP:
                    {
                        BB.comBroker.getService(BB.SERVICES.LAYOUT_ROUTER).navigate('appMailWasp', {trigger: true});
                        break;
                    }
                    case BB.CONSTS.EVERNODES:
                    {
                        BB.comBroker.getService(BB.SERVICES.LAYOUT_ROUTER).navigate('appEverNodes', {trigger: true});
                        break;
                    }
                }
            }
        },

        _loadFileMenu: function (i_appName) {
            var self = this;
            switch (i_appName) {
                case BB.CONSTS.MAILWASP:
                {
                    $(Elements.FILE_NAV_WASP)[0].style.display = '';
                    $(Elements.FILE_NAV_EVER).hide();
                    break;
                }
                case BB.CONSTS.EVERNODES:
                {
                    $(Elements.FILE_NAV_EVER)[0].style.display = '';
                    $(Elements.FILE_NAV_WASP).hide();
                    break;
                }
            }
        },

        selectApp: function (i_appName) {
            var self = this;
            if (self.m_navigationCreated) {
                self._loadFileMenu(i_appName)
                return;
            }
            self.m_navigationCreated = true;
            $(Elements.COMMON_FILE_MENU).append($(Elements.FILE_NAV_WASP));
            $(Elements.COMMON_FILE_MENU).append($(Elements.FILE_NAV_EVER));
            self._loadFileMenu(i_appName);
        }
    });

    return AppSelectorView;
});
