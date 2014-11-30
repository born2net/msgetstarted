/**
 @class SampleFactory
 @constructor
 @return {Object} instantiated SampleFactory
 **/
define(['jquery', 'backbone'], function ($, Backbone) {

    var SampleFactory = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.m_sampleSnippet = '<li class="sampleItem list-group-item">';
            self.m_sampleSnippet += '   <div class="col-xs-12 col-sm-3">';
            self.m_sampleSnippet += '       <img src="_assets/icon.png" class="sampleIcon img-responsive img-circle"/>';
            self.m_sampleSnippet += '   </div>';
            self.m_sampleSnippet += '   <div class="col-xs-12 col-sm-9">';
            self.m_sampleSnippet += '       <span class="name">International Pro Airport</span><br/>';
            self.m_sampleSnippet += '       <div class="samplePreview">';
            self.m_sampleSnippet += '           <span style="font-size: 2em; position: relative; top: 5px; left: -3px" class="fa fa-play-circle-o text-muted c-info" data-toggle="tooltip"></span>';
            self.m_sampleSnippet += '        <h4 style="display: inline; position: relative; left: -9px; color: #939393">preview</h4>';
            self.m_sampleSnippet += '    </div>';
            self.m_sampleSnippet += '</div>';
            self.m_sampleSnippet += '<div class="clearfix"></div>';
            self.m_sampleSnippet += '</li>';
            self._render();
            self._listenPreview();
            self._listenSelection();
        },

        _listenPreview: function () {
            var self = this;
            $('.samplePreview', self.el).on('click', function () {
                alert('aaa');
            });
        },

        _listenSelection: function () {
            var self = this;
        },

        _render: function () {
            var self = this;

            switch (self.options.studioType) {
                case BB.CONSTS.STUDIO_PRO:
                {
                    log('get Pro data from server');
                    break;
                }
                case BB.CONSTS.STUDIO_LITE:
                {
                    log('get Lite data from server');
                    break;
                }
            }

            // fake data
            var snippet = '';
            for (var i = 0; i < 10; i++) {
                snippet += self.m_sampleSnippet;
            }
            self.$el.append(snippet);
        }
    });

    return SampleFactory;

});

