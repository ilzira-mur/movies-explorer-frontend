class MainApi {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    
    getHeader() {
      const token = localStorage.getItem('token');
      return {
          ...this._headers,
          Authorization: `Bearer ${token}`,
      }
  }

  _getResponseData(res){
    if (res.ok) {
      return res.json();
    } return Promise.reject(`Произошла ошибка - ${res.status}`);
  }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this.getHeader(),
        }).then(this._getResponseData);
    }

    addNewCard(data) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this.getHeader(),
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      }).then(this._getResponseData);
  }



  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this.getHeader(),
      }).then(this._getResponseData);
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this.getHeader(),
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
      }).then(this._getResponseData);
  }

  registerUser(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this.getHeader(),
      body: JSON.stringify({name, email, password})
      }).then(this._getResponseData);
  }

  loginUser(email, password){
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this.getHeader(),
      body: JSON.stringify({email, password})
      })
      .then(this._getResponseData)
      .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
    });
  }

  addMovieLike(movieCard, token) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(movieCard),
    }).then(this._getResponseData);
  }
  changeLikeCardStatus(movieCard, id, isLike, token) {
    return isLike ? this.addMovieLike(movieCard, token) : this.deleteMovieLike(id, token)
  }
  deleteMovieLike(id, token) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
    }).then(this._getResponseData);
  }

  getContent(token) {
  return fetch(`${this._url}/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }).then(this._getResponseData)
};

}

const mainApi = new MainApi({
  url: "https://api.oops.nomoredomains.club",
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json'
  },
});

export default mainApi;