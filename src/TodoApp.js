import React, { Component } from 'react'
import AddTodo from './Components/AddTodo.js';
import request from 'superagent';
import './App.css';
// import { getTodos } from './getTodos.js';



export default class TodoApp extends Component {
    // initial state as an empty array
    state = { todos: [] }

    //get user data from local storage
    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));

        // const todos = await request.get(`http://localhost:${process.env.REACT_APP_BACK_END_PORT}/api/todos`)
        //     .set('Authorization', user.token);
        const todos = await request.get('https://infinite-caverns-73784.herokuapp.com/api/todos').set('Authorization', user.token);

        this.setState({ todos : todos.body})
    }
    // creating optimistic rendering
    handleClick = async () => {
        const newTodo = {
            id: Math.random(),
            task: this.state.todoInput,
            complete: false,
        };

        const user = JSON.parse(localStorage.getItem('user'));
        
        // spread operator
        const newTodos = [...this.state.todos, newTodo];
        
        this.setState({ todos: newTodos });
        // updating the database with the user todo input
        // const data = await request.post(`http://localhost:${process.env.REACT_APP_BACK_END_PORT}/api/todos`, {
        //     task: this.state.todoInput
        // })
        //     .set('Authorization', user.token);
        const data = await request.post('https://infinite-caverns-73784.herokuapp.com/api/todos', { task: this.state.todoInput }).set('Authorization', user.token);
    }
        
    handleInput = (e) => { this.setState({ todoInput: e.target.value }) 
    };
      
    
    render() {
        if (localStorage.getItem('user')) {
        return (
            <div className="container">
                <h3>Hello {JSON.parse(localStorage.getItem('user')).email}</h3>
                <AddTodo
                    todoInput={this.state.todoInput}
                    handleClick={this.handleClick}
                    handleInput={this.handleInput} />
                    
                    {this.state.todos.map((todo, index) => <p className="todos"
                        style={{ textDecoration: todo.complete ? 'line-through' : 'none'}}

                            onClick={async () => {
                                // lets mutate! make a copy of the array in state
                                const newTodos = this.state.todos.slice();

                                // go find whichever todo we're talking about here
                                const matchingTodo = newTodos.find((thisTodo) => todo.id === thisTodo.id);

                                matchingTodo.complete = !todo.complete
                                const user = JSON.parse(localStorage.getItem('user'));
                                this.setState({ todos: newTodos });
                                
                                //updating the database actually
                                // const data = await request.put(`http://localhost:${process.env.REACT_APP_BACK_END_PORT}/api/todos/${todo.id}`, matchingTodo)
                                // .set('Authorization', user.token);
                                const data = await request.put(`https://infinite-caverns-73784.herokuapp.com/${todo.id}`, matchingTodo);
                                
                                const deleteTodos = async () => {
                                    return this.state.todos.splice(index, 1);
                                };

                            }} key={todo.id}> {todo.task}
                        <button className="delete" onClick={async () => {
                                
                            await request.delete(`https://infinite-caverns-73784.herokuapp.com/${todo.id}`)

                            const deletedTodos = this.state.todos.slice();
                            deletedTodos.splice(index, 1);

                            this.setState({ todos: deletedTodos });
                        }}>
                            <span>Delete a Todo</span> </button>
                    </p>)
                }
            </div>
        )
    }
}}




//getting list of todos from database.
// async componentDidMount() {
    //     const data = await getTodos();
    //     this.setState({ todos: data.body })
    // }
    
    // getting the list of todos from the database
    // componentDidMount = async () => {
        //     const todos = await request.get('https://infinite-caverns-73784.herokuapp.com/api/todos')
        //     this.setState({ todos: todos.body })
    // }


////////////////////////////////////////////////////Source Code /////////////////////////////// incomplete


// import React, { Component } from 'react';
// import request from 'superagent';
// import AddTodo from './AddTodo';

// export default class TodoApp extends Component {
//     state = { todos: [] }
//     componentDidMount = async() => {
//         const todos = await request.get('http:localhost:3000/api/todos')
        
//         this.setState({ todos: todos.body })
//     }

//     handleClick = async () => {
//         const newTodo = {
//             id: Math.random(),
//             task: this.state.todoInput,
//             complete: false
//         };

//         const newTodos = [...this.state.todos, newTodo];
        
//         this.setState({ todos: newTodos });
        
//         const data = await request.post('http:localhost:3000/api/todos', {
//             task: this.state.todoInput
//         });
//     }

//     handleInput = (e) => { this.setState({ todoInput: e.target.value })};

//     render() {
//         return (
//                 <div>
//                     <AddTodo />
//                 </div>
    
//         )
//     }
// }
