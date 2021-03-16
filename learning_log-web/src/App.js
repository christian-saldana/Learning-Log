import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function loadPosts(callback) {
  const xhr = new XMLHttpRequest() 
  const method = "GET" // "POST"
  const url = "http://127.0.0.1:8000/api/topics"
  const responseType = "json"
  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function() {
    callback(xhr.response, xhr.status)
  }
  xhr.send()
}

function App() {
  const [learning_posts, setLearning_posts] = useState([])

  useEffect(() => {
    const myCallback = (response, status) => {
      if (status === 200){
        setLearning_posts(response)
      }
    }
    loadPosts(myCallback)
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {learning_posts.map((topic, index)=>{
            return <li>{topic.text}</li>
          })}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
