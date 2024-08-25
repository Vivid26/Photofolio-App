import { useEffect, useState } from "react";
import styles from "./Carousel.module.css";

function Carousel({images,setCarouselShow , imageIndex, setImageIndex}) {
    const [image,getImage]=useState(images[imageIndex]);

    useEffect(()=>{
        if(images&&imageIndex>=0 && imageIndex<images.length){
            getImage(images[imageIndex]);
        }
    },[imageIndex,images]);


    return (
        <div className={styles.carousel}>
            <button onClick={()=>setCarouselShow(false)}>x</button>
            <button onClick={()=>setImageIndex(imageIndex===0?images.length-1:imageIndex-1)}>&lt;</button>
            <img src={image.imageURL} alt={image.imageName}/>
            <button onClick={()=>setImageIndex(imageIndex===images.length-1? 0 :imageIndex+1)}>&gt;</button>
        </div>
    );
  }
  
  export default Carousel;
  