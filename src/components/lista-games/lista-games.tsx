import styles from "./lista-games.module.css"
import CardJogo from "../card-jogo/card-jogo"
const ListaGames = () => {
    return (
        <>
            <div className={styles.botoes}>
                <input type="text" placeholder="Pesquise...." />
                <select className={styles.filtro}>
                    Preco
                    <option value="crescente">Crescente</option>
                    <option value="decrescente">Decrescente</option>
                    <option value="todos">Todos</option>
                </select>
                <select className={styles.filtro}>
                    Categoria
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select>
            </div>
            <div className={styles.cards_jogos}>
                <CardJogo/>
                <CardJogo/>
                <CardJogo/>
                <CardJogo/>
                <CardJogo/>
                <CardJogo/>
            </div>




        </>
    )
}
export default ListaGames