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
        // this.close();
        new app.Views.Login();
    },

    signupRequest: function(e){
        var nextView = app.Global.nextView || 'search';
        e.preventDefault();
        var formData = this.getFormData('#'+e.target.id);
        this.model.signup(formData)
            .success(_.bind(function(e){


                // let's log in again and get token
                this.user = new app.Models.LoginModel();
                this.user.login({
                    username: formData.username,
                    password: formData.password1
                })
                .success(_.bind(function(resp){
                    // let's login and get token
                    this.auth = new app.Models.Authentication({
                        token: resp['token'],
                        expire: resp['expire']
                    });
                    Backbone.history.navigate(nextView, { trigger: true, replace: true});
                }, this))
                .error(function(){
                    Backbone.history.navigate('login', { trigger: true, replace: true});
                });

            }, this))
            .error(_.bind(app.Helpers.errorHandler, this));
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
