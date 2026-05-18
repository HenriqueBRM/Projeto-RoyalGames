import styles from "./lista-games.module.css"
import CardJogo from "../card-jogo/card-jogo"
import Link from "next/link";
import { useEffect, useState } from "react";
import { excluirJogo, listarJogo } from "@/src/pages/api/jogoService";
import { toastConfirmarExclusao } from "@/src/utils/toast";
import { erro, notificacao } from "@/src/utils/toast";
import { verificarAutenticacao } from "@/src/utils/auth";

interface Jogo {
    jogoId: number
    nome: string
    preco: number
    descricao: string
    imagemUrl: string
    statusJogo: boolean
}

const ListaGames = () => {

    const [jogos, setJogos] = useState<Jogo[]>([]);
    const [ordem, setOrdem] = useState("todos");
    const [pesquisa, setPesquisa] = useState("");
    const [estaAutenticado, setEstaAutenticado] = useState(false);

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
                <select className={styles.filtro}>
                    Genero
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select>
            </div>
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