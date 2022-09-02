import React, { Component } from 'react';
import github from '../assets/github.png'
import home from '../assets/home.png';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-dark bg-dark">
                        <a href='http://localhost:3000'><img className='navbar-images' src={home}></img></a>
                        <a href='https://github.com/VamsiVasi'><img className='navbar-images' src={github}></img></a>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;