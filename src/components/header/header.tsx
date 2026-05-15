import styles from "./header.module.css";
import {useState} from "react";
import Link from "next/link";


const Header = () => {
    return(
        <>
            <header id={styles.header}>
                <div className={`${styles.container_banner} layout_guide`}>
                    <img src="../imgs/Logo_Header.png" alt="LogoRoyalGames" className={styles.logo_header} />
                    
                    <div className={styles.header_menu}>
                        <a className={styles.link_header} href="">Catalogo</a>
                        <button className={styles.button_header}>
                            <Link href="/login" className={styles.texto_link}>Login</Link>
                        </button>
                    </div>
                </div>
            </header>
        
        </>
    )
}
export default Header;