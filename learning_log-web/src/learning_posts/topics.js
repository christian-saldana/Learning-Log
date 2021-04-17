import React, {useEffect, useState} from 'react'

import {apiTopicsList} from './lookup'

import {Topic} from './detail'

export function TopicsList(props) {
  console.log(props)
    const [topicsInit, setTopicsInit] = useState([])
    const [topics, setTopics] = useState([])
    const [nextUrl, setNextUrl] = useState(null)
    const [topicsDidSet, setTopicsDidSet] = useState(false)
    useEffect(() =>{
        const final = [...props.newTopics].concat(topicsInit)
        if (final.length !== topics.length) {
            setTopics(final)
        }
    }, [props.newTopics, topics, topicsInit])

    useEffect(() => {
      if (topicsDidSet === false) {
        const handleTopicsListLookup = (response, status) => {
          if (status === 200){
            setNextUrl(response.next)
            setTopicsInit(response.results)
            setTopicsDidSet(true)
          } else {
            alert("There was an error")
          }
        }
        apiTopicsList(props.username, handleTopicsListLookup)
      }
    }, [topicsInit, topicsDidSet, setTopicsDidSet, props.username])

    const handleLoadNext = (event) => {
      event.preventDefault()
      if (nextUrl !== null) {
        const handleLoadNextResponse = (response, status) =>{
          if (status === 200){
            setNextUrl(response.next)
            const newTopics = [...topics].concat(response.results)
            setTopicsInit(newTopics)
            setTopics(newTopics)
          } else {
            alert("There was an error")
          }
        }
        apiTopicsList(props.username, handleLoadNextResponse, nextUrl)
      }
    }
    console.log(topics)

    return <React.Fragment>{topics.map((item, index)=>{
      return <Topic 
      topic={item} 
      className='my-5 py-5 border bg-white text-dark' 
      key={`${index}-{item.id}`}/>
    })}
    { nextUrl !== null && <button onClick={handleLoadNext} className='btn btn-outline-primary'> Load Next </button>}
    </React.Fragment>
  }