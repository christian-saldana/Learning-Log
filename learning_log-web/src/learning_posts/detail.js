import React, {useState, useEffect} from 'react'
import {apiDetailList} from './lookup'

export function Topic(props) {
    const {topic} = props
    const path = window.location.pathname
    const match = path.match(/(?<topicid>\d+)/ )
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    const urlTopicId = match ? match.groups.topicid : -1
    const isDetail = `${topic.id}` === `${urlTopicId}`

    const handleLink = (event) => {
      event.preventDefault()
      window.location.href = `/${topic.id}`
    }
    return <div className={className}>
      <div>
        <p>{topic.id} - {topic.post_topic}</p>       

      </div>
      {isDetail === true ? null : <button className='btn btn-outline-primary' onClick={handleLink}>View</button>}
    </div>
  }


export function EntriesList(props) {
  console.log(props)
  console.log(props.post_entry)
  const path = window.location.pathname
  const match = path.match(/(?<topicid>\d+)/ )
  const urlTopicId = match ? match.groups.topicid : -1
  const [entriesInit, setEntriesInit] = useState([])
  const [entriesDidSet, setEntriesDidSet] = useState(false)
  console.log(entriesInit)
  console.log(props.newEntries)
  console.log(props.newEntries)

  useEffect(() => {
    if (entriesDidSet === false){
      const myCallback = (response, status) => {
        if (status === 200){
          setEntriesInit(response)
          setEntriesDidSet(true)
        } else {
          alert("There was an error")
        }
      }
      apiDetailList(urlTopicId, myCallback)
    }
  }, [entriesInit, entriesDidSet, setEntriesDidSet, urlTopicId])



      const listItems = props.post_entry.map((post) =>
    <li key={post.toString()}>
      {post}
    </li>
  );

  

  return (
    <ul>
      {props.newEntries.post_entry}
      {listItems}
    </ul>
  )
    
  }

