import React, { useState, useEffect } from "react"
import Navbar from "./components/navbar";
import ProductImages from "./components/product-images"
import ProductDescription from "./components/product-description"
import ProductImagesCarousel from "./components/product-carousel";
import ProductImageOverlay from "./components/product-image-overlay";
import CartOverlay from "./components/cart"
import { nanoid } from 'nanoid'


function App() {

  // To better simulate an actual website I put images into a state to act as a sort of fake pull from a database for a more dynamic experience. 

  const [profileImage, setProfileImage] = useState("assets/image-avatar.png")

  const [productImagesArray, setProdcutImagesArray] = useState(["assets/image-product-1-thumbnail.jpg", "assets/image-product-2-thumbnail.jpg", "assets/image-product-3-thumbnail.jpg", "assets/image-product-4-thumbnail.jpg"])

  const [sneakerInfo, setSneakerInfo] = useState({
    company: "SNEAKER COMPANY",
    collection: "Fall Limited Edition Sneakers",
    description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
    price: "125.00",
    originalPrice: "250.00",
    itemID: "itemID",
    miniPics: ["assets/image-product-1-thumbnail.jpg", "assets/image-product-2-thumbnail.jpg", "assets/image-product-3-thumbnail.jpg", "assets/image-product-4-thumbnail.jpg"]
  })

  // Dynamic Values:

  const [selectedImage, setSelectedImage] = useState("assets/image-product-1.jpg") //Set Main Image display

  const [hamMenu, setHamMenu] = useState(false)//Display Hamburger Menu

  const [productQuantity, setProductQuantity] = useState(1)//Determine amout of product to put in cart

  const [carouselCount, setCarouselCount] = useState(1)//Track Carousel Image

  const [overlay, setOverlay] = useState(false)//Display product image Overlay

  const [cartHoldingQuantity, setCartHoldingQuantity] = useState(0)//number of items cart is holding 

  const [cartOverlay, setCartOverlay] = useState(false)//display cart overlay

  const [cartContents, setCartContents] = useState([])//All items in cart

  //Open or close Ham Menu
  const handleHamClick = () => {
    setHamMenu(!hamMenu)
    setCartOverlay(false)
  }

  //Use the same state (setSelectedImage) as the mini-image selection so when you resize back it stays on what image you were looking at. 
  //Carousel previous button Handler
  const handlePrevClick = () => {
    if (carouselCount === 4) {
      setCarouselCount(1)
    } else {
      setCarouselCount(carouselCount + 1)
    }
  }

  //Carousel Next button Handler
  const handleNextClick = () => {
    if (carouselCount === 1) {
      setCarouselCount(4)
    } else {
      setCarouselCount(carouselCount - 1)
    }
  }

  //Track CarouselCount to determine what image to display
  useEffect(() => {
    if (carouselCount === 1) {
      setSelectedImage("assets/image-product-1.jpg")
    } else if (carouselCount === 2) {
      setSelectedImage("assets/image-product-2.jpg")
    } else if (carouselCount === 3) {
      setSelectedImage("assets/image-product-3.jpg")
    } else if (carouselCount === 4) {
      setSelectedImage("assets/image-product-4.jpg")
    }
  }, [carouselCount])

  //handle product quantity button - add one
  const addOneProduct = () => {
    setProductQuantity(productQuantity + 1)
  }

  //handle product quantity button - subtract one if quant is > 0
  const subtractOneProduct = () => {

    if (productQuantity === 0) {
      setProductQuantity(0)
    } else {
      setProductQuantity(productQuantity - 1)
    }

  }

  //Track Window size for dynamic rendering of carousel, Ham Menu, and Cart. 
  function useWindowSize() {

    const [size, setSize] = useState(window.innerWidth)

    useEffect(() => {

      const handleResize = () => {
        setSize([window.innerWidth])
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
      }

    }, [])
    return size;
  }

  //store window width inside of variable
  let windowWidth = useWindowSize()

  //track windowWidth to dynamicly render Ham Menu
  useEffect(() => {
    if (windowWidth > 900) {
      setHamMenu(false)
    }
  }, [windowWidth])

  //track windowWidth to dynamicly render overlay
  useEffect(() => {
    if (windowWidth < 900) {
      setOverlay(false)
    }
  }, [windowWidth])

  //display overlay
  const displayOverlay = () => {
    setOverlay(!overlay)
  }

  //display cart overlay
  const displayCartOverlay = () => {
    setCartOverlay(!cartOverlay)
  }

  //on Page load or mount reconfigure product Image array data to include image address, isSelected, and an id for switching main image display 
  useEffect(() => {
    const images = productImagesArray.map(i => {
      return (
        {
          image: i,
          id: { nanoid },
          isSelected: false
        }
      )
    })
    setProdcutImagesArray(images)
  }, [])

  //handle main image display change via mini-image selection using product image id and isSelected values
  function imageSelected(id) {
    setProdcutImagesArray(oldProductImagesArray => oldProductImagesArray.map(image => {

      if (id === image.id) {

        if (image.image === "assets/image-product-1-thumbnail.jpg") {
          setSelectedImage("assets/image-product-1.jpg")
        } else if (image.image === "assets/image-product-2-thumbnail.jpg") {
          setSelectedImage("assets/image-product-2.jpg")
        } else if (image.image === "assets/image-product-3-thumbnail.jpg") {
          setSelectedImage("assets/image-product-3.jpg")
        } else if (image.image === "assets/image-product-4-thumbnail.jpg") {
          setSelectedImage("assets/image-product-4.jpg")
        }

        return ({ ...image, isSelected: !image.isSelected })

      } else {
        return ({ ...image, isSelected: false })
      }

    }))

  }

  //update number of products cart is holding by the number of items selected when add to cart button is pressed 
  const addToCart = () => {
    setCartHoldingQuantity(cartHoldingQuantity + productQuantity)
    setProductQuantity(1)
    addItemToCart()
  }

  //If nothing in cart, add new item to cart, if product already in cart, add to quantity of item (better simulates actual data manipulation)
  const addItemToCart = () => {

    let existingProduct = false

    const itemInfo = {
      image: sneakerInfo.miniPics[0],
      collection: sneakerInfo.collection,
      price: sneakerInfo.price,
      id: sneakerInfo.itemID,
      quantity: productQuantity
    }

    for(let item of cartContents){
      if(item.id === sneakerInfo.itemID){
        setCartContents([{...item, quantity: item.quantity + productQuantity}])
        existingProduct = true
      }else{
        setCarouselCount(cartContents.concat([...item]))
      }
    }

    if(existingProduct === false){
      setCartContents(cartContents.concat([itemInfo]))
    }
    
  }

  //filter through cart contents, if ID is the same as the id from the product being removed, remove product and return new contents. also reconfigure
  //quantity to new quantity. I'm pretty sure this would work, but had trouble testing it with only one product. In this senario I am treating the
  //sneaker info state as an outside data file so other products would have other sneakerInfo.itemID's. 
  const removeItemFromCart = (id) => {

    let newQuantity = 0
    
    let newCartContents = cartContents.filter(item => {
      return item.id !== id
    })

    for(let item of newCartContents){
      newQuantity = newQuantity + item.quantity
    }

    setCartContents(newCartContents)
    setCartHoldingQuantity(newQuantity)
  }

  return (

    <>

      {(overlay && windowWidth > 900) && <ProductImageOverlay
        displayOverlay={displayOverlay}
        selectedImage={selectedImage}
        productImagesArray={productImagesArray}
        handlePrevClick={handlePrevClick}
        handleNextClick={handleNextClick}
      />}

      <Navbar
        displayCartOverlay={displayCartOverlay}
        cartHoldingQuantity={cartHoldingQuantity}
        profileImage={profileImage}
        hamMenuClick={handleHamClick}
        hamMenu={hamMenu}
      />

      {cartOverlay && <CartOverlay
        displayCartOverlay={displayCartOverlay}
        cartContents={cartContents}
        removeItemFromCart={removeItemFromCart}
      />}

      <div className="product-container">

        {
          windowWidth > 400 ?

            <ProductImages
              selectedImage={selectedImage}
              productImagesArray={productImagesArray}
              imageSelected={imageSelected}
              displayOverlay={displayOverlay}
            />

            :

            <ProductImagesCarousel
              selectedImage={selectedImage}
              handlePrevClick={handlePrevClick}
              handleNextClick={handleNextClick}
            />
        }

        <ProductDescription
          addToCart={addToCart}
          sneakerInfo={sneakerInfo}
          addOne={addOneProduct}
          subtractOne={subtractOneProduct}
          productQuantity={productQuantity}
        />

      </div>

    </>

  )

}

export default App;
