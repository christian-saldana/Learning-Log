import React, {useState} from 'react'

import {TopicsList} from './topics'
import {TopicCreate} from './topicCreate'


export function TopicsComponent(props) {
    const [newTopics, setNewTopics] = useState([])
    const canCreate = props.canCreate === "false" ? false : true
    const handleNewTopic = (newTopic) => {
      let tempNewTopics = [...newTopics]
      tempNewTopics.unshift(newTopic)
      setNewTopics(tempNewTopics)
    }

    return <div className={props.className}>
            {canCreate === true && <TopicCreate didTopic={handleNewTopic} className='col-12 mb-3' />}
          <TopicsList newTopics={newTopics} {...props}/>
    </div>
}