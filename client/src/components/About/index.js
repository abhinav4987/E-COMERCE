import React from 'react'
import { Button, Typography, Avatar } from "@material-ui/core";
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import './style.css';

function About() {
    return (
        <div className="about_main">
            <div></div>
            <div className="about_main_gradient"></div>
            <div className="about_main_container">
                <Typography component="h1">About Us</Typography>
                <div>
                    <div>
                        <Avatar 
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/dfwfghwgo/image/upload/v1633880106/profile/IMG_20211008_160202_rhirf3.jpg"
                            alt="Founder"
                        />
                        <Typography>Abhinav Anand</Typography>
                        <Button  color="primary">
                        Visit Instagram
                        </Button>
                        <span>
                            This is a sample wesbite made by @meabhisingh. Only with the
                            purpose to teach MERN Stack on the channel 6 Pack Programmer
                        </span>
                    </div>
                    <div className="about_main_container2" >
                        <Typography component="h2">Our Brands</Typography>
                        <a target="blank" href="https://twitter.com/abhinav4987">
                            <TwitterIcon className="twitterSvgIcon" />
                        </a>
                        <a href="https://instagram.com/its_abhinav.a" target="blank">
                        <InstagramIcon className="instagramSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
