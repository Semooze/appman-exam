import React from 'react';
import home from './styles/index.scss' ;
import logo from './logo.svg';

let glitter = "#f8f8ff";
document.body.style.backgroundColor = glitter;

const Logo = (props) => {

    let className="header--logo";
    console.log(props);
    if (props.loading) {
        className += " logo-spin";
    }

    return (
        <div className={className}>
            <img src={logo}></img>
        </div>
     );
};

const Form = (props) => {

    return (
    <form className="body--form" onSubmit={props.handleSubmit}>
        <p>E-mail address</p>
        <input name="email" type="text" placeholder="example@appman.co.th"/><br />
        <p>Password</p>
        <input name="password" type="password" placeholder="your password..."/>
        <div className="body-error-message">{(props.errorMessage) ? props.errorMessage: " " }</div>
        <div className="body--submit-block">
                <button
                    type="submit"
                    className="body--submit-button"
                >SIGN IN
                </button>
            </div>
    </form>
    );

};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            loading: false,
            errorMessage: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLoad(email, password, url, that) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            let patt = /^40\d{1}$/g;
            if (this.readyState === 4 && this.status === 200) {
                alert("Login Successed");
            }

            if (this.readyState === 4 && patt.test(this.status)) {
                that.setState({ errorMessage: 'E-mail or password is incorrect', loading: false});
            }

            if (this.readyState === 4) {
                that.setState((prevState) => ({ errorMessage: prevState.errorMessage, loading: false}));
            }
        };

        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(`email=${email}&password=${password}`);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ errorMessage: '', loading: true});
        let that = this;
        let url = "http://localhost:3000/api/login";
        this.handleLoad(event.target.email.value, event.target.password.value, url, this);
    }

    render() {
        return (
            <div className="login--form">
                <div className="login--form-inside">
                    <Logo loading={this.state.loading}/>
                    <Form
                        handleSubmit={this.handleSubmit}
                        errorMessage={this.state.errorMessage}
                    />
                    <div className="footer--forgot-password"><a href="#">Forgot password ?</a></div>
                    <div className="footer--new-account"><a href="#">Create a new account</a></div>
                </div>
            </div>
        );
    };
}

export default App;
