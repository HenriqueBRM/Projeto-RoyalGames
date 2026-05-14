import Header from "@/src/components/header/header";
import Footer from "@/src/components/footer/footer";
import styles from "./home.module.css";
import ListaGames from "@/src/components/lista-games/lista-games";

const Home = () => {
    return (
        <>
            <Header />
            <div id={styles.home}>

                <section>
                    <div>
                        <h2>Conheca nossos jogos!</h2>

                        <p>Navegue por títulos de todas as gerações,
                            descubra plataformas, gêneros e detalhes
                            completos antes de escolher sua próxima aventura.
                            Seu próximo jogo favorito começa aqui.
                        </p>
                    </div>
                    <img src="../imgs/Imagem_Banner.png" alt="" />
                </section>
                <section>
                    <div>
                        <h2>Catalogo de jogos</h2>
                        {/*<ListaGames/>*/}
                    </div>
                </section>
                <section>
                    <div>
                        <h2>Jogos online podem afetar o comportamento
                            humano?
                        </h2>

                        <img src="./imgs/Imagens_Home" alt="" />

                        <p> Estudos indicam que jogos podem alterar o comportamento humano…
                            Principalmente quando o time resolve testar sua paciência em plena partida ranqueada.
                        </p>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
export default Home;