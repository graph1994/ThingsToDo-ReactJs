
var tasks = [];
var TodoList = React.createClass({
  handleClick: function(index) {
    //console.log(this)
    var self = this;
    var deleteTask = new TasksModel({_id:self.props.items[index]._id});
    self.props.items.splice(index,1);
    var items = self.props.items

    console.log(index);

    console.log(deleteTask);
    deleteTask.destroy({
      success: function() {
        console.log("worked");
      }
    });
    //  .splice(index,1);


    this.setState({items: items}, function() {
      if (items.length === 1) {
        this.refs.item0.animate();
      }
    }.bind(this));
  },
  handleTaskUpdate: function(index){
      var items = this.props.items
      console.log(items)
      console.log(items[index])
      items[index] = null;
      //items[index] =
      var updateTask = new TasksModel(items[index]);
      updateTask.save();

    this.setState({items: items}, function() {
      if (items.length === 1) {
        //this.refs.item0.animate();
      }
    }.bind(this));
  },
  handleCheck: function(index){
      var items = this.props.items
      console.log(items)
      console.log(items[index])
      items[index].completed = true;
      //items[index] =
      var updateTask = new TasksModel(items[index]);
      updateTask.save();

    this.setState({items: items}, function() {
      if (items.length === 1) {
        //this.refs.item0.animate();
      }
    }.bind(this));

  },
  render: function() {

    if (!this.props.items) {
         return null;
     }
     else{
       var tasks = this.props.items;
      // console.log(tasks)
    //  console.log(this)
      var test = this
    return(

    <div className="text-center">
      <ul className="list-group">
          { tasks.map(function(item,i){
            var boundClick = test.handleClick.bind(test,i);
            var boundUpdate = test.handleCheck.bind(test,i);
          //  console.log(this)
            return (<Task onClick={boundClick}  handleCheck ={boundUpdate}key={i} item={item} ref={'item' + i} />)
          }.bind(this)) }
      </ul>
      </div>
    );
  }
  }
});
var Task = React.createClass({

  render: function() {
  //  console.log(this.props)
    var item = this.props.item;
    return <li  className="list-group-item"> <input type="checkbox" defaultChecked={item.completed} onClick={this.props.handleCheck}/> <label className="task">{item.Task}</label>  <button className="btn btn-danger" onClick={this.props.onClick}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button></li>
  }
})

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
        <TodoList items={this.state.items} />
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
