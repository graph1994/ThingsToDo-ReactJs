
var tasks = [];
var TodoList = React.createClass({
  remove: function(item) {
    return function(e) {
      e.preventDefault();
      return this.props.onRemove(item);
    }.bind(this);
  },
  render: function() {

    if (!this.props.items) {
         return null;
     }
     else{
       var tasks = this.props.items;
       console.log(tasks)
    return(
    <div className="text-center">
      <ul className="list-group">
          { tasks.map(function(item){
            //console.log(item)
            return <li  className="list-group-item">{item.Task} <input type="checkbox" defaultChecked={item.completed} />[<a href="#" onClick={this.remove(item.Task)}>x</a>]</li>
          }) }
      </ul>
      </div>
    );
  }
  }
});

var tasks = [
  {task:"False",completed:false},
  {task:"True",completed:true},
  {Task:"True",completed:true},
  {Task:"False",completed:false}
];
var tasks = data;
var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: tasks, task: '',completed:false};
  },
  handleDelete: function(itemToDelete, array) {
    console.log(itemToDelete)
    var index = array.indexOf(itemToDelete);
      array.splice(index, 1);

    this.replaceState({items: array});
  },
  handleChange: function(e) {
    this.setState({task: e.target.value});
  },
  remove: function(item){
   var items = this.state.items.filter(function(itm){
     return item.id !== itm.id;
   });

   this.setState({
     items: items
   });
 },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = {task:this.state.task,completed:false};
    var newTask = new TasksModel({ Task: this.state.task , completed: false });

    newTask.save();
  /*  newTask.fetch({
      success: function(response) {
                  data = response.toJSON();
                  tasks = data;
              }
    });*/
     data.push({ Task: this.state.task , completed: false });
    var tasks = data;
    console.log(data)
    var nextTask = '';
    this.setState({items:tasks,task:'' });
  },
  render: function() {
    return (
      <div className="well col-lg-4">
        <h3 className="text-center">Things to Do</h3>
        <TodoList items={this.state.items} onRemove={this.remove}/>
        <form className="text-center input-group" onSubmit={this.handleSubmit}>
          <input type="text" className="form-control" onChange={this.handleChange} value={this.state.task} />
          <span className="input-group-btn">
            <button className="btn btn-info">{'Add #' + (this.state.items.length + 1)}</button>
          </span>
        </form>
      </div>
    );
  }
});
React.render(<TodoApp />, document.getElementById('app'));
