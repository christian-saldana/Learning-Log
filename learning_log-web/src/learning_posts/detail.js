import React from 'react'

// import {apiTopicCreate, apiTopicsList} from './lookup'

export function Topic(props) {
    const {topic} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return <div className={className}>
      <p>{topic.id} - {topic.text}</p>
    </div>
  }