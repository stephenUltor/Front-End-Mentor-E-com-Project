import React from "react";

const Navbar = (props) => {

    const styles = {
        height: props.hamMenu ? "100%" : "0"
    }

    return (

        <>

            <nav>

                <div className="nav-left">

                    <img alt="Hamburger Menu Button" src="assets\icon-menu.svg" className="ham-bttn" onClick={() => { props.hamMenuClick() }}></img>

                    <img alt="Sneakers Logo" src="assets\logo.svg"></img>

                    <ul className="nav-links-list">
                        <li><a>Collections</a></li>
                        <li><a>Men</a></li>
                        <li><a>Women</a></li>
                        <li><a>About</a></li>
                        <li><a>Contact</a></li>
                    </ul>

                </div>

                <div className="nav-right">

                    <div className="cart-icon-container">
                        <div className="cart-holding-quantity">{props.cartHoldingQuantity}</div>
                        <img className="cart-icon" alt="Cart" src="assets\icon-cart.svg" onClick={() => { props.displayCartOverlay() }}></img>
                    </div>

                    

                    <img className="avatar" alt="User Profile image" src={props.profileImage}></img>

                </div>

            </nav>

            <div className="hamburger-menu" style={styles}>

                {props.hamMenu &&

                    <>
                        <ul className="ham-links-list">
                            <li><a>Collections</a></li>
                            <li><a>Men</a></li>
                            <li><a>Women</a></li>
                            <li><a>About</a></li>
                            <li><a>Contact</a></li>
                        </ul>

                        <img className="ham-menu-exit" alt="Hamburger Menu Exit" src="assets\icon-close.svg" onClick={() => { props.hamMenuClick() }}></img>
                    </>

                }

            </div>



        </>

    )

}

export default Navbar