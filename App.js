/**
 App MediaSignage Inc (c) open source digital signage project.
 Visit Github for license and docs: http://git.digitalsignage.com
 @class App
 @constructor
 @return {Object} instantiated App
 **/
define(['underscore', 'jquery', 'backbone', 'bootstrap', 'backbone.controller', 'ComBroker', 'Lib', 'Pepper', 'Elements', 'bootbox', 'platform', 'flashdetect'], function (_, $, Backbone, Bootstrap, backbonecontroller, ComBroker, Lib, Pepper, Elements, bootbox, platform, flashdetect) {
    var App = Backbone.Controller.extend({

        // app init
        initialize: function () {

            window.BB = Backbone;
            BB.globs = {};
            BB.SERVICES = {};
            BB.EVENTS = {};
            BB.LOADING = {};
            BB.CONSTS = {};
            BB.FLASH = false;
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

            /*
            require(['localizer'], function () {
                var lang = "en";
                var opts = {language: lang, pathPrefix: "./_lang"};
                $("[data-localize]").localize("local", opts);
            });
            */

            // localization
            require(['LanguageSelectorView', 'Elements'], function (LanguageSelectorView, Elements) {
                new LanguageSelectorView({appendTo: Elements.LANGUAGE_SELECTION_LOGIN});
            });

            // router init
            require(['LayoutRouter'], function (LayoutRouter) {
                var LayoutRouter = new LayoutRouter();
                Backbone.history.start({root: '/msgetstarted/'});
                BB.comBroker.setService(BB.SERVICES['LAYOUT_ROUTER'], LayoutRouter);
                LayoutRouter.navigate('authenticate/_/_', {trigger: true});
            });
            if (!FlashDetect.installed || !FlashDetect.versionAtLeast(13))
                BB.FLASH = true;

            $('div.product-chooser').find('div.product-chooser-item').on('click', function(){
                $('div.product-chooser-item').removeClass('selected');
                $(this).addClass('selected');
                $(this).find('input[type="radio"]').prop("checked", true);

            });

        }
    });
    return App;
});