import React from "react";

export default function Post(props) {
    const { post, onCurtir, onToggleSalvo } = props;

    return (
        <div className="post" key={post.id}>
            <div className="topo">
                <div className="usuario">
                    <img src={`${post.img1}.svg`} alt={post.img1} />
                    {post.img1}
                </div>
                <div className="acoes">
                    <ion-icon name="ellipsis-horizontal"></ion-icon>
                </div>
            </div>

            <div className="conteudo" onClick={() => onCurtir(post.id)}>
                <img src={`${post.img2}.svg`} alt={post.img2} />
            </div>

            <div className="fundo">
                <div className="acoes">
                    <div>
                        <ion-icon
                            name={post.gostado ? "heart" : "heart-outline"}
                            style={{ color: post.gostado ? "red" : "inherit" }}
                            onClick={() => onCurtir(post.id, true)}
                        />
                        <ion-icon name="chatbubble-outline"></ion-icon>
                        <ion-icon name="paper-plane-outline"></ion-icon>
                    </div>
                    <div>
                        <ion-icon
                            name={post.salvo ? "bookmark" : "bookmark-outline"}
                            onClick={() => onToggleSalvo(post.id)}
                        />
                    </div>
                </div>

                <div className="curtidas">
                    <img src={`${post.img3}.svg`} alt={post.img3} />
                    <div className="texto">
                        Curtido por <strong>{post.img3}</strong> e{" "}
                        <strong>outras {post.curtidas} pessoas</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}