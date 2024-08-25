// React hooks import
import { useEffect, useState } from "react";

//Components 
import AlbumForm from "../AlbumForm/AlbumForm";
import ImageList from "../ImageList/ImageList";

//CSS file
import styles from "./AlbumList.module.css";


// AlbumList Component
function AlbumList({ albums, images, addAlbum, addImage, removeAlbum, removeImage, updateImage }) {
    //hooks
    const [album, setAlbum] = useState({albumName:"",albumImages:[]})
    const [showAlbumForm, setShowAlbumForm] = useState(false);
    const [openAlbum, setOpenAlbum] = useState(false);

    useEffect(() => {
        if (album && album.albumName) {
            const filteredImages = images.filter((image) => image.albumName === album.albumName);
            setAlbum({albumName:album.albumName, albumImages:filteredImages});
        }
    }, [album.albumName, images])


    // Dynamic functions
    const handleClick = (index) => {
        setOpenAlbum(true);
        const { albumName } = albums[index];
        setAlbum({albumName:albumName,albumImages:album.albumImages});
    }

    return (
        <>
            {
                // AlbumForm should displayed based on showAlbumForm state
                showAlbumForm && <AlbumForm addAlbum={addAlbum} />
            }
            {
                !openAlbum && 
                <div>
                    {/**Header of Albums List */}
                    <div className={styles.top}>
                        <h3>Your albums</h3>
                        {
                            !showAlbumForm ?
                                <button className={styles.false} onClick={() => setShowAlbumForm(true)}>Add album</button> :
                                <button className={styles.false} onClick={() => setShowAlbumForm(false)}>Cancel</button>
                        }
                    </div>

                    {/** Album List */}
                    <div className={styles.albumsList}>
                        {albums.map((album, index) => (
                            <div key={index} className={styles.album} onClick={() => { handleClick(index) }}>
                                <img src={album.albumURL} alt={album.albumName} />
                                <span>{album.albumName}</span>
                            </div>
                        ))}
                    </div>
                </div>
            }

            {
                // Images in the particular album will be displayed by ImageList component 
                openAlbum && 
                <ImageList albumName={album.albumName} 
                        images={album.albumImages} 
                        setAlbum={setAlbum} 
                        setOpenAlbum={setOpenAlbum} 
                        addImage={addImage} 
                        removeImage={removeImage} 
                        updateImage={updateImage} 
                />
            }
        </>
    );
}

export default AlbumList;
