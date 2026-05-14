import styles from "./login.module.css";

const Login = () => {
    return (
        <>
            <main id={styles.login}>
                <img className={styles.img_login} src="../imgs/Mulher_login.png" alt="imagem do login" />
                <section className={styles.campo_login}>
                    <div className={styles.campo_form}>
                        <img src="../imgs/logo_login.png" alt="" />
                        <form className={styles.form_login}>
                            <div className={styles.campo_label}>
                                <label htmlFor="email">E-mail</label>
                                <input type="text" name="email" placeholder="email@exemplo.com" required />
                            </div>
                            <div className={styles.campo_label}>
                                <label htmlFor="">Senha</label>
                                <input type="text" name="senha" placeholder="********" required />
                            </div>
                            <button>Entrar</button>
                        </form>
                    </div>
                </section>
            </main>

        </>
    )
}
export default Login;