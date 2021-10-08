import React from 'react'
import {ReactNavbar} from "overlay-navbar"
import './style.css'
import logo from '../../images/logo.png'

const options = {
    burgerColorHover: "#1393fc",
    logo,
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#fff",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#1393fc",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "#1393fc",
    searchIconColorHover: "#1393fc",
    cartIconColorHover: "#1393fc",
    cartIconMargin: "1vmax",
};


function Header() {
    return (
        <ReactNavbar {...options} />
    )
}

export default Header
