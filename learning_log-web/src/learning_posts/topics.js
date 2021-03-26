import React, {useEffect, useState} from 'react'

import {apiTopicsList} from './lookup'

import {Topic} from './detail'

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
        const handleTopicsListLookup = (response, status) => {
          if (status === 200){
            setTopicsInit(response)
            setTopicsDidSet(true)
          } else {
            alert("There was an eror")
          }
        }
        apiTopicsList(props.username, handleTopicsListLookup)
      }
    }, [topicsInit, topicsDidSet, setTopicsDidSet, props.username])
    return topics.map((item, index)=>{
      return <Topic topic={item} className='my-5 py-5 border bg-white text-dark' key={`${index}-{item.id}`}/>
    })
  }