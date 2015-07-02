var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

var Task = mongoose.model('Task', {
  Task: String,
  completed: Boolean
});
mongoose.connect('mongodb://localhost/ToDO');
app.use(bodyParser.json());
app.use(express.static('./'));

//Create Task MongoDB
app.post('/tasks',function(req,res){
  var newTask = new Task(req.body);
  newTask.save(function(err,task){
    if (err) {
      res.status(500).json(err);
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.json(task);
    }
  })
}
)
//Get all Tasks from MongoDB
app.get('/tasks',function(req,res){
  Task.find({},function(err,results){
    if (err) {
      res.status(500).json(err);
    } else {
      res.header("Access-Control-Allow-Origin", "*");

      res.json(results);

    }
  });
});
app.put('/tasks/:id',function(req,res){

  Task.findByIdAndUpdate(req.params.id,req.body,
    {new:true},
    function(err,results){

    if (err) {
      res.status(500).json(err);
    } else {
      //console.log(results)
      res.header("Access-Control-Allow-Origin", "*");

      res.json(results);

    }
  });
});

app.delete('/tasks/:id',function(req,res){

  Task.remove({_id:req.params.id},function(err,results){
      console.log('test')
    if (err) {
      res.status(500).json(err);
    } else {
      //console.log(results)
      res.header("Access-Control-Allow-Origin", "*");

      res.json(results);

    }
  });
});
var server   = require('http').Server(app);
server.listen(3000);
