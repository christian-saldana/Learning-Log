import React, {useState, useEffect} from 'react'
import {apiDetailList} from './lookup'

export function Topic(props) {
    const {topic} = props
    const path = window.location.pathname
    const match = path.match(/(?<topicid>\d+)/ )
    const className = props.className ? props.className : 'fw-bold fs-1 col-10 mx-auto col-md-6'
    const urlTopicId = match ? match.groups.topicid : -1
    const isDetail = `${topic.id}` === `${urlTopicId}`

    const handleLink = (event) => {
      event.preventDefault()
      window.location.href = `/${topic.id}`
    }
    
    return <div>
      <div>
        <p className={className}>{topic.post_topic}</p>       
      </div>
      {isDetail === true ? null : <p className='fs-2'> Most recent entry: <br/> {topic.post_entry[0]} </p>}
      {isDetail === true ? null : <button className='btn btn-outline-primary' onClick={handleLink}>Read Entries</button>}
    </div>
  }




export function EntriesList(props) {
  const path = window.location.pathname
  const match = path.match(/(?<topicid>\d+)/ )
  const urlTopicId = match ? match.groups.topicid : -1
  const [entriesInit, setEntriesInit] = useState([])
  const [entries, setEntries] = useState([])
  const [entriesDidSet, setEntriesDidSet] = useState(false)
  useEffect(() =>{
    const final = [...props.newEntries]
    if (final.length !== entries.length) {
        setEntries(final)
    }
}, [props.newEntries, entries, entriesInit])

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

    const handleLink = (event) => {
    window.location.href = `/edit_entry/${event}`
  }

    return <div>
          {entries.map(e => (
        <div className='card-body border pb-5' key={e.id}>{e.post_entry} </div> 
        ))}

        {props.post_entry.map(e  => (
        <div key={e.id}> 
          <h4 className='card-header border-top'> {e.date_added} 
              <button variant="contained" style={{float: 'right'}} className='float-right btn-sm' onClick={() => handleLink(e.id)}>Edit Entry</button>
          </h4> 
            <p className='card-body border pb-5' > {e.post_entry} </p> 
        </div> 
        ))}
      </div>
}

