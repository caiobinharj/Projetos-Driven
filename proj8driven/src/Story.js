export default function Story(props) {
    return (
        <div className="story">
            <div className="imagem">
                <img src={`${props.nome}.svg`} alt={props.nome} />
            </div>
            <div className="usuario">
                {props.nome}
            </div>
        </div>
    );
}