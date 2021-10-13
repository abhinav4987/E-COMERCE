import React from 'react'
import { Button } from "@material-ui/core";
import './style.css'

function Contact() {
    return (
        <div className="contactContainer">
        <a className="mailBtn" href="mailto:abhinavanand4987@gmail.com">
            <Button>Contact: abhinavanand4987@gmail.com</Button>
        </a>
    </div>
    )
}

export default Contact
