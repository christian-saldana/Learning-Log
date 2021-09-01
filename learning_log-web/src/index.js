import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {TopicsComponent, TopicDetailComponent} from './learning_posts'

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