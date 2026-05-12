import styles from "./login.module.css";

const Login = () => {
    return(
        <>
            <div>
                <img src="Mulher_login" alt="" />
                <section>
                    <img src="" alt="" />
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input type="text" name="email" placeholder="email@exemplo.com" required />
                    </div>
                    <div>
                        <label htmlFor="">Senha</label>
                        <input type="number" name="senha" placeholder="********" required/>
                    </div>
                    <a href="">Esqueceu sua senha?</a>
                    <button>Entrar</button>
                </section>
            </div>

        </>
    )
}
export default Login;