import React from 'react';
import { BrowserRouter as
  Router, 
  Route, 
  Redirect,
} from 'react-router-dom';
import './App.css';
import TodoApp from './TodoApp.js'
import LogIn from './Components/LogIn.js'
// import AddTodo from '../src/Components/AddTodo.js'

const userLoggedIn = () => JSON.parse(localStorage.getItem('user'));

  function App() {

    return (
    <div className="App">
      <header className="App-header">
          TODOS FOR THIS LAB
          {/* <LogIn /> */}
          
         
      </header>
          
        <Router> 
            <Route exact path="/" render= {() =>
            userLoggedIn() 
            ? <TodoApp /> 
            : <Redirect to='/login' />
            } />
            <Route exact path="/login" component={LogIn}/>
            
        </Router>
    </div>
         
    );
  }

export default App;
