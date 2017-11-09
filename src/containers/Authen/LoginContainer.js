import React, {Component} from 'react';
import {
  Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon,
  FormFeedback, Alert
} from 'reactstrap';
import {history} from "../../utils/Store";
import {clearError} from "../../actions/Errors";
import {connect} from "react-redux";
import {login, logout} from "../../actions/Auth";
import {LoadingBar} from "react-redux-loading-bar";

class LoginContainer extends Component {
  _initState = {
    credential: '',
    password: '',
    activeLoginBtn: false,
    validate: {}
  };

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      ...this._initState
    };
  };

  componentWillMount () {
    let instance = this;
    if(document.documentMode === 11) {
      window.onstorage = function (e) {
        instance.setState({
          reload: true,
        })
      }
    }
  }

  _handleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name] : value,
    });

    this.setState({activeLoginBtn: !this._isEmptyCredential() && !this._isEmptyPassword()});
  };

  _handleKeyPress = (event) => {
    if(event.key !== "Meta") {
      if (event.key === "Enter") {
        this._doLogin();
      } else {
        //nothing
      }
    }
  };

  _isEmptyCredential = () => {
    return !this.state.hasOwnProperty('credential') || this.state.credential === "" || this.state.credential === null;
  };

  _isEmptyPassword = () => {
    return !this.state.hasOwnProperty('password') || this.state.password === "" || this.state.password === null
  };

  _validate = () => {
    this.state.validate = {};
    if (this._isEmptyCredential()) {
      this.state.validate.credential = 'Email field is required!';
    }

    if (this._isEmptyPassword()) {
      this.state.validate.password = 'Password field is required!';
    }

    return Object.keys(this.state.validate).length === 0;
  };

  _checkValidInput = (input) => {
    return !(this.state.validate.hasOwnProperty(input) && this.state.validate[input].length > 0);
  };

  _directToRegister = () => {
    history.push({
      pathname : '/register',
      state: {from: history.location}
    })
  };

  _doLogin = () => {
    this.setState({activeLoginBtn: false});
    let valid = this._validate();
    console.log(this.state);
    if(valid) {
      this.props.clearError();
      this.props.login(this.state.credential, this.state.password);
    }
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <LoadingBar />
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    {this.props.error?
                      (<Alert color="danger">{this.props.error.data.message}</Alert>)
                      :
                      (<p className="text-muted">Sign In to your account</p>)
                    }

                    {!this._checkValidInput("credential") &&
                    <div className="text-danger">{this.state.validate.credential}</div>
                    }
                    <InputGroup className="mb-3">
                      <InputGroupAddon><i className="icon-envelope"></i></InputGroupAddon>
                      <Input type="email" name="credential" placeholder="Email"
                             disabled={this.props.isLoading}
                        value={this.state.credential}
                        onBlur={this._handleChange}
                        onChange={this._handleChange}
                        onKeyPress={this._handleKeyPress}/>
                    </InputGroup>

                    {!this._checkValidInput("password") &&
                    <div className="text-danger">{this.state.validate.password}</div>
                    }
                    <InputGroup className="mb-4">
                      <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        disabled={this.props.isLoading}
                        onBlur={this._handleChange}
                        onChange={this._handleChange}
                        onKeyPress={this._handleKeyPress}/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button
                          color="primary"
                          className="px-4 btn-round"
                          disabled={this.props.activeLoginBtn}
                          onClick={this._doLogin}>Login</Button>
                      </Col>
                      {/*<Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>*/}
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                        <Button color="primary" className="mt-3 btn-round" active onClick={this._directToRegister}>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  //End render
}



const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    token: state.user.token,
    me: state.user.me,
    error: state.user.error,
    isLoading: state.user.isLoading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearError: function () {
      dispatch(clearError());
    },
    login: function (username, password) {
      dispatch(login(username, password));
    },
    logout: () => {
      dispatch(logout());
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)
