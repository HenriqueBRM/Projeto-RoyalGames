import { formatarPreco } from "../../utils/formatacao";
import styles from "@/src/components/card-jogo/card-jogo.module.css"
import Link from "next/link";

type Jogo ={
    titulo: string,
    imagem: string,
    preco: number,
    jogoId: number
    onDelete: (produtoID: number) => void 
    estaLogado: boolean
}


const CardJogo = ({titulo, imagem, preco, jogoId}: Jogo) => {
    return (
        <>
            <article className={styles.card_jogo}>
                <Link href={"/detalhe-produto/" + jogoId}>
                <img src={imagem} alt="" className={styles.img_jogo} />
                </Link>

                <h3 className={styles.titulo_jogo}>{titulo}</h3>
                <p className={styles.preco_produto}>{formatarPreco(preco)}</p>
                
                <button>Detalhes</button>
            </article>
        </>
    )
}
export default CardJogo