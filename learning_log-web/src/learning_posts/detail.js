import React from 'react'

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

  export function Entry(props) {
    const {topic} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return <div className={className}>
      <div>
        <ul className='m-5'>
          <li>
            <p> {topic.date_added} <br /> <br />
                {topic.entries} {topic.entries.id}
            </p>
          </li>
        </ul>
               

      </div>
    </div>
  }
