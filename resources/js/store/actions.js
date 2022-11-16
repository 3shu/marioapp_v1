import axios from 'axios'

axios.defaults.withCredentials = true
export function login (state, user) {
  return new Promise((resolve, reject) => {
    axios.post('/api/auth/login', user)
    .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        resolve(error.response.data)
      })
  })
}

export function logout (state, user) {
    let token = getToken()
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/logout')
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          resolve(error.response.data)
        })
    })
  }

  export function setToken (state, data) {
    localStorage.setItem('tokenapp',data)
    state.commit('setToken', data)
  }

  export function removeToken (state, data) {
    localStorage.removeItem('tokenapp');
    state.commit('setToken', data)
  }
  export function setUser (state, data) {
    localStorage.setItem('user',JSON.stringify(data))
    state.commit('setUser', data)
  }

  export function removeUser (state, data) {
    localStorage.removeItem('user');
    state.commit('setUser', data)
  }

  export function register (state, user) {
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/register', user)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        resolve(error.response.data)
      })
    })
  }

  function getToken (state) {
    return localStorage.getItem('tokenapp')
  }

  export function searchMovies (state, data) {
    let params = {}

        if (data.query) {
          params.query = data.query
        }
        if (data.page) {
            params.page = data.page
          }
    return new Promise((resolve, reject) => {
      axios.get('/api/search', { params: params })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        resolve(error.response.data)
      })
    })
  }

// Movies
  export function addMovie (state, data) {
    let token = getToken()
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    let params = {}

    if (data.title) {
        params.title = data.title
    }
    if (data.overview) {
        params.overview = data.overview
    } else {
        params.overview = 'S/C'
    }
    if (data.poster_path) {
        params.poster = data.poster_path
    } else {
        params.poster = '/o86DbpburjxrqAzEDhXZcyE8pDb.png'
    }
    if (data.id) {
        params.id_movie = data.id
    }
    return new Promise((resolve, reject) => {
      axios.post('/api/movies', params)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          resolve(error.response.data)
        })
    })
  }

  export function getMovies (state, data) {
    let token = getToken()
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    let params = {}
    return new Promise((resolve, reject) => {
      axios.get('/api/movies', params)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          resolve(error.response.data)
        })
    })
  }

  export function getMovie (state, id) {
    let token = getToken()
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return new Promise((resolve, reject) => {
      axios.get('/api/movies/'+id)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          resolve(error.response.data)
        })
    })
  }

  export function editMovie (state, data) {
    let token = getToken()
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    let params = {}

    if (data.title) {
        params.title = data.title
    }
    if (data.overview) {
        params.overview = data.overview
    }
    if (data.poster) {
        params.poster = data.poster
    }
    if (data.comment) {
        params.comment = data.comment
    }
    if (data.id_movie) {
        params.id_movie = data.id_movie
    }
    params.view = data.view | 0

    return new Promise((resolve, reject) => {
      axios.put('/api/movies/'+data.id, params)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          resolve(error.response.data)
        })
    })
  }

  export function deleteMovie (state, id) {
    let token = getToken()
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return new Promise((resolve, reject) => {
      axios.delete('/api/movies/'+id)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          resolve(error.response.data)
        })
    })
  }

//Users
export function getUsers (state, data) {
    let token = getToken()
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    let params = {}
    return new Promise((resolve, reject) => {
      axios.get('/api/users', params)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          resolve(error.response.data)
        })
    })
  }
  export function getUser (state, id) {
    let token = getToken()
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return new Promise((resolve, reject) => {
      axios.get('/api/users/'+id)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          resolve(error.response.data)
        })
    })
  }

  export function addUser (state, data) {
    let token = getToken()
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    let params = {}

    if (data.name) {
        params.name = data.name
    }
    if (data.email) {
        params.email = data.email
    }
    if (data.rol) {
        params.rol = data.rol
    }

    return new Promise((resolve, reject) => {
      axios.post('/api/users', params)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          resolve(error.response.data)
        })
    })
  }

  export function editUser (state, data) {
    let token = getToken()
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    let params = {}

    if (data.name) {
        params.name = data.name
    }
    if (data.email) {
        params.email = data.email
    }
    if (data.rol) {
        params.rol = data.rol
    }

    return new Promise((resolve, reject) => {
      axios.put('/api/users/'+data.id, params)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          resolve(error.response.data)
        })
    })
  }

  export function deleteUser (state, id) {
    let token = getToken()
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return new Promise((resolve, reject) => {
      axios.delete('/api/users/'+id)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          resolve(error.response.data)
        })
    })
  }
