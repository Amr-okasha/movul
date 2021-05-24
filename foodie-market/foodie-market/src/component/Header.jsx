import React, { Component } from 'react'

class Header extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() { 
        return (
            <div className="bg-primary p-2 row pt-3">
                <div className="col-9"><h1>Foodie Market</h1></div>
                <div className="col-3">
                    <div ><h4>Log-in</h4></div>
                    <div ><h4>Cart-screen</h4></div>
                </div>
                
            </div>
          );
    }
}
 
export default Header;
