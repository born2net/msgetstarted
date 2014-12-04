/**
 App MediaSignage Inc (c) open source digital signage project.
 Visit Github for license and docs: http://git.digitalsignage.com
 @class App
 @constructor
 @return {Object} instantiated App
 **/
define(['underscore', 'jquery', 'backbone', 'bootstrap', 'backbone.controller', 'ComBroker', 'Lib', 'Pepper', 'Elements', 'bootbox', 'platform', 'flashdetect', 'placeholder'], function (_, $, Backbone, Bootstrap, backbonecontroller, ComBroker, Lib, Pepper, Elements, bootbox, platform, flashdetect, placeholder) {
    var App = Backbone.Controller.extend({

        // app init
        initialize: function () {

            window.BB = Backbone;
            BB.globs = {};
            BB.SERVICES = {};
            BB.EVENTS = {};
            BB.LOADING = {};
            BB.CONSTS = {};

            BB.CONSTS.OS_UNKNOWN = 0;
            BB.CONSTS.OS_FLASH = 1;
            BB.CONSTS.OS_DESK_NO_FLASH = 2;
            BB.CONSTS.OS_MOBILE = 3;
            BB.APPS_SUPPORT = BB.CONSTS.OS_UNKNOWN;

            BB.globs['UNIQUE_COUNTER'] = 0;
            BB.globs['RC4KEY'] = '226a3a42f34ddd778ed2c3ba56644315';
            BB.lib = new Lib();
            BB.Pepper = new Pepper();
            _.extend(BB.Pepper, BB.comBroker);
            BB.lib.addBackboneViewOptions();
            BB.comBroker = new ComBroker();
            BB.comBroker.name = 'AppBroker';
            window.log = BB.lib.log;
            window.pepper = BB.Pepper;

            // define applications

            BB.CONSTS.MAILWASP = 'mailWasp';
            BB.CONSTS.EVERNODES = 'everNodes';


            require(['localizer'], function () {
                var lang = "en";
                var opts = {language: lang, pathPrefix: "./_lang"};
                $("[data-localize]").localize("local", opts);
            });

            // localization
            //require(['LanguageSelectorView', 'Elements'], function (LanguageSelectorView, Elements) {
            //    new LanguageSelectorView({appendTo: Elements.LANGUAGE_SELECTION_LOGIN});
            //});

            // router init
            require(['LayoutRouter'], function (LayoutRouter) {
                var LayoutRouter = new LayoutRouter();
                Backbone.history.start({root: '/msgetstarted/'});
                BB.comBroker.setService(BB.SERVICES['LAYOUT_ROUTER'], LayoutRouter);
                // LayoutRouter.navigate('authenticate/_/_', {trigger: true});
            });

            // alert('name: ' + platform.name + ' version: ' + platform.version + ' product: ' + platform.product + ' os: ' + platform.os);

            if (FlashDetect.installed || FlashDetect.versionAtLeast(13)) {
                BB.APPS_SUPPORT = BB.CONSTS.OS_FLASH;
            } else {
                var os = BB.lib.getOS();
                if (os == 'windows' || os == 'osx') {
                    BB.APPS_SUPPORT = BB.CONSTS.OS_DESK_NO_FLASH;
                } else {
                    BB.APPS_SUPPORT = BB.CONSTS.OS_MOBILE;
                }
            }

            $('#myCarousel').carousel({
                interval: false
            });

            var clickEvent = false;
            $('#myCarousel').on('click', '.nav a', function () {
                clickEvent = true;
                $('.nav li').removeClass('active');
                $(this).parent().addClass('active');
            }).on('slid.bs.carousel', function (e) {
                if (!clickEvent) {
                    var count = $('.nav').children().length - 1;
                    var current = $('.nav li.active');
                    current.removeClass('active').next().addClass('active');
                    var id = parseInt(current.data('slide-to'));
                    if (count == id) {
                        $('.nav li').first().addClass('active');
                    }
                }
                clickEvent = false;
            });


        }
    });
    return App;
});