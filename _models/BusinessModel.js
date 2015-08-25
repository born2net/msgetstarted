/**
 @class BusinessModel
 @constructor
 @return {Object} instantiated BusinessModel
 **/
define(['jquery', 'backbone', 'backbone.stickit', 'bootbox'], function ($, Backbone, backbonestickit, bootbox) {

    var BusinessModel = Backbone.Model.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            BB.SERVICES.BUSINESS_MODEL = 'BUSINESS_MODEL';
            BB.comBroker.setService(BB.SERVICES.BUSINESS_MODEL, self);
        },

        defaults: {
            'businessId': -1,
            'businessName': '',
            'userName': '',
            'password': '',
            'templateBusinessId': '',
            'resellerId': 1,
            'firstName': '',
            'lastName': '',
            'contactEmail': '',
            'workPhone': '',
            'cellPhone': '',
            'address': '',
            'city': '',
            'state': '',
            'contry': '',
            'zipcode': '',
            'newAccPassword': '',
            'newAccPasswordConfirm': ''
        }
    });

    return BusinessModel;

});

