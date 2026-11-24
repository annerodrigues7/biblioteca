
import { useState, useEffect } from "react";
import api from "./services/api";
import BookCard from "./components/BookCard";
import "./App.css";

function App() {

    const [livros, setLivros] = useState([]);
    const [busca, setBusca] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {

        api.get("/search.json?q=fiction&limit=30")
            .then((resposta) => {
                setLivros(resposta.data.docs);
                setCarregando(false);
            })
            .catch(() => {
                setErro("Não foi possível carregar os livros.");
                setCarregando(false);
            });

    }, []);

    const livrosFiltrados = livros.filter((livro) =>
        livro.title.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="container">

            <header>
                <h1>Minha Biblioteca</h1>
                <p>Encontre seu próximo livro favorito!</p>
            </header>

            <input
                type="text"
                placeholder="Pesquisar livro..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
            />

            {carregando && <p>Carregando livros...</p>}

            {erro && <p>{erro}</p>}

            {!carregando && !erro && (

                <div className="lista-livros">

                    {livrosFiltrados.map((livro) => (

                        <BookCard
                            key={livro.key}
                            livro={livro}
                        />

                    ))}

                    {livrosFiltrados.length === 0 && (
                        <p>Nenhum livro encontrado.</p>
                    )}

                </div>

            )}

        </div>
    );
}

export default App;
