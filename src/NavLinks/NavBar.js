import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle
  } from 'reactstrap';

import './NavBar.css'


const NavigationalBar = () => {

    const loggedInValue = useSelector(store=>store.loggedIn)

    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    function logout(){
      dispatch({ type : 'RESET_STATE'})
    }
  
    return (
      <div>
        <Navbar color="dark" dark id="navbar">
          <NavbarBrand href="/"id="brand-name">SPOON-FULL</NavbarBrand>
          {loggedInValue ? null : (
                            <NavItem>
                              <NavLink href="/Login" id="navlink-login">Login</NavLink>
                          </NavItem> 
                          ) }
          {loggedInValue ? 
                 null :  ( <NavItem>
                              <NavLink href="/Register" id="navlink-register">Register</NavLink>
                          </NavItem> 
                          ) }
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" id="navbar-items" navbar>
              <NavItem>
                <NavLink href="/" id="navlink-item">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/recipes" id="navlink-item">Recipe Search</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/menu" id="navlink-item">Menu Search</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/ingredients" id="navlink-item">Ingredient Search</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/products" id="navlink-item">Product Search</NavLink>
              </NavItem>
              {loggedInValue ? (
                <UncontrolledDropdown nav inNavbar >
                  <DropdownToggle nav caret>
                    User Info
                  </DropdownToggle>
                  <DropdownMenu style={{backgroundColor : 'grey'}}>
                        <DropdownItem>
                            <NavItem>
                              <NavLink href="/Profile" id="navlink-item">User Profile</NavLink>
                            </NavItem>
                        </DropdownItem>
                        <DropdownItem>
                          <NavItem>
                              <NavLink href="/" id="navlink-item" onClick={logout}>Logout</NavLink>
                          </NavItem>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
              ): null}
                  
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }

export default NavigationalBar;