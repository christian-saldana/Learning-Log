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

  export function Entry(props) {
    const {entry} = props
    const [entriesInit, setEntriesInit] = useState([])
    const [entries, setEntries] = useState([])
    const [entriesDidSet, setEntriesDidSet] = useState(false)
    useEffect(() =>{
      const final = [...entry.newEntries].concat(entriesInit)
      if (final.length !== entries.length) {
          setEntries(final)
      }
    }, [entry.newEntries, entries, entriesInit])

    useEffect(() => {
      if (entriesDidSet === false) {
        const handleEntriesListLookup = (response, status) => {
          if (status === 200){
            setEntriesInit(response.results)
            setEntriesDidSet(true)
          } else {
            alert("There was an error")
          }
        }
        apiDetailList(entry, handleEntriesListLookup)
      }
    }, [entriesInit, entriesDidSet, setEntriesDidSet, entry])

    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return <React.Fragment>{entries.map((item, index)=>{
      return <Topic 
      topic={item} 
      className='my-5 py-5 border bg-white text-dark' 
      key={`${index}-{item.id}`}/>
    })}
    <div className={className}>
      <div>
        <ul className='m-5'>
          <li>
            <p> {entry.date_added} <br /> <br />
                {entry.entries} 
            </p>
          </li>
        </ul>
      </div>
    </div>
    </React.Fragment>
  }
