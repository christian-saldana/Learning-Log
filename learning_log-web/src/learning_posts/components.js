import React, {useState, useEffect} from 'react'

import {TopicsList} from './topics'
import {TopicCreate, EntryCreate} from './topicCreate'
import {Topic, Entry} from './detail'
import {apiDetailList} from './lookup'


export function TopicsComponent(props) {
    console.log(props)
    const [newTopics, setNewTopics] = useState([])
    const canTopic = props.canTopic === "false" ? false : true
    const handleNewTopic = (newTopic) => {
      let tempNewTopics = [...newTopics]
      tempNewTopics.unshift(newTopic)
      setNewTopics(tempNewTopics)
    }

    return <div className={props.className}>
            {canTopic === true && <TopicCreate didTopic={handleNewTopic} className='col-12 mb-3' />}
          <TopicsList newTopics={newTopics} {...props}/>
    </div>
}

export function TopicDetailComponent(props) {
  console.log(props)
  const { topicId } = props;
  const [didLookup, setDidLookup] = useState(false);
  const [topic, setTopic] = useState(null);

  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      setTopic(response);
    } else {
      alert("There was an error finding your topic.");
    }
  };
  useEffect(() => {
    if (didLookup === false) {
      apiDetailList(topicId, handleBackendLookup);
      setDidLookup(true);
    }
  }, [topicId, didLookup, setDidLookup]);
    return <div>
              {topic === null ? null : <Topic topic={topic} className={props.className}/> }
              {<TopicCreate />}
              {<EntryCreate />}
              {topic === null ? null : <Entry topic={topic}/>}
            </div>

}

            
