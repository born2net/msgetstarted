/**
 The AppSelector is essentially an App redirector view that redirects to lite or pro account per the credentials authenticated
 @class AppSelectorView (AppRedirector)
 @constructor
 @return {object} instantiated AppSelectorView
 **/
define(['jquery', 'backbone', 'StackView', 'Base64'], function ($, Backbone, StackView, Base64) {

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
            self._listenSelection();
        },

        _listenSelection: function () {
            var self = this;
            self.listenTo(self.options.stackView, BB.EVENTS.SELECTED_STACK_VIEW, function (e) {
                if (e != self) return;
                self._render();
            });
        },

        _render: function () {
            var self = this;
            var msg = $(Elements.LOADING_STUDIO_TEXT).text();
            switch (BB.STUDIO_TYPE) {
                case BB.CONSTS.STUDIO_LITE:
                {
                    msg = msg + 'StudioLite...';
                    setTimeout(function () {
                        var credentials = 'user=' + self.m_businessModel.get('contactEmail') + ',pass=' + self.m_businessModel.get('newAccPassword');
                        credentials = $.base64.encode(credentials);
                        var url = 'https://galaxy.signage.me/_studiolite-dist/studiolite.html?param=' + credentials;
                        $(location).attr('href', url);
                    }, 2000);
                    break;
                }
                case BB.CONSTS.STUDIO_PRO:
                {
                    msg = msg + 'StudioPro...';
                    if (BB.APPS_SUPPORT == BB.CONSTS.OS_FLASH) {
                        // Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDeskNoFlash', {trigger: true});
                        Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDesk', {trigger: true});
                    } else {
                        Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDeskNoFlash', {trigger: true});
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