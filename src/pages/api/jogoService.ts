import {api} from "./api";

// base para cadastro de produtos
type JogoFormulario = {
    nome: string,
    preco: string,
    descricao: string,
    imagem: File | null,
    generoID: number[],
    plataformaID: number[],
    classificacaoId: number,
}

interface JogoListagem {
    nome: string,
    preco: string,
    descricao: string,
    imagemUrl: string,
    statusJogo: boolean,
    generoID: number[],
    plataformaID: number[],
    classificacaoId: number,
}

export async function cadastrarJogo(dados: JogoFormulario){
    try{
        const formData = new FormData();

        formData.append("nome", dados.nome);
        formData.append("descricao", dados.descricao);
        formData.append("preco", dados.preco);
        if (dados.imagem)
            formData.append("imagem", dados.imagem);

        dados.generoID.forEach((id) =>
            formData.append("generoID", id.toString()));
        
        dados.plataformaID.forEach((id)=> 
            formData.append("plataformaID", id.toString()));
        
        formData.append("classificacaoId", dados.classificacaoId.toString());

        await api.post("Jogo", formData);
        console.log("Jogo cadastrado com sucesso")

    }catch(error:any){
        throw new Error(error.response.data);
    }
}

export async function listarJogo(){
    try{
        const response = await api.get("Jogo");
        const jogosAtivos = response.data.filter(
            (jogo: JogoListagem) => jogo.statusJogo === true
        );
        const jogos = jogosAtivos.map((jogo: JogoListagem)=> ({
            ...jogo,
            imagemUrl: `${api.defaults.baseURL}${jogo.imagemUrl}`
        }))
        return jogos;
    }catch(error: any){
        throw new Error(error.message)
    }
}

export async function listarPorId(id:number){
    try{
        const response = await api.get("Jogo/" + id);

        const jogo = {...response.data,
            imagemUrl: `${api.defaults.baseURL}${response.data.imagemUrl}`
        };
        
        return jogo;

    }catch(error:any){
        throw new Error(error.response.data)
    }
}
export async function editarJogo(jogoId: number, dados: JogoFormulario){
    try{
        const formData = new FormData();
        
        formData.append("nome", dados.nome);
        formData.append("descricao", dados.descricao);
        formData.append("preco", dados.preco);
        if(dados.imagem)
            formData.append("imagem", dados.imagem);
        
        dados.generoID.forEach((id) =>{
            formData.append("generosId", id.toString());
        })
        dados.plataformaID.forEach((id) =>{
            formData.append("plataformasId", id.toString());
        })
        formData.append("classificacaoId", dados.classificacaoId.toString());
        
        await api.put("Jogo/" + jogoId, formData)
    }catch (error:any){
        throw new Error(error.response.data)
    }
}
export async function excluirJogo(jogoId: number){
    try{
        await api.delete("Jogo/" + jogoId)
    }catch(error:any){
        throw new Error(error.response.data)
    }
}