import styles from "./header.module.css";
import {useState} from "react";
import Link from "next/link";


const Header = () => {
    return(
        <>
            <header>
                <div>
                    <img src="../imgs/Logo_RoyalGames" alt="Logo RoyalGames" id={styles.logo_header} />
                    
                    <a href="">Catalogo</a>

                    <button id={styles.button_Header}>
                        <p>Login</p>
                    </button>

                </div>


            </header>
        
        </>
    )
}
export default Header;