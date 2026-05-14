import styles from "./card-jogo.module.css"

const CardJogo = () => {
    return (
        <>
            <article className={styles.card_jogo}>
                <img src="../imgs/CLASHROYALE.jpg" alt="" className={styles.img_jogo} />

                <h3 className={styles.titulo_jogo}>Clash Royale</h3>
                <p className={styles.preco_produto}>R$ 20,00</p>

                <div className={styles.botoes}>
                    <button>Excluir</button>
                    <button>Editar</button>
                </div>
            </article>
        </>
    )
}
export default CardJogo