import React, { useState } from 'react'

import './UserEditProfile.css'

import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import SpoonacularApi from '../API/ThirdParty-API';
import { useHistory } from 'react-router-dom';

const EditProfile = () => {

    const history = useHistory()

    const userStoreValues = useSelector(store=> store.user)
    
    const token = useSelector(store=>store.token)

    const dispatch = useDispatch()

    const [userInfo, setUserInfo] = useState(userStoreValues)

    const [successfullUpdate, setSuccessfullUpdate] = useState(false)

    const [confirmDelete, setConfirmDelete] = useState(false)

    async function submitChanges(evt){
        evt.preventDefault()
        const formInfo = document.querySelector('.edit-profile-info')
        const username = userInfo.username
        const first_name = formInfo.firstname.value
        const last_name = formInfo.lastname.value
        const email = formInfo.email.value
        let response = await SpoonacularApi.editUserInfo({username, first_name, last_name, email}, username)
        if(response.msg == 'Successfull update'){
            dispatch({ type : 'USER', payload : response.response})
            setSuccessfullUpdate(true)
        }
        
    }

    async function deleteAccount(){
        try{
            const username = userInfo.username
            let response = await SpoonacularApi.deleteUserAccount(username)
            if(response.Message == 'Deleted successfully'){
                dispatch({ type : 'RESET_STATE'})
            }
        }catch{
            alert("Opps something went wrong, try again!")
        }
    }

    function popUp(){
        setConfirmDelete(true)
    }

    function removePopUp(){
        setConfirmDelete(false)
    }

    function handleChange(evt){
        const { name, value } = evt.target
        setUserInfo(data => ({...data, [name] : value}))
    }

    if(!token) history.push('/')

    return (
        <div>
            <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <h1 id="edit-profile-title">Edit Profile</h1>
                    <Form className="edit-profile-info" action="">
                        <Row form>
                            <Col md={12}>

                                <FormGroup id="formgroup">
                                    <Label for="username">Username</Label>
                                    <Input type="text" name="username" id="username" placeholder="Username" value={userInfo.username} onChange={handleChange} />
                                </FormGroup>

                                <FormGroup id="formgroup">
                                    <Label for="firstname">First Name</Label>
                                    <Input type="text" name="first_name" id="firstname" placeholder="First Name" value={userInfo.first_name} onChange={handleChange}/>
                                </FormGroup>
                               
                                <FormGroup id="formgroup">
                                    <Label for="lastname">Last Name</Label>
                                    <Input type="text" name="last_name" id="lastname" placeholder="Last Name" value={userInfo.last_name} onChange={handleChange}/>
                                </FormGroup>

                                <FormGroup id="formgroup">
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" id="email" placeholder="Email" value={userInfo.email} onChange={handleChange}/>
                                </FormGroup>

                                </Col>
                            </Row>
                        <Button color="primary" style={{margin : '2em'}} onClick={submitChanges}>Submit Changes</Button>
                        <Button color="danger" style={{float : 'right', margin : '2em'}} onClick={popUp}>DELETE ACCOUNT</Button>
                    </Form>
                    {successfullUpdate ? (<h3 style={{textAlign :'center'}}>Update was Successfull</h3>) : null}
                    {confirmDelete ? (
                        <div className="delete-account-div">
                            <h4 id="delete-account-h4">Are you sure you want to delete your account? <u>This cannot be undone!</u></h4>
                            <Button color="danger" style={{margin : '2em'}} onClick={deleteAccount}>DELETE ACCOUNT</Button>
                            <Button color="secondary" style={{margin : '2em'}} onClick={removePopUp}>Cancel</Button>
                        </div>
                    ) : null}
                </Col>
                <Col sm={2}></Col>
            </Row>
             
        </div>
    )
}

export default EditProfile