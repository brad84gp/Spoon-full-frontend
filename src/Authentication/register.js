import React from 'react'

import './login.css'

import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import SpoonacularApi from '../API/ThirdParty-API';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const RegisterForm = () => {

    const history = useHistory()

    const dispatch = useDispatch()

    async function handleRegister(evt){
        evt.preventDefault()
        try{
            const formValues = document.querySelector('.login-form-info')
            const username = formValues.username.value
            const password = formValues.password.value
            const first_name = formValues.First_name.value
            const last_name = formValues.Last_name.value
            const email = formValues.email.value
            const response = await SpoonacularApi.registerNewUser({username, password, first_name, last_name, email})
            if(response){
                dispatch({ type : 'USER', payload : response.user})
                dispatch({ type : 'LOGGED_IN'})
                dispatch({ type : 'TOKEN_VALUE', payload : response._token})
                history.push("/Profile")
            }
        }catch{
            alert("Opps something went wrong our end, Please try again!")
        }
    }

    return (
        <div>
        <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
                <h1 id="form-title">Register Form</h1>
                <Form className="login-form-info" action="">
                    <Row form>
                        <Col md={12}>

                            <FormGroup id="formgroup">
                                <Label for="username">Username</Label>
                                <Input type="text" name="address" id="username" placeholder="username"/>
                            </FormGroup>
                           
                            <FormGroup id="formgroup">
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="password" />
                            </FormGroup>

                            
                            <FormGroup id="formgroup">
                                <Label for="first_name">First Name</Label>
                                <Input type="text" name="First_name" id="first_name" placeholder="first name"/>
                            </FormGroup>

                            <FormGroup id="formgroup">
                                <Label for="last_name">Last Name</Label>
                                <Input type="text" name="Last_name" id="last_name" placeholder="last name" />
                            </FormGroup>

                            <FormGroup id="formgroup">
                                <Label for="user_email">Email</Label>
                                <Input type="email" name="email" id="user_email" placeholder="email"/>
                            </FormGroup>  

                            </Col>
                        </Row>
                    <Button onClick={handleRegister} style={{margin : '2em'}}>Register</Button>
                </Form>
            </Col>
            <Col sm={2}></Col>
        </Row>
         
    </div>
    )
}

export default RegisterForm