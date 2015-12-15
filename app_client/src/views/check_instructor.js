var app = app || {};

app.Views.CheckInstructor = Backbone.View.extend({
    el: "#template-content",
    id: 'check-instructor-holder',
    template: 'check_instructor.html',
    events: {

    },
    initialize: function(){
        this.render();
        // this.collection.on('add', _.bind(this.render, this));
    },
    render: function(){
        var _this = this;
        app.Helpers.templateLoader(this.template, {})
            .then(function(templateData){
                _this.$el.html(templateData);
            }, function(){
                console.log("failed");
            });
        return this
    }
});
