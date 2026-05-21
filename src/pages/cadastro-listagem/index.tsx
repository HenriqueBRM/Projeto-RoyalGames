import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import styles from "./cadastro-listagem.module.css"
import { useEffect, useState } from "react";
import { cadastrarJogo, editarJogo, listarPorId } from "../api/jogoService";
import { listarClassificacaoIndicativa } from "../api/classificacaoService";
import { listarGenero } from "../api/generoService";
import { listarPlataforma } from "../api/plataformaService";
import { erro, notificacao } from "../../utils/toast"
import { useRouter } from "next/router";
import { verificarAutenticacao } from "../../utils/auth";

interface Classificacao {
    classificacaoIndicativaId: number,
    classificacao: string
}
interface Genero {
    generoID: number,
    nome: string
}
interface Plataforma {
    plataformaID: number,
    nome: string
}

const CadastraJogo = () => {

    const [classificacao, setClassificacao] = useState<Classificacao[]>([])
    const [genero, setGenero] = useState<Genero[]>([])
    const [plataforma, setPlataforma] = useState<Plataforma[]>([])

    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [preco, setPreco] = useState<string>("");
    const [imagem, setImagem] = useState<File | null>(null);

    const [classificacoesSelecionadas, setClassificacoesSelecionadas] = useState<number[]>([]);
    const [generosSelecionados, setGenerosSelecionados] = useState<number[]>([])
    const [plataformasSelecionadas, setPlataformasSelecionadas] = useState<number[]>([])

    const [estaAutenticado, setEstaAutenticado] = useState(false);


    const router = useRouter();
    const id = router.query.id;

    let telaEditar = id ? true : false


    async function listarClassificacaoEmJogo() {
        const lista = await listarClassificacaoIndicativa();
        setClassificacao(lista.data);
    }

    async function listarGeneroEmJogo() {
        const lista = await listarGenero();
        setGenero(lista.data);
    }

    async function listarPlataformaEmJogo() {
        const lista = await listarPlataforma();
        setPlataforma(lista.data);
    }

    async function carregarInformacoes() {
        if (!id) return;

        const jogo = await listarPorId(Number(id));
        setNome(jogo.nome);
        setDescricao(jogo.descricao);
        setPreco(jogo.preco);

        setClassificacoesSelecionadas(jogo.classificacaoId || [])
        setGenerosSelecionados(jogo.generoID || [])
        setPlataformasSelecionadas(jogo.plataformaID || [])
    }

    async function SalvarJogo(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            if(classificacoesSelecionadas.length === 0){
                erro("Classificacao indicativa eh obrigatoria!");
                return;
            }
            const dados = {
                nome,
                descricao,
                preco,
                imagem,
                classificacaoId: classificacoesSelecionadas[0],
                generoID: generosSelecionados,
                plataformaID: plataformasSelecionadas
            };

            if(telaEditar){
                await editarJogo(Number(id), dados);
                notificacao("Jogo editado com sucesso!");
            }else{
                await cadastrarJogo(dados);
                notificacao("Jogo cadastrado com sucesso!");
            }

        } catch (error: any) {
            erro(error.message);
        }
    }

    useEffect(() => {
        if (!router.isReady) return
        if (!verificarAutenticacao()) {
            router.push("/home")
            return;
        }
        setEstaAutenticado(true);

        listarGeneroEmJogo();
        listarPlataformaEmJogo();
        listarClassificacaoEmJogo();

        carregarInformacoes();
    }, [router.isReady, id])

    if (!estaAutenticado)
        return null;
    return (
        <>
            <Header />
            <section>
                <h2>Cadastrar novo jogo</h2>
                <form onSubmit={SalvarJogo}>

                    <div>
                        <label htmlFor="nome">Nome do Jogo</label>
                        <input type="text" required
                            value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="valor">Preco(R$)</label>
                        <input type="text" required
                            value={preco} onChange={(e) => setPreco(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="genero">Genero</label>
                        <select multiple                            
                            value={generosSelecionados.map(String)}
                            onChange={(e) => setGenerosSelecionados(
                                Array.from(e.target.selectedOptions).map((option) => Number(option.value))
                            )}>
                                {genero.map((item) => (
                                <option value={item.generoID} key={item.generoID}>{item.nome}</option>
                            )
                            )}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="classificacao_indicativa">Classificacao Indicativa</label>
                        <select value={classificacoesSelecionadas.toString()} onChange={(e) =>
                            setClassificacoesSelecionadas([Number(e.target.value),])} required><option>Selecione</option>
                            {classificacao.map((c) => (<option key={c.classificacaoIndicativaId} value={c.classificacaoIndicativaId}>{c.classificacao}</option>))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="plataforma">Plataforma</label>
                        <select multiple
                            value={plataformasSelecionadas.map(String)}
                            onChange={(e) => setPlataformasSelecionadas(
                                Array.from(e.target.selectedOptions).map((option) => Number(option.value))
                            )}>
                            {plataforma.map((item) => (
                                <option value={item.plataformaID} key={item.plataformaID}>{item.nome}</option>
                            )
                            )}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="imagem_produto">Imagem do produto</label>
                        <input type="file"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setImagem(e.target.files[0]);
                                }
                            }}
                        />
                    </div>
                    <button>Cadastrar</button>
                </form>
            </section>
            <section>
                <h2>Lista de jogos</h2>
                {/* componente lista-games */}
            </section >

            <Footer />

        </>
    )
}

export default CadastraJogo