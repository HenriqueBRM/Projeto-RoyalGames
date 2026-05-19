import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { cadastrarJogo } from "../api/jogoService";

const CadastraJogo = () => {

    return(
        <>
            <Header/>
            <section>
                <h2>Cadastrar novo jogo</h2>
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" required/>

                    <label htmlFor="valor">Valor</label>
                    <input type="text" required/>

                    <label htmlFor="genero">Genero</label>
                    <select multiple name="generos" id=""></select>

                    <label htmlFor="classificacao_indicativa">Classificacao Indicativa</label>
                    <select multiple name="classificacoes_indicativas" id=""></select>

                    <label htmlFor="plataforma">Plataforma</label>
                    <select multiple name="plataforma" id=""></select>

                    <label htmlFor="imagem_produto">Imagem do produto</label>
                    <input type="file"  />
                </div>  
                <button>Cadastrar</button>
            </section>
            <section>
                <h2>Lista de jogos</h2>
                {/* componente lista-games */}
            </section>

            <Footer/>
        
        </>
    )
}

export default CadastraJogo