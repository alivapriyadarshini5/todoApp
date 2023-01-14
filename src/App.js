import "./App.css";
import { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./Todo";
import db from "./Firebase";
import firebase from "firebase";
function App() {

  const [todos, setToodos] = useState([])
  const [input, setInput] = useState([''])


  // useEffect(() => {
  //   // //this code here .... fires when the App.js loads 
  //   // hc.collection(todos)
  //   // db.collection(todos)
  //   // console.log(todos);
  //   // return () => {
  //   //   cleanup
  //   // }
  // })

  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     const response = db.collection('todos');
  //     const data = await response.get();
  //     data.docs.forEach(item => {
  //       setToodos([...todos, item.data().todo])
  //       console.log(...todos)
  //     }, [])
  //   }
  //   fetchTodos();

  // })
  //When the app loads,We need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    db.collection("todos").orderBy('timestamp', 'desc').onSnapshot(querySnapshot => {
      setToodos(querySnapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })))
      // console.log(querySnapshot.docs.map(doc => doc.data().todo));

    });
  }, [])
  const addTodo = (event) => {
    //this will fire off when we click the button
    event.preventDefault();//it will prevent the page from refresh

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    // console.log("👽", "I am working");
    // setToodos([...todos, input])
    setInput('')  //clear up the input field after hitting addtodo buttton 
    console.log(todos)
  }

  return (
    <div className="App">
      <h1>Hello Aliva Priyadarshini 💓🌹 </h1>
      <form action="">
        {/* <input type="text" value={input} onChange={event => setInput(event.target.value)} /> */}

        <FormControl>
          <InputLabel> ✅ Write a Todo </InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />

        </FormControl>

        <Button variant="contained" color="primary" type="submit" onClick={addTodo} disabled={!input}>
          Add todo
        </Button>
        {/* <button type="submit" onClick={addTodo}>Add todo</button> */}
      </form>

      <ul>
        {todos.map(todo => {
          return (<Todo todo={todo} />)
        })}
      </ul>
    </div>
  );
}

export default App;