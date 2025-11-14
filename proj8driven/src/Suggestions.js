import Suggestion from "./Suggestion";

export default function Suggestions() {
    const sugestoes = [
        { nome: "bad.vibes.memes", razao: "Segue Você" },
        { nome: "chibirdart", razao: "Segue Você" },
        { nome: "razoesparaacreditar", razao: "Novo no Instagram" },
        { nome: "adorable_animals", razao: "Segue Você" },
        { nome: "smallcutecats", razao: "Segue Você" }
    ];

    return (
        <div className="sugestoes">
            <div className="titulo">
                <div className="separa">
                    Sugestões para você
                    <div>Ver tudo</div>
                </div>
                {sugestoes.map((sugestao) => (
                    <Suggestion
                        key={sugestao.nome}
                        nome={sugestao.nome}
                        razao={sugestao.razao}
                    />
                ))}
            </div>
        </div>
    );
}