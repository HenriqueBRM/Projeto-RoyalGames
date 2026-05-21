import styles from "./footer.module.css"

const Footer = () => {
    return (
        <>
            <footer id={styles.footer}>
                <div className={`${styles.container_footer} layout_guide`} >

                    <img src="../imgs/LogoRoyalGames.png" alt="" className={styles.img_footer} />

                    <div className={styles.menu_footer}>
                        <p>royalgames@email.com</p>
                        <p>(11)99999-9999</p>
                        <p>@RoyalGames</p>
                    </div>

                </div>
            </footer>
        </>
    )
}
export default Footer;