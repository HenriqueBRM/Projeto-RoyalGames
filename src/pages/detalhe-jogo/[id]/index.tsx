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
    generos: string[];
    plataformas: string[];
    classificacaoIndicativas: string[];
}

const DetalheJogo = () => {

    const [jogo, setJogo] = useState<Jogo>();

    const params = useParams();
    
    const id = params?.id;

    async function listarJogo() {
        try {
            const response = await listarPorId(Number(id));
            console.log(response);
            setJogo(response);
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (!id) return;

        setTimeout(() => {
            listarJogo();
        }, 1000);
    }, [id]);

    return (
        <>
            <Header />
            <main>
                <section>
                    {jogo ? (
                        <>
                            <h2>Detalhes do {jogo.nome}</h2>
                            <article>
                                <img src={jogo.imagemUrl} alt="Imagemjogo" />
                                <div>
                                    <h2>{jogo.nome}</h2>
                                    <p>{jogo.descricao}</p>
                                </div>
                            </article>
                            <div>
                                <p>Classificacao Indicativa</p>
                                <ul>
                                    {jogo?.classificacaoIndicativas.map((cla) => (
                                        <li key={cla}>{cla}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p>Preco(R$): {formatarPreco(jogo.preco)}</p>
                            </div>
                            <div>
                                <p>Plataformas</p>
                                <ul>
                                    {jogo?.plataformas.map((pla) =>(
                                        <li key={pla}>{pla}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p>Generos</p>
                                <ul>
                                    {jogo.generos.map((gen) =>(
                                        <li key={gen}>{gen}</li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    ) : (<p>Carregando jogo.... </p>)}
                </section>
            </main >
            <Footer />
        </>
    )
}
export default DetalheJogo