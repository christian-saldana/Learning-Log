import React from 'react'

import {apiTopicCreate, apiEntryCreate} from './lookup'



export function TopicCreate(props){
    const textAreaRef = React.createRef()
    const {didTopic} = props
      const handleBackendUpdate = (response, status) => {
        if (status === 201) {
          didTopic(response)
        } else {
          console.log(response)
          alert("An error occurred please try again.")
        }
      }
      const handleSubmit = (event) => {
          event.preventDefault()
          const newVal = textAreaRef.current.value
          apiTopicCreate(newVal, handleBackendUpdate)
          textAreaRef.current.value=''
      }
      return <div>
          <form onSubmit={handleSubmit}>
            <textarea ref={textAreaRef} required={true} className='form-control form-control-sm' name='topic'>
  
            </textarea>
            <button type='submit' className='btn btn-outline-primary my-3'>New Topic</button>
          </form>
    </div>
    }

    export function EntryCreate(props){
      const path = window.location.pathname
      const match = path.match(/(?<topicid>\d+)/ )
      const urlTopicId = match ? match.groups.topicid : -1
      const textAreaRef = React.createRef()
      const {didEntry} = props
        const handleBackendUpdate = (response, status) => {
          if (status === 201) {
            didEntry(response)
          } else {
            console.log(response)
            alert("An error occurred please try again.")
          }
        }
        const handleSubmit = (event) => {
            event.preventDefault()
            const newVal = textAreaRef.current.value
            apiEntryCreate(urlTopicId, newVal, handleBackendUpdate)
            textAreaRef.current.value=''
        }
        console.log(props)
        return <div className={props.className}>
            <form onSubmit={handleSubmit}>
              <textarea ref={textAreaRef} required={true} className='form-control form-control-sm' name='entry'>
    
              </textarea>
              <button type='submit' className='btn btn-outline-primary my-3'>New Entry</button>
            </form>
      </div>
      }