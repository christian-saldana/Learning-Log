import React, {useState, useEffect} from 'react'
import {apiDetailList} from './lookup'

export function Topic(props) {
    const {topic} = props
    const path = window.location.pathname
    const match = path.match(/(?<topicid>\d+)/ )
    const className = props.className ? props.className : 'fw-bold fs-1 col-10'
    const urlTopicId = match ? match.groups.topicid : -1
    const isDetail = `${topic.id}` === `${urlTopicId}`

    const handleLink = (event) => {
      event.preventDefault()
      window.location.href = `/${topic.id}`
    }

    return <div className = 'card border-3 border-dark mt-5'>
      <div className = 'card-body'>
        <p className={className}>{topic.post_topic}</p>  
        {isDetail === true ? null : <p className='fs-4'> {topic.post_entry.length === 0 ? null : <> Most Recent Entry: </>} </p>}
        {isDetail === true ? null : <p className='fs-4'> {topic.post_entry.length !== 0 ? null : <> Start Adding Entries: </>} </p>}
        {isDetail === true ? null : <div> <p > {topic.post_entry[0]} </p></div>} 
        {isDetail === true ? null : <button className='btn btn-dark' onClick={handleLink}> 
        {topic.post_entry.length === 0 ? null : <> Read Entries </>} 
        {topic.post_entry.length !== 0 ? null : <> Add Entries </>}</button>}    
      </div>  
      {isDetail === true ? null : <div className = 'card-footer'> <p > Total entries for this topic : {topic.post_entry.length} </p></div>} 
      
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
        <div key={e.id}>
          <h4 className='card-header border border-dark'> {e.date_added} 
              <button variant="contained" style={{float: 'right'}} className='btn btn-sm btn-link' onClick={() => handleLink(e.id)}>Edit Entry</button>
          </h4> 
            <p className='card-body border border-dark pb-5'> {e.post_entry} </p></div> 
        ))}

        {props.post_entry.map(e  => (
        <div key={e.id}> 
          <h4 className='card-header border border-dark'> {e.date_added} 
              <button variant="contained" style={{float: 'right'}} className='btn btn-sm btn-link' onClick={() => handleLink(e.id)}>Edit Entry</button>
          </h4> 
            <p className='card-body border border-dark pb-5' > {e.post_entry} </p> 
        </div> 
        ))}

      </div>
}

