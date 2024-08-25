// React hook import
import { useRef } from "react";
// CSS file import
import styles from "./AlbumForm.module.css";

// AlbumForm Component
function AlbumForm({ addAlbum }) {

  const albumNameRef = useRef();

  //Dynamic functions
  const clearInput = () => {
    albumNameRef.current.value = "";
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const albumName = albumNameRef.current.value;

    const album = {
      albumName,
      albumURL: "/assets/cover.jpg"
    }

    addAlbum(album);
    clearInput();
    return;
  }

  return (
    <>
      <div className={styles.albumForm}>
        <span>Create an album</span>
        <form>
          <input required placeholder="Album Name" ref={albumNameRef} />
          <button type="button" onClick={()=>clearInput()}>Clear</button>
          <button onClick={handleAdd}>Create</button>
        </form>
      </div>
    </>
  );
}

export default AlbumForm;
