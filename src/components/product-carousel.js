import React from "react";

const ProductImagesCarousel = (props) => {

    return (
        <>

            <div className="product-images-container">


                <img alt="Main Product Image" src={props.selectedImage} className="main-product-image"></img>

                <div className="carousel-buttons-container">

                    <div className="carousel-button-background">
                        <img alt="previous image button" src="assets\icon-previous.svg" className="previous-button" onClick={() => {props.handlePrevClick()}}></img>
                    </div>

                    <div className="carousel-button-background">
                        <img alt="previous image button" src="assets\icon-next.svg" className="previous-button" onClick={() => {props.handleNextClick()}}></img>
                    </div>

                </div>


            </div>

        </>
    )

}

export default ProductImagesCarousel