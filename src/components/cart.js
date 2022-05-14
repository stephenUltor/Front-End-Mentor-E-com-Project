import React from "react";

const cartOverlay = (props) => {

    const styles = {
        height: props.cartContents.length > 0 && "auto" 
    }

    const cartStuffs = props.cartContents.map(item => {

        let totalPrice = item.quantity * item.price

        return (
            <div className="item-container">

                <img alt="Cart mini Image" src={item.image} className="cart-mini-image"></img>

                <div className="cart-item-info-container">

                    <p className="cart-item-collection">{item.collection}</p>

                    <p>${item.price} {item.quantity > 1 && <><span>x {item.quantity}</span><span className="final-price"> ${totalPrice}</span></>} </p>

                </div>

                <img alt="Remove Item from cart" src="assets\icon-delete.svg" className="remove-from-cart-icon" onClick={() => { props.removeItemFromCart(item.id) }}></img>



            </div>
        )
    })

    return (
        <>

            <div className="cart-overlay-container" style={styles}>

                <div className="cart-title-container">
                   <h1 className="cart-title">Cart</h1>
                    <img className="cart-exit" alt="cart Exit" src="assets\icon-close.svg" onClick={() => {props.displayCartOverlay()}}></img> 
                </div>

                
                <hr className="cart-line"></hr>

                <div className="cart-contents-container">

                    {props.cartContents.length === 0 ?

                        <h1 className="empty-cart-title">Your cart is empty.</h1>

                        :

                        <>
                            {cartStuffs}
                        </>

                    }

                </div>

                {props.cartContents.length > 0 && <div className="check-out-button" onClick={()=> window.open("https://www.linkedin.com/in/stephen-morrow-73b6b7169/", "_blank")}>Check me out</div>}

            </div>

        </>
    )

}

export default cartOverlay