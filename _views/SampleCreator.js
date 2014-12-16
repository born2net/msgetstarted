/**
 @class SampleCreator
 @constructor
 @return {Object} instantiated SampleCreator
 **/
define(['jquery', 'backbone'], function ($, Backbone) {

    var SampleCreator = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;

            //self.m_sampleSnippet += '       <img src="_assets/icon.png" class="sampleIcon img-responsive img-circle"/>';

            self.m_sampleSnippet = '<li class="sampleItem list-group-item">';
            self.m_sampleSnippet += '   <div class="col-xs-12 col-sm-3">';
            self.m_sampleSnippet += '       <img src=":ICON:" class="sampleIcon img-responsive img-circle"/>';
            self.m_sampleSnippet += '   </div>';
            self.m_sampleSnippet += '   <div class="col-xs-12 col-sm-9">';
            self.m_sampleSnippet += '       <span class="name">:NAME:</span><br/>';
            self.m_sampleSnippet += '       <div class="samplePreview" name=":PREVIEW:">';
            self.m_sampleSnippet += '           <span style="font-size: 2em; position: relative; top: 5px; left: -3px" class="fa fa-play-circle-o text-muted c-info" data-toggle="tooltip"></span>';
            self.m_sampleSnippet += '           <h4 style="display: inline; position: relative; left: -9px; color: #939393">preview</h4>';
            self.m_sampleSnippet += '       </div>';
            self.m_sampleSnippet += '</div>';
            self.m_sampleSnippet += '<div class="clearfix"></div>';
            self.m_sampleSnippet += '</li>';
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
            $(Elements.CLASS_SAMPLE_PREVIEW, self.el).on('click', function () {
                var url = $(this).attr('name');
                window.open(url, '_blank');
                return false;
            });
        },

        _listenSelection: function () {
            var self = this;
            $(Elements.CLASS_SAMPLE_ITEM, self.el).on('click', function () {
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

            BB.Pepper.getSampleList(function (data) {
                for (var i in data['templates']) {
                    var sample = data['templates'][i];
                    var sampleType =sample.lite;
                    if (accountType != sampleType)
                        continue;
                    var name = data['templates'][i].name;
                    var preview = data['templates'][i].previewUrl;
                    var businessId = data['templates'][i].businessId;
                    var icon = 'http://galaxy.signage.me/Resources/Images/lite_html/' + businessId + '.png';
                    var sampleSnippet = self.m_sampleSnippet.replace(':ICON:',icon);
                    sampleSnippet = sampleSnippet.replace(':NAME:',name);
                    sampleSnippet = sampleSnippet.replace(':PREVIEW:',preview);
                    self.$('ul').append(sampleSnippet);
                }
            });

            setTimeout(function(){
                self._listenSelection();
                self._listenPreview();
            },400);

            // no flash support so remove preview capabilities
            if (BB.APPS_SUPPORT != BB.CONSTS.OS_FLASH)
                $(Elements.CLASS_SAMPLE_PREVIEW).hide();
        }
    });

    return SampleCreator;

});

