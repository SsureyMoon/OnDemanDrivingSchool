app.Views.createInstructor = Backbone.View.extend({
    el: "#template-content",
    id: 'be-instructor-holder',
    template: 'be_instructor.html',
    events: {
        'submit form#be-instructor-form': 'beInstructorRequest',
        "change input[type=file]" : "encodeFile"
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
    beInstructorRequest: function(e){
        e.preventDefault();
        var formData = this.getFormData('#'+e.target.id);
        this.model.attributes = _.extend(this.model.attributes, formData);
        console.log('formData');
        console.log(formData);
        console.log('this.model');
        console.log(this.model);
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
            console.log(object);
            this.model.set(object);
        }, this);

        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
    }

});
