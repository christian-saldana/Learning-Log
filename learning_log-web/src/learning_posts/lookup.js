import {backendLookup} from '../lookup'

export function apiTopicCreate(newTopic, callback) {
    backendLookup("POST", "/topics/new_topic/", callback, {text: newTopic})
  
  }

  export function apiDetailList(topicId, callback) {
    backendLookup("GET", `/topics/${topicId}`, callback)
}
  
  export function apiTopicsList(username, callback) {
      let endpoint = "/topics"
      if (username){
          endpoint = `/topics/?username=${username}`

      }
      backendLookup("GET", endpoint, callback)
  }