import React, {useEffect, useState} from 'react'

import {TopicsList} from './topics'
import {Topic} from './detail'
import {apiDetailList} from './lookup'
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

export function TopicDetailComponent(props){
  const {topicId} = props
  const [didLookup, setDidLookup] = useState(false)
  const [topic, setTopic] = useState(null)
  
  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      setTopic(response)
    } else {
      alert("There was an error finding your tweet.")
    }
  }
  useEffect(()=>{
    if (didLookup === false){
      apiDetailList(topicId, handleBackendLookup)
      setDidLookup(true)
    }
  }, [topicId, didLookup, setDidLookup])

  return topic === null ? null : <Topic topic={topic} className={props.className} />
}