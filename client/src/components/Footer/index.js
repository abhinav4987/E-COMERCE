import React from "react";
import logo from '../../images/logo.png';
import "./style.css"

function Footer() {
    return (
        <footer>
            <div className="footer-nav">
                <div className="footer-div-header">
                    Menu
                </div>
                <span className="footer-nav_items">Home</span>
                <span className="footer-nav_items">Products</span>
                <span className="footer-nav_items">Contact</span>
                <span className="footer-nav_items">About</span>
            </div>
            
            <img className="footer-logo" src={logo}></img>
            
            <div className="footer-social">
                <div className="footer-div-header">
                    Social
                </div>
                <a className="footer-social_items social-instgram">Instagram</a>
                <a className="footer-social_items social-facebook">Facebook</a>
                <a className="footer-social_items social-twitter">Twitter</a>
            </div>
        </footer>
    )
}

export default Footer
