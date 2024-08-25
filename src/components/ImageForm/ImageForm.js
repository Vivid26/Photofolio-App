// React hooks import
import { useEffect, useRef } from "react";

// CSS file import
import styles from "./ImageForm.module.css";

//ImageForm Component
function ImageForm({ albumName, addImage, updateImage, imageToEdit, setImageToEdit, setShowImageForm }) {

    const titleRef = useRef();
    const imageURLRef = useRef();

    useEffect(() => {
        if (imageToEdit.title && imageToEdit.imageURL) {
            titleRef.current.value = imageToEdit.title;
            imageURLRef.current.value = imageToEdit.imageURL;
        }
    }, [imageToEdit])

    //Dynamic functions
    const clearInput = () => {
        titleRef.current.value = "";
        imageURLRef.current.value = "";
    };

    const handleAddOrUpdate = (e) => {
        e.preventDefault();

        const title = titleRef.current.value;
        const imageURL = imageURLRef.current.value;

        //Performs image update operation
        if (imageToEdit && imageToEdit.title) {
            const image = {...imageToEdit, title, imageURL, albumName }
            updateImage(image);   
        } else {
            //Performs create/add an image operation.
            const image = { title, imageURL, albumName };
            addImage(image);
        }

        clearInput();
        setImageToEdit({});
        setShowImageForm(false);
        return;
    }

    return (
        <div className={styles.imageForm}>
            <span>Add image to {albumName} Album</span>
            <form>
                <input required placeholder="Title" ref={titleRef} />
                <input required placeholder="Image URL" ref={imageURLRef} />
                
                <div className={styles.actions}>
                    <button type="button" onClick={()=>clearInput()}>Clear</button>
                    {
                        imageToEdit && imageToEdit.title ?
                        <button onClick={handleAddOrUpdate}>Update</button>:
                        <button onClick={handleAddOrUpdate}>Add</button>
                    }
                </div>
            </form>
        </div>
    );
}

export default ImageForm;
