
function BookCard(props) {
    return (
        <div className="livro">

            <img
                src={
                    props.livro.cover_i
                    ? `https://covers.openlibrary.org/b/id/${props.livro.cover_i}-M.jpg`
                    : "https://placehold.co/150x220?text=Sem+Capa"
                }
                alt={props.livro.title}
            />

            <h3>{props.livro.title}</h3>

            <p>
                Autor: {props.livro.author_name
                    ? props.livro.author_name[0]
                    : "Autor desconhecido"}
            </p>

        </div>
    );
}

export default BookCard;
