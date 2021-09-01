import React, {useState, useEffect} from 'react'
import {TopicsList} from './topics'
import {TopicCreate, EntryCreate} from './topicCreate'
import {Topic, EntriesList} from './detail'
import {apiDetailList} from './lookup'



export function TopicsComponent(props) {
    const [newTopics, setNewTopics] = useState([])
    const canTopic = props.canTopic === "false" ? false : true
    
    const handleNewTopic = (newTopic) => {
      let tempNewTopics = [...newTopics]
      tempNewTopics.unshift(newTopic)
      setNewTopics(tempNewTopics)
    }

    return <div className='mx-5 w-50 mx-auto'>
            {canTopic === true && <TopicCreate didTopic={handleNewTopic} />}
            <TopicsList newTopics={newTopics} {...props}/>
          </div>
}

export function TopicDetailComponent(props) {
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
  

  const [newEntries, setNewEntries] = useState([])
  const canEntry = topicId.canEntry === "false" ? false : true
  const handleNewEntry = (newEntry) => {
    let tempNewEntries = [...newEntries]
    tempNewEntries.unshift(newEntry)
    setNewEntries(tempNewEntries)
    }
    return <div className='mx-5 w-50 mx-auto'>
              {topic === null ? null :<Topic topic={topic} /> }
              {canEntry === true && <EntryCreate  didEntry={handleNewEntry} className='col-12 mb-3 mt-5' />}
              <p className = 'fs-2'>Entries: </p> <br/>
              {topic === null ? null : <EntriesList newEntries={newEntries} {...topic}/>}
            </div>
}

            
