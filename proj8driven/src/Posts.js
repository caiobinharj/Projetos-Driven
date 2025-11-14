import React from "react";
import Post from "./Post";

export default function Posts() {
    const [posts, setPosts] = React.useState([
        { img1: "meowed", img2: "gato-telefone", img3: "respondeai", curtidas: 12031, gostado: false, salvo: false, id: 0 },
        { img1: "barked", img2: "dog", img3: "adorable_animals", curtidas: 43213, gostado: false, salvo: false, id: 1 },
        { img1: "dog", img2: "adorable_animals", img3: "adorable_animals", curtidas: 123124, gostado: false, salvo: false, id: 2 },
        { img1: "adorable_animals", img2: "meowed", img3: "meowed", curtidas: 12312432, gostado: false, salvo: false, id: 3 },
        { img1: "barked", img2: "barked", img3: "adorable_animals", curtidas: 99323, gostado: false, salvo: false, id: 4 }
    ]);

    function handleCurtir(id, isToggle = false) {
        setPosts(posts.map(post => {
            if (post.id === id) {
                if (!isToggle && post.gostado) return post;

                const novoEstado = isToggle ? !post.gostado : true;
                return {
                    ...post,
                    curtidas: novoEstado ? post.curtidas + 1 : post.curtidas - 1,
                    gostado: novoEstado
                };
            }
            return post;
        }));
    }

    function toggleSalvo(id) {
        setPosts(posts.map(post =>
            post.id === id ? { ...post, salvo: !post.salvo } : post
        ));
    }

    return (
        <div className="posts">
            {posts.map((post) => (
                <Post
                    key={post.id}
                    post={post}
                    onCurtir={handleCurtir}
                    onToggleSalvo={toggleSalvo}
                />
            ))}
        </div>
    );
}