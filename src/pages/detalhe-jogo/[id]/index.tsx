import Header from "@/src/components/header/header";
import Footer from "@/src/components/footer/footer";
import { useParams } from "next/navigation";
import { listarPorId } from "../../api/jogoService";
import { useEffect, useState } from "react";
import { formatarPreco } from "@/src/utils/formatacao";

interface Jogo {
    nome: string;
    preco: number;
    descricao: string;
    imagemUrl: string;
    generoID: number[];
    plataformaID: number[];
    classificacaoId: number[];
}



const DetalheJogo = () => {

    const [jogo, setJogo] = useState<Jogo>();
    const params = useParams();
    const id = params?.id;

    async function listarJogo(){
        try{
            const response = await listarPorId(3);
            console.log(response);
            setJogo(response);
        }catch(error:any){
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (!id) return;

        setTimeout(() => {
            listarJogo();
        },1000);
    }, [id]);
    
    return(
        <>
            <Header/>
            <section>
                <h2>Detalhes do jogo</h2>
                <div>
                    <img src="../imgs/CLASHROYALE" alt="Imagemjogo" />
                    <h2>Clash Royale</h2>
                    <p>Clash Royale é um jogo eletrônico de estratégia em tempo real desenvolvido pela Supercell, onde jogadores competem em batalhas online utilizando cartas que representam tropas, 
                        feitiços e construções. O principal objetivo é destruir as torres adversárias enquanto defende sua própria arena, exigindo estratégia, gerenciamento de recursos e tomadas de 
                        decisão rápidas durante as partidas.O jogo possui diferentes arenas, modos de jogo e sistemas de progressão, permitindo desbloquear novas cartas e melhorar personagens
                        ao longo do tempo. Além disso, Clash Royale conta com eventos especiais, temporadas competitivas, clãs e torneios globais, mantendo uma comunidade ativa e um cenário competitivo 
                        entre jogadores do mundo inteiro.
                    </p>
                </div>
                <div>
                    <p>Classificacao Indicativa</p>
                    <p>Preco</p>
                    <p>Plataformas</p>
                    <p>Categorias</p>
                    <p>Generos</p>
                </div>
            </section>           
            <Footer/>
        </>
    )
}
export default DetalheJogo