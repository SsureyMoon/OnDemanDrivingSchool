var app = app || {};

app.Views.Profile = Backbone.View.extend({
    el: "#template-content",
    id: 'profile-holder',
    template: 'profile.html',
    events: {
        'submit form#profile-form': 'profileChangeRequest',
    },
    initialize: function(){
        this.model.on('change', _.bind(this.render, this));
        this.model.fetch()
            .success(function(){})
            .error(_.bind(app.Helpers.errorHandler, this));
    },
    render: function(){
        var _this = this;

        app.Helpers.templateLoader(this.template, this.model.toJSON()).then(function(templateData){
            _this.$el.html(templateData);
        }, function(){
            console.log("failed");
        });
        return this
    }
});
