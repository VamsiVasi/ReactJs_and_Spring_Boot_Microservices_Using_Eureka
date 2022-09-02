import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        return (
            <div>
                <footer className="footer">
                    All Rights Reserved 2022 <a href='https://github.com/VamsiVasi' className='underline'>@VamsiVasi</a>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;