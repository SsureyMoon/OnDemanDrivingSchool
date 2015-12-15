app.Views.CreateInstructor = Backbone.View.extend({
    el: "#template-content",
    id: 'be-instructor-holder',
    formTemplate: 'be_instructor_form.html',
    profileTemplate: 'be_instructor_profile.html',
    events: {
        'submit form#be-instructor-form': 'beInstructorRequest',
        "change input[type=file]" : "encodeFile"
    },
    initialize: function(options){
        var _this = this;
        this.template = this.formTemplate;
        this.user = options.user
        this.user.fetch()
            .success(function(model, response){
            })
            .error(_.bind(app.Helpers.errorHandler, this));
        this.user.on('change', _.bind(this.render, this));
    },
    render: function(){
        var _this = this;

        var userJSON = this.user.toJSON();
        this.template = userJSON.is_instructor ? this.profileTemplate : this.formTemplate;

        app.Helpers.templateLoader(this.template, this.user.toJSON())
            .then(function(templateData){
                _this.$el.html(templateData);
            }, function(){
                console.log("failed");
            });
        return this
    },
    beInstructorRequest: function(e){
        e.preventDefault();
        var formData = this.getFormData('#'+e.target.id);
        this.model.attributes = _.extend(this.model.attributes, formData);
        this.model.register();
        return this;
    },
    getFormData: function(selector){
        var formData = {};
        $(selector).find('input').each(function(i, el){
            if($(el).attr('type') != 'file'){
                if( $( el ).val() != '' )
                {
                    formData[ el.id ] = $( el ).val();
                }
            }
        });
        return formData;
    },
    encodeFile: function(e) {
        var file = e.currentTarget.files[0];
        var reader = new FileReader();
        // closure to capture the file information.
        reader.onload = _.bind(function(fileEvent) {
            //set model
            var object = {};
            object[e.currentTarget.name] = fileEvent.target.result;
            this.model.set(object);
        }, this);

        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
    }

});
