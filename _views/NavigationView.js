/**
 File menu / Top navigation control
 @class NavigationView
 @constructor
 @return {Object} instantiated FileMenu
 **/
define(['jquery', 'backbone', 'bootbox', 'Elements'], function ($, Backbone, bootbox, Elements) {

    BB.SERVICES.NAVIGATION_VIEW = 'NavigationView';

    var NavigationView = BB.View.extend({

        /**
         Constructor
         @method initialize all listeners on all navigation UI buttons
         **/
        initialize: function () {
            var self = this;
            BB.comBroker.setService(BB.SERVICES.NAVIGATION_VIEW, self);
            self._render();
            self._listenToiFrameEvents();

            $(Elements.LIVE_CHAT).on('click', function () {
                var pop = window.open(BB.globs['CHAT'], '_blank');
                self._closeMobileNavigation();
            });


            $(Elements.DOWNLOAD_SIGNAGE_PLAYER).on('click', function (e) {
                e.preventDefault();
                //var pop = window.open('http://start.digitalsignage.com', '_blank');
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('directDownload', {trigger: true});
                return false;
            });

            $(Elements.LANGUAGE_PROMPT).on('click', function () {
                require(['LanguageSelectorView'], function (LanguageSelectorView) {
                    var uniqueID = _.uniqueId('languagePrompt')
                    var modal = bootbox.dialog({
                        message: '<div id="' + uniqueID + '"></div>',
                        title: $(Elements.MSG_BOOTBOX_COSTUME_TITLE).text(),
                        show: false,
                        buttons: {
                            success: {
                                label: '<i style="font-size: 1em" class="fa fa-forward "></i>',
                                className: "btn-success",
                                callback: function () {
                                    $('#' + uniqueID).empty();
                                }
                            }
                        }
                    });
                    modal.modal("show");
                    new LanguageSelectorView({appendTo: '#' + uniqueID});
                });
            });
        },

        _closeMobileNavigation: function () {
            if ($('.navbar-header .navbar-toggle').css('display') != 'none') {
                $(".navbar-header .navbar-toggle").trigger("click");
            }
        },

        /**
         Action on application resize
         @method _onAppResized
         @param {Event} e
         **/
        _onAppResized: function (e) {
            var self = this;
            self._toggleIcons(e.edata.width)
        },

        /**
         Toggle visibility of navigation icons depending on app total width
         @method _toggleIcons
         @param {Number} i_size
         **/
        _toggleIcons: function (i_size) {
            if (i_size > 1500) {
                $(Elements.CLASS_NAV_ICONS).show();
            } else {
                $(Elements.CLASS_NAV_ICONS).hide();
            }
        },

        _render: function () {
            $('.navbar-nav').css({
                display: 'block'
            })
        },

        _listenToiFrameEvents: function () {
            var self = this;
            var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
            var eventer = window[eventMethod];
            var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
            eventer(messageEvent, function (e) {
                switch (e.data.command) {
                    case 'setTitle':
                    {
                        parent.document.title = e.data.param;
                        break;
                    }
                    case 'logout':
                    {
                        self.logUserOut();
                        break;
                    }
                }
            }, false);
        },

        logUserOut: function () {
            var self = this;
            var appEntryFaderView = BB.comBroker.getService(BB.SERVICES['APP_ENTRY_FADER_VIEW']);
            appEntryFaderView.selectView(Elements.APP_LOGOUT);
            BB.comBroker.getService(BB.SERVICES['APP_AUTH']).logout();
        },

        enableLogout: function () {
            var self = this;
            $(Elements.LOGOUT_HEADER).fadeIn();
            $(Elements.LOGOUT).on('click', function () {
                self.logUserOut();
            });
        }
    });

    return NavigationView;
});
