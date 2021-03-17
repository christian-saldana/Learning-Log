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
  xhr.onerror = function (e) {
    console.log(e)
    callback({"message": "The request was an error"}, 400)
  }
  xhr.send()
}

function Topic(props) {
  const {topic} = props
  const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
  return <div className={className}>
    <p>{topic.id} - {topic.text}</p>
  </div>
}

function App() {
  const [learning_posts, setLearning_posts] = useState([])

  useEffect(() => {
    const myCallback = (response, status) => {
      console.log(response, status)
      if (status === 200){
        setLearning_posts(response)
      } else {
        alert("There was an eror")
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
        <div>
          {learning_posts.map((item, index)=>{
            return <Topic topic={item} className='my-5 py-5 border bg-white text-dark' key={`${index}-{item.id}`}/>
          })}
        </div>
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
