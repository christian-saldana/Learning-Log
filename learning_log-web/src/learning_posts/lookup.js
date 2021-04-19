import {backendLookup} from '../lookup'

export function apiTopicCreate(newTopic, callback) {
    backendLookup("POST", "/topics/new_topic/", callback, {post_topic: newTopic})
  
  }

  export function apiEntryCreate(current_topic, newEntry, callback) {
    backendLookup("POST", "/topics/new_entry/", callback, {topic: current_topic, post_entry: newEntry})
  }

  export function apiDetailList(topicId, callback) {
    backendLookup("GET", `/topics/${topicId}`, callback)
}
  
  export function apiTopicsList(username, callback, nextUrl) {
      let endpoint = "/topics/"
      if (username){
          endpoint = `/topics/?username=${username}`
      }
      if (nextUrl !== null && nextUrl !== undefined) {
        endpoint = nextUrl.replace("http://localhost:8000/api", "")
      }
      backendLookup("GET", endpoint, callback)
  }