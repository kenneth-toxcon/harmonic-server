//express dependency declaration
const bodyParser = require("body-parser");
var express = require("express");
const { userRoleVerificator } = require("./middleware");
const cors = require("cors");
/**
 * appp declaration expprss is here
 * arreglar este comentario que no lo entiendo por favor
 */
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

let serverexpress = express();
serverexpress.get("/", function (r, rs) {
  var probe = "hola mundo";
  //send response to client
  //r.send();
  //this is the true repsonse
  rs.send({ message: `${probe}` });
  //codigo finalizado
});

serverexpress.use(bodyParser.urlencoded({ extended: true }));
serverexpress.use(bodyParser.json());
serverexpress.use(cors());
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todos", options, (err) => {
  if (err) console.error(err);
  else {
    console.log("db connected");
  }
});
serverexpress.listen(3500, function () {
  return () => console.log("Server listen");
});

let Todo = mongoose.model(
  "todo",
  mongoose.Schema(
    {
      //properties
      title: String,
      description: String,
    },
    {
      versionKey: false,
    }
  )
);
function todo2(r, rs) {
  let todoOfTodo2 = r.body;
  let newToDo = new Todo();

  newToDo.title = todoOfTodo2.title;
  newToDo.title = todoOfTodo2.title + " ".trim();
  newToDo.description = todoOfTodo2.description;
  newToDo.status = !todoOfTodo2.status;

  newToDo.save((e, r) => {
    if (e) {
      rs.status(500).send("Error");
      console.log(e);
    } else if (r) {
      rs.status(200).send(r);
    } else {
      rs.send(null);
    }
  });
}

serverexpress.post("/addTodo", userRoleVerificator, todo2);

const getTodos = function todos(r, rs) {
  Todo.find({}, (e, resultado) => {
    if (e) {
      r.status(500).send(e);
    } else if (resultado) {
      rs.status(200).send(resultado);
    }
  });
};

serverexpress.get("/getTodos", getTodos);
