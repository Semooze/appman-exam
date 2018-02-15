import React from 'react';
import home from './styles/index.scss' ;
import logo from './logo.svg';

const Logo = () => {
    return (
        <div className="header--logo">
            <img src={logo}></img>
        </div>
     );
};

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let url = "http://localhost:3000/api/login";
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log('pass');
            } else {
                console.log('fail');
            }
          };
        xhttp.open("POST", url, true);
        xhttp.send();
    }

    render() {
        return (
        <form className="body--form" onSubmit={this.handleSubmit}>
            <p>E-mail address</p>
            <input type="text" placeholder="example@appman.co.th"/><br />
            <p>Password</p>
            <input type="password" placeholder="your password..."/><br />
            <div className="body--submit-block">
                    <button
                        type="submit"
                        className="body--submit-button"
                    >SIGN IN
                    </button>
                </div>
        </form>
        );
    }
};

class App extends React.Component {

    render() {
        return (
            <div className="login--form">
                <div className="login--form-inside">
                    <Logo />
                    <Form handleSubmit={this.handleSubmit }/>
                    <div className="footer--forgot-password"><a href="#">Forgot password</a></div>
                    <div className="footer--new-account"><a href="#">Create a new account</a></div>
                </div>
            </div>
        );
    };
}

export default App;
