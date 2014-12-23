/**
 @class SampleCreator
 @constructor
 @return {Object} instantiated SampleCreator
 **/
define(['jquery', 'backbone', 'text!_templates/_templateSampleItem.html'], function ($, Backbone, templateSampleItem) {

    var SampleCreator = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.m_sampleTemplate = _.template(templateSampleItem);
            self._render();
            self._listenFilterList();
        },

        _listenFilterList: function () {
            var self = this;
            $(Elements.CLASS_FILTER_SAMPLE, self.el).on('keyup', function () {
                var rex = new RegExp($(this).val(), 'i');
                self.$('.sampleItem').hide();
                self.$('.sampleItem').filter(function () {
                    return rex.test($(this).text());
                }).show();
            });
        },

        _listenPreview: function () {
            var self = this;
            $(Elements.CLASS_SAMPLE_PREVIEW, self.el).off('click');
            $(Elements.CLASS_SAMPLE_PREVIEW, self.el).on('click', function () {
                var url = $(this).attr('name');
                window.open(url, '_blank');
                return false;
            });
        },

        _listenSelection: function () {
            var self = this;
            $(Elements.CLASS_SAMPLE_ITEM, self.el).off('click');
            $(Elements.CLASS_SAMPLE_ITEM, self.el).on('click',function () {
                var templateBusinessId = $(this).find(Elements.CLASS_SAMPLE_PREVIEW).attr('data-templateBusinessId');
                BB.comBroker.getService(BB.SERVICES.BUSINESS_MODEL).set('templateBusinessId',templateBusinessId);
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('createAcc', {trigger: true});
                return false;
            });
        },

        _render: function () {
            var self = this;
            var accountType;
            switch (self.options.studioType) {
                case BB.CONSTS.STUDIO_PRO:
                {
                    accountType = 0;
                    break;
                }
                case BB.CONSTS.STUDIO_LITE:
                {
                    accountType = 1;
                    break;
                }
            }

            var $ul = self.$('ul');
            var ul = $ul[0];
            BB.Pepper.getSampleList(function (data) {
                for (var i in data['templates']) {
                    var sample = data['templates'][i];
                    var sampleType =sample.lite;
                    if (accountType != sampleType)
                        continue;
                    var templateBusinessId = data['templates'][i].businessId;
                    var sampleItem = {
                        templateBusinessId: templateBusinessId,
                        name: data['templates'][i].name,
                        icon: 'http://galaxy.signage.me/Resources/Images/lite_html/' + templateBusinessId + '.png',
                        preview: data['templates'][i].previewUrl
                    };
                    $ul.append(self.m_sampleTemplate(sampleItem));
                }
            });

            // workaround as we can't force repaint in time for diff devices
            BB.lib.setIntervalTimes(function(){
                self._listenSelection();
                self._listenPreview();
            },400,10);

            // no flash support so remove preview capabilities
            if (BB.APPS_SUPPORT != BB.CONSTS.OS_FLASH)
                $(Elements.CLASS_SAMPLE_PREVIEW).hide();
        }
    });

    return SampleCreator;

});

