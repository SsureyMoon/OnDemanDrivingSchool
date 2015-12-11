var app = app || {};

app.Views.Signup = Backbone.View.extend({
    el: "#template-content",
    id: 'login-holder',
    template: 'signup.html',
    events: {
        'submit form#signup-form': 'signupRequest',
        'click form#signup-form a.toggle-form': 'toggleLogin',
    },
    initialize: function(){
        this.render();
    },
    render: function(){
        var _this = this;

        app.Helpers.templateLoader(this.template).then(function(templateData){
            _this.$el.html(templateData);
        }, function(){
            console.log("failed");
        });
        return this
    },

    toggleLogin: function(){
        new app.Views.Login();
    },

    signupRequest: function(e){
        e.preventDefault();
        var formData = this.getFormData('#'+e.target.id);
        this.model.signup(formData);
        return this;
    },

    getFormData: function(selector){
        var formData = {};
        $(selector).find('input').each(function(i, el){
            if( $( el ).val() != '' )
            {
                formData[ el.id ] = $( el ).val();
            }
        });

        return formData;
    }
})
