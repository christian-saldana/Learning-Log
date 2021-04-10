import React from 'react'
import './styles.css'

export function Topic(props) {
    const {topic} = props
    const path = window.location.pathname
    const match = path.match(/(?<topicid>\d+)/ )
    const urlTopicId = match ? match.groups.topicid : -1
    const isDetail = `${topic.id}` === `${urlTopicId}`

    const handleLink = (event) => {
      event.preventDefault()
      window.location.href = `/${topic.id}`
    }
    return <div>
      <div>
        <p>Topic: {topic.id} - {topic.post_topic}</p>
        <p> Entries: </p>
        <ul>
          <li className='m-5'>
            <p>{topic.date_added} <br /> <br /> 
              {topic.entries}</p>
          </li>
        </ul>

      </div>
      {isDetail === true ? null : <button className='btn btn-outline-primary' onClick={handleLink}>View</button>}
    </div>
  }
