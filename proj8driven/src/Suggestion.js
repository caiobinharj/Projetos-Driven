export default function Suggestion(props) {
    const { nome, razao } = props;

    return (
        <div className="sugestao" key={nome}>
            <div className="usuario">
                <img src={`${nome}.svg`} alt={nome} />
                <div className="texto">
                    <div className="nome">{nome}</div>
                    <div className="razao">{razao}</div>
                </div>
            </div>
            <div className="seguir">Seguir</div>
        </div>
    );
}