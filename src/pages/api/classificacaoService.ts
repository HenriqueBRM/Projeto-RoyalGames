import { api } from "./api";

export async function cadastrarClassficacaoIndicativa(nome: string) {
    try{
        await api.post("ClassificacaoIndicativa",{nome});
    }catch(error:any){
        throw new Error(error.response.data);                                              
    }   
}
export async function listarClassificacaoIndicativa(){
    try{
        const response = await api.get("ClassificacaoIndicativa");
        return response;
    }catch(error:any){
        throw new Error(error.response.data);
    }
}