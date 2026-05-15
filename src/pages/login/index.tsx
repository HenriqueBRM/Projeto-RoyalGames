import styles from "./login.module.css";
import {useState} from "react";
import {login} from "../api/authService";
import {useRouter} from "next/navigation";
import {erro, notificacao} from "@/src/utils/toast";


const Login = () => {

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    const router = useRouter();

    async function autenticar(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        try{
            await login(email,senha);
            notificacao("Bem-vindo ao RoyalGames")
            setTimeout(() => {
                router.push("/home");
            }, 2000)
        }catch(error:any){
            erro(error.message)
        }
    }
    console.log(email);
    console.log(senha);

    return (
        <>
            <main id={styles.login}>
                <img className={styles.img_login} src="../imgs/Mulher_login.png" alt="imagem do login" />
                <section className={styles.campo_login}>
                    <div className={styles.campo_form}>
                        <img src="../imgs/logo_login.png" alt="" />
                        <form className={styles.form_login} onSubmit={autenticar}>
                            <div className={styles.campo_label}>
                                <label htmlFor="email">E-mail</label>
                                <input type="text" name="email" placeholder="email@exemplo.com" required 
                                value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className={styles.campo_label}>
                                <label htmlFor="">Senha</label>
                                <input type="password" name="senha" placeholder="********" required 
                                value={senha} onChange={(e) => setSenha(e.target.value)}/>
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