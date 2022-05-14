import React from "react";

const ProductDescription = (props) => {

    const savings = Math.trunc((props.sneakerInfo.price / props.sneakerInfo.originalPrice) * 100)

    return (
        <>
            <div className="product-description-container">

                <h1 className="company">{props.sneakerInfo.company}</h1>

                <h2 className="collection">{props.sneakerInfo.collection}</h2>

                <p className="description">{props.sneakerInfo.description}</p>

                <div className="price-and-savings-container">

                    <p className="price">${props.sneakerInfo.price}</p>

                    <div className="savings">{savings}%</div>

                </div>

                <p className="original-price"><s>${props.sneakerInfo.originalPrice}</s></p>

                <div className="button-container">

                    <div className="quantity-selector">

                        <img className="subtract-button" alt="subtract one from product quantity" src="assets\icon-minus.svg" onClick={() => {props.subtractOne()}}></img>

                        <p>{props.productQuantity}</p>

                        <img className="add-button" alt="add one to product quantity" src="assets\icon-plus.svg" onClick={() => {props.addOne()}}></img>

                    </div>

                    <div className="add-to-cart-button" onClick={() => {props.addToCart()}}>

                        <img className="cart-on-cart-button" alt="Cart" src="assets\icon-cart.svg"></img>

                        <p>Add to Cart</p>

                    </div>

                </div>

            </div>
        </>
    )

}

export default ProductDescription