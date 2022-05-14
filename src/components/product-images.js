import React from "react";

const productImages = (props) => {

    const imageSelection = props.productImagesArray.map(i => {
        return (
            <img src={i.image} alt="product mini-image selection" className="mini-image" onClick={() => {props.imageSelected(i.id)}}></img>
        )
    })

    return (
        <>

            <div className="product-images-container">

                <img alt="Main Product Image" src={props.selectedImage} className="main-product-image" onClick={() => {props.displayOverlay()}}></img>

                <div className="product-image-selection">

                    {imageSelection}

                </div>

            </div>

        </>
    )

}

export default productImages