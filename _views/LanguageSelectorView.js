/**
 Create the language selector widget
 @class LanguageSelectorView
 @constructor
 @return {Object} instantiated LanguageSelectorView
 **/
define(['jquery', 'backbone', 'simplestorage', 'bootbox', 'localizer', 'Elements'], function ($, Backbone, simplestorage, bootbox, localizer, Elements) {

    BB.SERVICES.LANGUAGE_SELECTOR = 'LANGUAGE_SELECTOR';

    var LanguageSelectorView = BB.View.extend({

        /**
         Init the ChannelList component and enable sortable channels UI via drag and drop operations.
         @method initialize
         **/
        initialize: function () {
            var self = this;
            BB.comBroker.setService(BB.SERVICES.LANGUAGE_SELECTOR, self);
            self.m_simpleStorage = simplestorage;

            // test, delete keys
            // self.m_simpleStorage.deleteKey('languageSelected');
            // self.m_simpleStorage.deleteKey('languageSelectedNative');

            self.$el = $(Elements.TEMPLATE_LANGUAGE_SELECTOR).clone();
            self.el = self.$el[0];
            $(self.options.appendTo).append(self.el).fadeIn();
            self.$el.show();
            var currID = self.$el.attr('id');
            self.$el.attr('id', _.uniqueId(currID));
            self._render();
            self._loadLang();
        },

        /**
         Render the DOM within instance view for language selection
         @method _render
         **/
        _render: function () {
            var self = this;
            $("dt a", self.$el).click(function () {
                $("dd ul", self.$el).toggle();
            });

            $("dd ul li a", self.$el).click(function () {
                var text = $(this).html();
                var native = $(text + ':firstChild')[1].data;
                $("dt a span", self.$el).html(text);
                $("dd ul", self.$el).hide();
                var language = self.$el.find("dt a span.value").html();
                self.setLanguage({
                    lang: language,
                    langNative: native
                });
            });
        },

        /**
         Load language
         @method _loadLang
         **/
        _loadLang: function () {
            var self = this;
            var lang = self.getLanguage();
            if (_.isUndefined(lang) || _.isUndefined(lang.lang) || _.isUndefined(lang.langNative))
                return;
            if (lang)
                self.setLanguage(lang);
        },

        /**
         Set specified language and reload the application to apply selection
         @method setLanguage
         @param {Object} language code and native lang
         **/
        setLanguage: function (i_language) {
            var self = this;
            var language = self._cleanTags(i_language.lang);
            self.m_simpleStorage.set('languageSelected', language);
            self.m_simpleStorage.set('languageSelectedNative', i_language.langNative);
            var opts = {language: language, pathPrefix: "./_lang"};
            $("[data-localize]").localize("local", opts);

            //require(['localizer'], function () {
            //    var lang = 'en'; // iw
            //    var opts = {language: lang, pathPrefix: "./_lang"};
            //    $("[data-localize]").localize("local", opts);
            //});
        },

        /**
         Clean up non compliant language characters
         @method _cleanTags
         @param {String} i_language
         @return {String} language code
         **/
        _cleanTags: function (i_language) {
            if (_.isUndefined(i_language))
                return 'en';
            // workaround for IE 10
            try {
                i_language = i_language.replace(/<font>/gi, '');
                i_language = i_language.replace(/<\/font>/gi, '');
                if (i_language == 'in')
                    return 'en';
                return i_language;
            } catch (e) {
                return 'en';
            }
        },

        /**
         Get the currently selected language
         @method getLanguage
         @return {Object} return 2 letter language selection
         **/
        getLanguage: function () {
            var self = this;
            var lang = self.m_simpleStorage.get('languageSelected');
            var langNative = self.m_simpleStorage.get('languageSelectedNative');
            if (_.isUndefined(langNative) || langNative == 'English')
                langNative = 'en_US';
            return {
                lang: self._cleanTags(lang),
                langNative: langNative
            };
        }
    });

    return LanguageSelectorView;

});
