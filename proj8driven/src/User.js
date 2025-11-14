import React from "react";

export default function User() {
    const [nome, setNome] = React.useState("catanacomics");
    const [foto, setFoto] = React.useState("catanacomics.svg");

    function handleNome() {
        const novoNome = prompt("Digite seu novo nome:", nome);
        if (novoNome !== null && novoNome.trim() !== "") {
            setNome(novoNome);
        }
    }

    function handleFoto() {
        const novaFoto = prompt("Link para a nova foto:", nome);
        if (novaFoto !== null) {
            setFoto(novaFoto);
        }
    }

    return (
        <div className="usuario">
            <img src={foto} alt="imagem de perfil" onClick={handleFoto}/>
            <div className="texto" onClick={handleNome}>
                <span>
                    <strong>{nome}</strong>
                    <ion-icon name="pencil"></ion-icon>
                </span>
            </div>
        </div>
    );
}