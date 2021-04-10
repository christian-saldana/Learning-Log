import React from 'react'
import './styles.css'

export function Topic(props) {
    const {topic} = props
    const className = props.className ? props.className : 'col-50'
    const path = window.location.pathname
    const match = path.match(/(?<topicid>\d+)/ )
    const urlTopicId = match ? match.groups.topicid : -1
    const isDetail = `${topic.id}` === `${urlTopicId}`

    const handleLink = (event) => {
      event.preventDefault()
      window.location.href = `/${topic.id}`
    }
    return <div className={className}>
      <div>
        <p>{topic.id} - {topic.post_topic}:</p>
        <p className='entry'>{topic.entries}</p>
      </div>
      {isDetail === true ? null : <button className='btn btn-outline-primary' onClick={handleLink}>View</button>}
    </div>
  }
