import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {TopicsComponent, TopicDetailComponent} from './learning_posts'
import reportWebVitals from './reportWebVitals';

const appEl = document.getElementById('root')
if (appEl) {
  ReactDOM.render(<App />, appEl);
}
const e = React.createElement
const topicEl = document.getElementById("Learning-Log")
if (topicEl) {
  ReactDOM.render(e(TopicsComponent, topicEl.dataset), topicEl);
}

const topicDetailElements = document.querySelectorAll(".learning_posts-detail")

topicDetailElements.forEach(container=> {
    ReactDOM.render(
      e(TopicDetailComponent, container.dataset),

      container);
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
