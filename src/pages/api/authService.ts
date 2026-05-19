import {api} from "./api";
import secureLocalStorage from "react-secure-storage";

export async function login(email: string, senha: string){
    try{
        const response = await api.post("Autenticacao/login",{email, senha})
        console.log("fi da mae nao era isso")
        console.log(response.data.token)
        const token = response.data.token;

        secureLocalStorage.setItem("tokenUsuario", token);

    }catch(error:any){
        throw new Error("Email ou senha invalidos");
    }
}