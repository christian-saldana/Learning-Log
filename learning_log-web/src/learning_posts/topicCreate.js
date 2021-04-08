import React from 'react'

import {apiTopicCreate} from './lookup'


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
      return <div className={props.className}>
          <form onSubmit={handleSubmit}>
            <textarea ref={textAreaRef} required={true} className='form-control' name='topic'>
  
            </textarea>
            <button type='submit' className='btn btn-primary my-3'>Topic</button>
          </form>
    </div>
    }