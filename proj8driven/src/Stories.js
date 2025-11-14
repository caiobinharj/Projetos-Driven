import Story from "./Story";

export default function Stories() {
    const listaNomes = [
        "9gag", "meowed", "barked", "nathanwpylestrangeplanet",
        "wawawicomics", "respondeai", "filomoderna", "memeriagourmet"
    ];

    return (
        <div className="stories">
            {listaNomes.map((nome) => (
                <Story key={nome} nome={nome} />
            ))}
            <div className="setinha">
                <ion-icon name="chevron-forward-circle"></ion-icon>
            </div>
            <div className="setinha">
                <ion-icon name="chevron-forward-circle"></ion-icon>
            </div>
        </div>
    );
}