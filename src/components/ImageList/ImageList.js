import { useRef, useState } from "react";

//Components imports
import Carousel from "../Carousel/Carousel";
import ImageForm from "../ImageForm/ImageForm";

//CSS imports
import styles from "./ImageList.module.css";

//Third Party Component
import FileSaver from 'file-saver';

//Images imports

import edit from "../../ImageAssets/edit.png"
import searchImg from "../../ImageAssets/search.png"
import backArrow from "../../ImageAssets/back.png"
import clear from "../../ImageAssets/clear.png"
import download from "../../ImageAssets/download.png"
import trash from "../../ImageAssets/trash-bin.png"



// ImageList Component
export default function ImageList({ albumName, images, setOpenAlbum, setAlbum, addImage, removeImage, updateImage}) {
    // Hooks
    const [showImageForm, setShowImageForm] = useState(false);

    const [carouselShow, setCarouselShow] = useState(false);
    const [carouselImageIndex, setCarouselImageIndex] = useState(0);

    const [imageToEdit, setImageToEdit] = useState({});

    const [search, setSearch] = useState(false);
    const [searchCollection, setSearchCollection] = useState([]);
    const searchRef = useRef();

    // Dynamic functions
    const handleEdit = (image) => {
        if (image && image.title) {
            setImageToEdit(image);
        }
        setCarouselShow(false);
        setShowImageForm(true)
    }

    const handleRemove = (image) => {
        if (image && image.title) {
            removeImage(image.id);
        }
        setCarouselShow(false);
    }

    const handleCarousel = (index) => {
        setCarouselImageIndex(index);
        setCarouselShow(true)
    }

    const handleBack = () => {
        setOpenAlbum(false);
        setAlbum({albumName:"",albumImages:[]});
    }

    const searchClick = () => {
        setSearch(true);
        setSearchCollection(images);
    }

    const handleSearch = () => {
        let searchTitle = searchRef.current.value;
        const len = searchTitle.length;
        const filterData = images.filter((image) => image.title.slice(0, len).toLowerCase() === searchTitle.toLowerCase());
        filterData.length ? setSearchCollection(filterData) : (<h2>No images found.</h2>);
    }

    const handleClear = () => {
        setSearch(false);
    }

    const handleCancel = () => {
        setShowImageForm(false)
        setImageToEdit({});
    }

    // Component Boilerplate
    return (
        <>
            {   /** ImageForm component should display based on showImageForm state */
                showImageForm && 
                <ImageForm albumName={albumName} 
                            addImage={addImage} 
                            updateImage={updateImage} 
                            imageToEdit={imageToEdit} 
                            setImageToEdit={setImageToEdit}  
                            setShowImageForm={setShowImageForm} 
                />
            }

            {   /** Carousel component should be displayed based on carouselShow state */
                carouselShow && 
                <Carousel images={images} 
                            setCarouselShow={setCarouselShow} 
                            imageIndex={carouselImageIndex} 
                            setImageIndex={setCarouselImageIndex} 
                />
            }

            {/** ImageList components header */}

            <div className={styles.top}>
                <span>
                    <img src={backArrow} alt="back" onClick={handleBack}></img>
                </span>
                
                {
                    images && images.length ? 
                    <h3>Images in the {albumName} Album</h3> : 
                    <h3>No images found in the {albumName} album.</h3>
                }
                
                {/** Input for search an Image */}
                <div className={styles.search}>
                    {
                        search &&
                        <input placeholder="Search" ref={searchRef} onChange={handleSearch} />
                    }
                    {
                        !search ? 
                        <img src={searchImg} alt="search" onClick={searchClick} /> : 
                        <img src={clear} alt="clear" onClick={handleClear} />
                    }
                </div>
                
                {/** Button to add an Image */}
                {
                    !showImageForm ?
                    <button className="false" onClick={() => setShowImageForm(true)}>Add image</button> : 
                    <button className="false" onClick={handleCancel}>Cancel</button>
                }

            </div>

            {/** Images Listing */}
            <div className={styles.imageList}>
                {
                    search && searchCollection.map((image, index) => (
                        <ListItem key={index} 
                                image={image} 
                                index={index} 
                                handleEdit={handleEdit} 
                                handleRemove={handleRemove} 
                                handleCarousel={handleCarousel} 
                        />
                    ))
                }
                {
                    !search && images.map((image, index) => (
                        <ListItem key={index} 
                                image={image} 
                                index={index} 
                                handleEdit={handleEdit} 
                                handleRemove={handleRemove} 
                                handleCarousel={handleCarousel} 
                        />
                    ))
                }
            </div>
        </>
    );
}

const ListItem = ({ index, image, handleEdit, handleRemove, handleCarousel }) => (
    
    <div className={styles.image}>
        {/** Update image option */}
        <div className={styles.update}>
            <img src={edit} alt="update" onClick={() => handleEdit(image)} />
        </div>

        {/** Remove image option */}
        <div className={styles.delete}>
            <img src={trash} alt="delete" onClick={() => handleRemove(image)} />
        </div>

        {/** Image in the listing */}
        <img src={image.imageURL} alt={image.title} onClick={() => handleCarousel(index)} />
        
        {/** Download image link */}
        <div className={styles.download}>
            <div>{image.title}</div>
            <img src={download} alt="download" onClick={() => FileSaver.saveAs(image.imageURL, image.title)}></img>
        </div>

    </div>
);


