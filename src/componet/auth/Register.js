import md5 from 'md5';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import firebase from '../../firebase';

class Register extends Component {
    state={
        username:'',
        email:'',
        password:'',
        passwodConfirmation:'',
        loading:false,
        errors:[],
        userRef: firebase.database().ref('users')
    }
 
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let a = this.isFormValid
        if(a){
            const {username,email, password,errors} = this.state
            this.setState({
                errors:[],
                loading:true
            });
            firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((createUser)=>{
                console.log(createUser)

                createUser.user.updateProfile({
                    displayName: username,
                    photoURL:`htpp://gravatar.com/avatar/${md5(createUser.user.email)}?d=identicon`
                }).then(()=>{
                    this.saveUsers(createUser).then(() =>{
                        console.log('user save');
                        this.setState({loading:false})
                    })
                })

            }).catch(err=>{
                console.log(err);
                this.setState({errors: [...errors, err], loading: false})
            })
        }
    }

    saveUsers = (createUser) =>{
        return this.state.userRef.child(createUser.user.uid).set({
            name: createUser.user.displayName,
            avatar:createUser.user.photoURL
        });
    }
    
    isFormValid = ()=>{
        let errors = []
        let error
        const {username,email, password,passwodConfirmation}= this.state
        if(!username.length || !email.length|| !password.length|| !passwodConfirmation.length){
            error = {message:'Fill in all field'}
            this.setState({errors:errors.concat(error)});
            return false;
        }else if(password.length < 6 || passwodConfirmation.length < 6 || password !== passwodConfirmation){
            error = {message:'password is invalid'}
            this.setState({errors:errors.concat(error)});
            return false;
        }
        return true
    }
    displayErrors = (error) =>
        error.map((er, i)=>
            <p key={i}>{er.message}</p>
        )
    
    handleInputError = (errors,inputName)=>{
        return errors.some(errors=>errors.message.toLowerCase().includes(inputName)) ? 'errors' : '';
    }
    
    render() {
        const {username, email, loading,errors} = this.state;
        return (
            <>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' icon textAlign='center' color='orange'>
                            <Icon name='code branch' color='orange' />Register account
                        </Header>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input value={email} name='email' fluid icon='user' iconPosition='left' placeholder='E-mail address' 
                                onChange={this.handleChange}
                                className={this.handleInputError(errors,'email')}
                                />
                                <Form.Input value={username} name='username' fluid type='username' icon='user' iconPosition='left' placeholder='User Name' 
                                onChange={this.handleChange}
                                className={this.handleInputError(errors,'username')}

                                />
                                <Form.Input
                                     fluid
                                     icon='lock'
                                     iconPosition='left'
                                     placeholder='Password'
                                     type='password'
                                     name='password'
                                    onChange={this.handleChange}
                                    className={this.handleInputError(errors,'password')}
                                />
                                <Form.Input
                                    fluid
                                    icon='repeat'
                                    iconPosition='left'
                                    placeholder='passwordConfirmation'
                                    type='password'
                                    name='passwordConfirmation'
                                    onChange={this.handleChange}
                                    className={this.handleInputError(errors,'passwordConfirmation')}
                                />
                                <Button className={loading ? 'loading': ''} color='orange' fluid size='large'>
                                    Register
                                </Button>
                            </Segment>
                        </Form>
                        {this.state.errors.length > 0 &&<Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>}
                        
                        <Message>
                            You have account <Link to='/Login'>Login</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </>
        );
    }
}

export default Register;