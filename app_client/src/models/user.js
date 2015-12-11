var app = app || {};

app.Models.SignUpModel = Backbone.Model.extend({
    url: 'http://local-pm.app.dev/api/v1/users/',
    defaults: {
        username: '',
        email: '',
        password1: '',
        password2: '',
    },
    validation: {
        email: {
			pattern: 'email',
			required: true
		},
        username: {
			required: true
		},
        password1: {
			required: true
		},
        password2: {
			equalTo: 'password1',
			required: true
		}
    },
    signup: function(formData){
        this.set(formData);
        this.save()
            .success(function(e){
                // let's log in and get token
                console.log(this);
                console.log('success')
            })
            .error(function(e){
                console.log(e);
                console.log('fail')
            });
        return this;
    }
});

app.Models.LoginModel = Backbone.Model.extend({
    url: 'http://local-pm.app.dev/api/v1/token-auth/',
    defaults: {
        username: '',
        email: '',
        password: ''
    },
    validation: {
        username: {
            required: true
        },
        password: {
            required: true
        }
    },

    login: function(formData){
        var nextView = app.Global.nextView || "search";
        console.log("nextView");
        console.log(nextView);
        this.set(formData);
        this.save()
            .success(_.bind(function(resp){
                // let's login and get token
                this.saveToken();
                Backbone.history.navigate(nextView, { trigger: true, replace: true });
            }, this))
            .error(_.bind(app.Helpers.errorHandler, this));
    },

    saveToken: function(){
        var token = this.get('token');

        var expire = new Date(new Date().setSeconds(this.get('expire')));
        var cookieOpts = {
            domain:'local-pm.app.dev',
            path: '/',
            expires: expire
        };

        $.cookie('jwt_token', token, cookieOpts)

        app.Helpers.setTokenHeader();

    }
});

app.Models.User = Backbone.Model.extend({
    url: 'http://local-pm.app.dev/api/v1/users/me',
    defaults: {
        username: '',
        email: ''
    },
    toJSON: function(options) {
          return _.clone(this.attributes);
    }
});
