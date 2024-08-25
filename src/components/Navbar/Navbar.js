import styles from "./Navbar.module.css";
import logo from "../../ImageAssets/photo1.png"

function Navbar() {
  return (
    <h1>
      <div className={styles.navbar}>
        <div className={styles.navbar_logo}>
          <img src={logo} alt="logo" />
          <span>PhotoFolio</span>
        </div>
      </div>
    </h1>
  );
}

export default Navbar;
