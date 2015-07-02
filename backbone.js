
var TasksModel = Backbone.Model.extend({
  urlRoot: '/tasks'
});
var TasksCollection = Backbone.Collection.extend({
  model: TasksModel,
  url: '/tasks'

});
var data = [];
var tasksFetch = new TasksCollection();
tasksFetch.toJSON();
tasksFetch.fetch({
  success: function(response) {
              data = response.toJSON();



          }
});


/*
var brandNewBook = new BookModel({ title: '1984', author: 'George Orwel' });
brandNewBook.save();
*/

/* var newTask = new TasksModel({ Task: '1984', completed: false });
newTask.save({}, {
    success: function(model, response) {
        console.log('SUCCESS:');
        console.log(response);
    },
    error: function(model, response) {
        console.log('FAIL:');
        console.log(response);
    }
}); */
