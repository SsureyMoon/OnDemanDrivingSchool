var app = app || {};

app.Views.Login = Backbone.View.extend({
    el: "#template-content",
    id: 'login-holder',
    template: 'login.html',
    events: {
        'submit form#login-form': 'loginRequest',
        'click form#login-form a.toggle-form': 'toggleSignup',
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
    toggleSignup: function(){
        new app.Views.Signup({model: new app.Models.SignUpModel()});
    },

    loginRequest: function(e){
        e.preventDefault();
        var formData = this.getFormData('#'+e.target.id);
        this.model.login(formData);
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

        return formData
    }
})
