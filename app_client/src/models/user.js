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
        return this.save();
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
        this.set(formData);
        return this.save();
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
