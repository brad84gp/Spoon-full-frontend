import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './login.css'
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import SpoonacularApi from '../API/ThirdParty-API';



const LoginForm = () => {
    const history = useHistory()

    const storeValues = useSelector(store=>store.user)
    const dispatch = useDispatch()
    
    async function handleSignIn(evt){
        evt.preventDefault()
        const formValues = document.querySelector('.login-form-info')
        const username = formValues.username.value
        const password = formValues.password.value
        let response = await SpoonacularApi.loginUser({username, password})
        if(response){
            dispatch({ type : 'USER', payload : response.user})
            dispatch({ type : 'LOGGED_IN'})
            dispatch({ type : 'TOKEN_VALUE', payload : response._token})
            history.push("/Profile")
        }

        
    }

    return (
        <div>
            <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <h1 id="form-title">Login Form</h1>
                    <Form className="login-form-info" action="">
                        <Row form>
                            <Col md={12}>

                                <FormGroup id="formgroup">
                                    <Label for="username">Username</Label>
                                    <Input type="text" name="username" id="username" placeholder="username"/>
                                </FormGroup>
                               
                                <FormGroup id="formgroup">
                                    <Label for="examplePassword">Password</Label>
                                    <Input type="password" name="password" id="examplePassword" placeholder="password" />
                                </FormGroup>

                                </Col>
                            </Row>
                        <Button onClick={handleSignIn} style={{margin : '2em'}}>Sign in</Button>
                    </Form>
                </Col>
                <Col sm={2}></Col>
            </Row>
             
        </div>
    )
}

export default LoginForm