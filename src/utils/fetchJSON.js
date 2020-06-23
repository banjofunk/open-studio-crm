import { Auth } from 'aws-amplify'

function fetchJSON(input, init={}) {
  // init.credentials = 'include'

  if(!init.headers) {
    init.headers = {}
  }

  init.headers['Accept'] = 'application/json'

  if(init.body) {
    init.headers['Content-Type'] = 'application/json'
  }

  return Auth.currentSession()
    .then(data => {
      init.headers['Authorization'] = data.idToken.jwtToken
      return fetch(input, init)
        .then(response => response.json())
        .then(response => {
          if(response.error){ throw response.error }
          return response
        })
    })
}

export default fetchJSON
