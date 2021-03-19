import React, {useEffect, useState} from 'react'

import {createTopic, loadTopics} from '../lookup'

export function TopicsComponent(props) {
    const textAreaRef = React.createRef()
    const [newTopics, setNewTopics] = useState([])
    const handleBackendUpdate = (response, status) => {
      let tempNewTopics = [...newTopics]
      if (status === 201) {
        tempNewTopics.unshift(response)
        setNewTopics(tempNewTopics)
      } else {
        console.log(response)
        alert("An error occurred please try again.")
      }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const newVal = textAreaRef.current.value
        createTopic(newVal, handleBackendUpdate)
        textAreaRef.current.value=''
    }
    return <div className={props.className}>
            <div className='col-12 mb-3'>
              <form onSubmit={handleSubmit}>
              <textarea ref={textAreaRef} required={true} className='form-control'>

              </textarea>
              <button type='submit' className='btn btn-primary my-3'>Topic</button>
            </form>
            </div>
          <TopicsList newTopics={newTopics}/>
    </div>
}
  
export function TopicsList(props) {
    const [topicsInit, setTopicsInit] = useState([])
    const [topics, setTopics] = useState([])
    const [topicsDidSet, setTopicsDidSet] = useState(false)
    useEffect(() =>{
        const final = [...props.newTopics].concat(topicsInit)
        if (final.length !== topics.length) {
            setTopics(final)
        }
    }, [props.newTopics, topics, topicsInit])

    useEffect(() => {
      if (topicsDidSet === false) {
        const myCallback = (response, status) => {
          if (status === 200){
            setTopicsInit(response)
            setTopicsDidSet(true)
          } else {
            alert("There was an eror")
          }
        }
        loadTopics(myCallback)
      }
    }, [topicsInit, topicsDidSet, setTopicsDidSet])
    return topics.map((item, index)=>{
      return <Topic topic={item} className='my-5 py-5 border bg-white text-dark' key={`${index}-{item.id}`}/>
    })
  }

export function Topic(props) {
    const {topic} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return <div className={className}>
      <p>{topic.id} - {topic.text}</p>
    </div>
  }