import styles from "./lista-games.module.css"
import CardJogo from "../card-jogo/card-jogo"
import {useState,useEffect} from "react";
import { excluirJogo, listarJogo } from "../../pages/api/jogoService";
import { toastConfirmarExclusao } from "../../utils/toast";
import { erro, notificacao } from "../../utils/toast";
import { verificarAutenticacao } from "../../utils/auth";

interface Jogo {
    jogoId: number
    nome: string
    preco: number
    descricao: string
    imagemUrl: string
    statusJogo: boolean
}
interface Genero{
    generoId: number,
    nome: string
}

const ListaGames = () => {

    const [genero, setGenero] = useState<Genero[]>([])
    const [jogos, setJogos] = useState<Jogo[]>([]);
    const [ordem, setOrdem] = useState("todos");
    const [pesquisa, setPesquisa] = useState("");
    const [estaAutenticado, setEstaAutenticado] = useState(false);
    const [generosSelecionados, setGenerosSelecionados] = useState<number[]>([])

    async function listar() {
        try {
            const lista = await listarJogo();
            setJogos(lista)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    function confirmarExclusao(jogoId: number) {
        toastConfirmarExclusao(async () => {
            try {
                await excluirJogo(jogoId);
                setJogos((listaAtual) =>
                    listaAtual.map((jogo) =>
                        jogo.jogoId === jogoId
                            ? { ...jogo, statusJogo: false }
                            : jogo
                    )
                )
                notificacao("Jogo inativado");
                listar();
            } catch (error: any) {
                erro(error.message);
            }
        })
    }

    useEffect(() => {
        setEstaAutenticado(verificarAutenticacao())
        listar();
    }, [])

    const jogosFiltrados = jogos.filter((jogo) =>
        jogo.nome.toLowerCase().includes(pesquisa.toLowerCase()))
        .sort((a, b) => {
            if (ordem === "crescente") {
                return a.preco - b.preco
            } else if (ordem === "decrescente") {
                return b.preco - a.preco
            }
            return a.jogoId - b.jogoId;
        })
    return (
        <>
            <div className={styles.botoes}>
                <label htmlFor="pesquisa">Pesquise...</label>
                <input type="text" name="pesquisa" placeholder="Digite o nome do jogo"
                    value={pesquisa} onChange={(e) => { setPesquisa(e.target.value) }} />
                <select className={styles.filtro} value={ordem} onChange={(e) =>
                    setOrdem(e.target.value)} >
                    Preco
                    <option value="crescente">Crescente</option>
                    <option value="decrescente">Decrescente</option>
                    <option value="todos">Todos</option>
                </select>
                <select className={styles.filtro}

                    value={generosSelecionados.map(String)}
                    onChange={(e) => setGenerosSelecionados(
                        Array.from(e.target.selectedOptions).map((option) => Number(option.value))
                    )}> Genero
                      {genero.map((item)=>(
                            <option value={item.generoId} key={item.generoId}>{item.nome}</option>
                      )
                    )}  
            </select>
        </div >
            <div className={styles.cards_jogos}>
                {jogosFiltrados.length > 0 ? jogos.map((item) => (
                    <CardJogo
                        key={item.jogoId}
                        jogoId={item.jogoId}
                        titulo={item.nome}
                        preco={item.preco}
                        imagem={item.imagemUrl}
                        onDelete={confirmarExclusao}
                        estaLogado={estaAutenticado}
                    />

                )) : (
                    <p>Carregando Jogos....</p>
                )}
            </div>
        </>
    )
}
export default ListaGames