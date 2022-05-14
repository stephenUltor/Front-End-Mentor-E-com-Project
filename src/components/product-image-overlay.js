import React from "react";

const productImageOverlay = (props) => {

    const imageSelection = props.productImagesArray.map(i => {
        return (
            <img src={i.image} alt="product mini-image selection" className="mini-image-overlay"></img>
        )
    })

    return (
        <>

            <div className="product-images-overlay">

                <div className="product-images-container-overlay">

                    <img className="overlay-exit" alt="overlay Exit" src="assets\icon-close.svg" onClick={() => {props.displayOverlay()}}></img>

                    <img alt="Main Product Image" src={props.selectedImage} className="main-product-image-overlay"></img>

                    <div className="carousel-buttons-container-overlay">

                    <div className="carousel-button-background-overlay" onClick={() => {props.handlePrevClick()}}>
                        <img alt="previous image button" src="assets\icon-previous.svg" className="previous-button" onClick={() => {props.handlePrevClick()}}></img>
                    </div>

                    <div className="carousel-button-background-overlay" onClick={() => {props.handleNextClick()}}>
                        <img alt="previous image button" src="assets\icon-next.svg" className="previous-button" onClick={() => {props.handleNextClick()}}></img>
                    </div>

                </div>

                    <div className="product-image-selection-overlay">

                        {imageSelection}

                    </div>

                </div>

            </div>



        </>
    )

}

export default productImageOverlay