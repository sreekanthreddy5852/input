import React, {Component} from 'react'
import './index.css'

class PasswordManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passwords: [],
      showPasswords: false,
      searchValue: '',
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }
  }

  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleCheckboxChange = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  handleAddPassword = event => {
    event.preventDefault()

    const {websiteInput, usernameInput, passwordInput} = this.state

    if (!websiteInput || !usernameInput || !passwordInput) {
      alert('Please fill in all fields')
      return
    }

    this.setState(prevState => ({
      passwords: [
        ...prevState.passwords,
        {
          website: websiteInput,
          username: usernameInput,
          password: passwordInput,
          id: Date.now(),
        },
      ],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  handleDeletePassword = id => {
    this.setState(prevState => ({
      passwords: prevState.passwords.filter(password => password.id !== id),
    }))
  }

  render() {
    const {passwords, showPasswords, searchValue} = this.state
    const filteredPasswords = passwords.filter(password =>
      password.website.toLowerCase().includes(searchValue.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="inputs-container">
          <div className="container">
            <h1>Add New Password</h1>
            <form onSubmit={this.handleAddPassword}>
              <div className="input-images">
                <img
                  className="input-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <hr />
                <input
                  type="text"
                  name="websiteInput"
                  placeholder="Enter Website"
                  value={this.websiteInput}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="input-images">
                <img
                  className="input-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <hr />
                <input
                  type="text"
                  name="usernameInput"
                  placeholder="Enter Username"
                  value={this.usernameInput}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="input-images">
                <img
                  className="input-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <hr />
                <input
                  type="password"
                  name="passwordInput"
                  placeholder="Enter Password"
                  value={this.passwordInput}
                  onChange={this.handleInputChange}
                />
              </div>
              <button className="button" type="submit">
                Add
              </button>
            </form>
          </div>

          <img
            className="password-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
        </div>

        <div className="result-container">
          <div className="password-container">
            <h1>Your Passwords</h1>
            <p>{filteredPasswords.length}</p>

            <div className="search-container">
              <img
                className="search-icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <hr />
              <input
                type="search"
                value={searchValue}
                onChange={e => this.setState({searchValue: e.target.value})}
              />
            </div>
          </div>

          <hr className="line" />

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkboxId"
              onChange={this.handleCheckboxChange}
              checked={showPasswords}
            />
            <label htmlFor="checkboxId">Show passwords</label>
          </div>

          {filteredPasswords.length > 0 ? (
            <ul>
              {filteredPasswords.map(password => (
                <li key={password.id}>
                  <p>{password.website}</p>
                  <p>{password.username}</p>
                  {showPasswords ? (
                    <p>{password.password}</p>
                  ) : (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                      alt="stars"
                    />
                  )}
                  <button
                    data-testid="delete"
                    onClick={() => this.handleDeletePassword(password.id)}
                  >
                    <img
                      className="delete-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <img
                alt="no passwords"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              />
              <p>No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
