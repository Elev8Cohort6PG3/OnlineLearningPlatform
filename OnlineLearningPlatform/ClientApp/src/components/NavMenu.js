import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import AccountDropdownMenu from "./AccountDropdownMenu";
import SimpleSearch from "./SimpleSearch";

export class NavMenu extends Component {





  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    let username;
    try {
      username = localStorage.username;
    } catch (e) {

    }


    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm box-shadow mb-3 main-Navbar" container light>
          <img src="https://i.imgur.com/PX3MnjL.png" alt="website logo" style={{width: "15%"}}/>
          <NavbarBrand tag={Link} to="/"><label className="lmsLabel">Learning Management System</label></NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <SimpleSearch autoFocus={false}/>
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                {username  && <label className="usernameLabel">Logged in as {username}</label>}
              </NavItem>
              <NavItem style={{marginTop: "26px", marginRight: "15px"}}>
                {username  && <AccountDropdownMenu/>}
              </NavItem>
              <NavItem >
                {!username  && <NavLink tag={Link} className="text-dark" to="/login"><label className="navbarLabels">Login</label></NavLink>}
              </NavItem>

              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/all-courses"><label className="navbarLabels">Courses</label></NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
