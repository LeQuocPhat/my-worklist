import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import './login.css'
import firebase from '../../firebase';
import { createBrowserHistory } from "history";

class Login extends Component {
    state={
        email:'',
        password:'',
        loading:false,
        errors:[],
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })

    }
    isFormValid = ()=>{
        // const {errors} = this.state
        if(!this.state.email && !this.state.password){
            const error = {message: 'Email or pass word is invalid'}
            this.setState({errors: [ error]})
            return false
        }else if(!this.state.email || !this.state.password) {
            const error = {message: 'Email or pass word is empty'}
            this.setState({errors: [error]})
            return false
        }
        return true
    }

    handleInputError = (errors,inputName)=>{
        return errors.some(errors=>errors.message.toLowerCase().includes(inputName)) ? 'errors' : '';
    }

    displayErrors = (errors)=>(
        errors.map((error, i)=><p key={i}>{error.message}</p>)
    )
    ///ngoặc nhọn thì return trong thì ko phải return
        
    
    handleSubmit = (event)=>{
        let history = createBrowserHistory();
        event.preventDefault();
        if(this.isFormValid()){
            this.setState({
                errors:[],
                loading: true
            });
            const {email, password} = this.state;

            firebase.auth()
                .signInWithEmailAndPassword(email,password)
                .then((signedInUser)=>{
                    console.log(signedInUser);
                    this.setState({loading: false})

                    history.push('/')
                    window.location.reload();
                    // console.log('login ok')
                }).catch(err=>{
                    console.log(err);
                    this.setState({errors: [...this.state.errors, err], loading: false})
                })
        }

    }
    render() {
        const {email, password, loading,errors} = this.state
        return (
            <>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' icon textAlign='center'>
                            <Icon name='code branch' color='violet' /> Log-in to your account
                        </Header>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input fluid icon='user' 
                                    iconPosition='left' 
                                    placeholder='E-mail address' 
                                    name='email'
                                    value={email}
                                    onChange={this.handleChange}
                                    className={this.handleInputError(errors,'email')}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='password'
                                    type='password'
                                    name='password'
                                    value={password}
                                    className={this.handleInputError(errors,'password')}
                                    onChange={this.handleChange}
                                />
                                <Button className={loading ? 'loding': ''} color='teal' fluid size='large'>
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        {errors.length > 0 && (<Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>)}
                        
                        <Message>
                            You Don't have account <Link to='/Register'>Register</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </>
        );
    }
}

export default Login;