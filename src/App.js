//React hooks import
import { useReducer, useEffect, useState } from "react";

//Components imports
import AlbumList from "./components/AlbumList/AlbumList";
import Navbar from "./components/Navbar/Navbar";

//CSS file
import styles from "./App.module.css";

// React toasts
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Spinner
import Spinner from 'react-spinner-material';

// firebase imports
import {
  doc,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  getDocs
} from "firebase/firestore";

// Cloud Firestore instance
import { db } from "./firebaseInit";


// The main App Component
export default function App() {
  // hooks
  const [state, dispatch] = useReducer(reducer, { albums: [], images: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAlbumsAndImages();
  }, []);

  // Functions to perform CRUD operations
  
  /** Function to retrive albums and images from firestore */
  const getAlbumsAndImages = async () => {
    const albumsSnapShot =await getDocs(collection(db, "albums"));
    const imagesSnapShot =await getDocs(collection(db, "images"));

    const albums = albumsSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    const images = imagesSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    dispatch({ type: "GET_STATE_DATA", payload: { albums,images } });
    setLoading(false);
    toast.success("All albums & photos retrived successfully.");
  }

  /** Function to add new album to albums collection */
  const addAlbum = async (album) => {
    const albumsRef = collection(db, "albums");
    const docRef = await addDoc(albumsRef, album);
    dispatch({ type: "ADD_ALBUM", payload: { id: docRef.id, ...album } });
    toast.success("Album added successfully.");
  }

  /** Function to remove album from albums collection */
  const removeAlbum = (id) => {
    dispatch({ type: "REMOVE_ALBUM", payload: { id } });
    toast.success("Album removed successfully.");
  }

  /** Function to add new image to images collection */
  const addImage = async (image) => {
    const imagesRef = collection(db, "images");
    const docRef = await addDoc(imagesRef, image);
    dispatch({ type: "ADD_IMAGE", payload: { id: docRef.id, ...image } });
    toast.success("Photo added successfully.");
  }

  /** Function to remove image from images collection */
  const removeImage = async (id) => {

    await deleteDoc(doc(db, "images", id));

    dispatch({ type: "REMOVE_IMAGE", payload: { id } });
    toast.success("Photo removed successfully.");
  }

  /** Function to update image*/
  const updateImage = async (image) => {
    const updateRef = doc(db, "images", image.id);
    await updateDoc(updateRef, {
      ...image
    });

    dispatch({ type: "UPDATE_IMAGE", payload: { image } });
    toast.success("Photo updated successfully.");
  }


  console.log("I am state => ", state);

  // Component structure
  return (
    <>
      <ToastContainer />
      {/** Navbar Component of the web page */}
      <Navbar />
      <div className={styles.App_content}>
        {/** Spinning until data is available and fetching from database */}
        <div>
          <Spinner className={styles.loading} radius={120} color={"#00CCFF"} stroke={2} visible={loading} />
        </div>
        
        {/** List of albums */}
        {
          !loading &&
          <AlbumList albums={state.albums}
          images={state.images}
          addAlbum={addAlbum}
          addImage={addImage}
          removeAlbum={removeAlbum}
          removeImage={removeImage}
          updateImage={updateImage}
        />
        }
        
      </div>
    </>

  );
}


// Reducer function for useReducer hook
const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    
    case "GET_STATE_DATA": {
      return {
        albums: [...payload.albums],
        images: [...payload.images]
      };
    }

    case "ADD_ALBUM": {
      return {
        albums: [payload,...state.albums],
        images: state.images,
      };
    }
    case "ADD_IMAGE": {

      return {
        albums: state.albums,
        images: [payload,...state.images],
      };
    }
    case "REMOVE_ALBUM": {
      return {
        albums: state.albums.filter((album) => album.id !== payload.id),
        images: state.images,
      };
    }
    case "REMOVE_IMAGE": {
      return {
        albums: state.albums,
        images: state.images.filter((image) => image.id !== payload.id),
      };
    }
    case "UPDATE_IMAGE": {
      const index = state.images.findIndex((image) => image.id === payload.image.id);
      if (index >= 0) {
        state.images[index] = payload.image;
      }

      return {
        albums: state.albums,
        images: [...state.images],
      };
    }

    default:
      return state;
  }
};









/**
 * Real time updates functions
 * 
 * 
 * const getAlbums = async () => {
    const unsub = onSnapshot(collection(db, "albums"), (snapshot) => {
      const albums = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch({ type: "GET_ALBUMS", payload: { albums } });
      setLoading(false);
      toast.success("Albums retrived successfully.");
    });
  }

  const getImages = async () => {
    const unsub = onSnapshot(collection(db, "images"), (snapshot) => {
      const images = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      dispatch({ type: "GET_IMAGES", payload: { images } });
      setLoading(false);
      toast.success("All photos retrived successfully.");
    });
  }

  
    case "GET_ALBUMS": {
      return {
        albums: [...payload.albums],
        images: state.images
      };
    }

    case "GET_IMAGES": {
      return {
        albums: state.albums,
        images: [...payload.images]
      };
    }

 */