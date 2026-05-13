import styles from "./login.module.css";

const Login = () => {
    return (
        <>
            <main id={styles.login}>
                <img className={styles.img_login} src="../imgs/Mulher_login.png" alt="imagem do login" />
                <section>
                    <div className={styles.form_login} >

                        <img src="../imgs/Logo_Header.png" alt="" />
                        <div>
                            <label htmlFor="email">E-mail</label>
                            <input type="text" name="email" placeholder="email@exemplo.com" required />
                        </div>
                        <div>
                            <label htmlFor="">Senha</label>
                            <input type="number" name="senha" placeholder="********" required />
                        </div>
                        <a href="">Esqueceu sua senha?</a>
                        <button>Entrar</button>
                    </div>
                </section>
            </main>

        </>
    )
}
export default Login;