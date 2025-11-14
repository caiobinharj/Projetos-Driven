CREATE TABLE endereco(
    id SERIAL PRIMARY KEY,
    complemento TEXT,
    rua TEXT NOT NULL,
    numero INTEGER NOT NULL,
    bairro TEXT NOT NULL,
    cidade TEXT NOT NULL,
    estado TEXT NOT NULL,
    cep TEXT NOT NULL
);

CREATE TABLE cliente(
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    CPF TEXT UNIQUE NOT NULL,
    telefone_principal TEXT,
    id_endereco INTEGER NOT NULL REFERENCES endereco(id)
);

CREATE TABLE telefone(
    id SERIAL PRIMARY KEY,
    numero TEXT UNIQUE NOT NULL,
    telefoe_principal BOOLEAN NOT NULL,
    id_cliente INTEGER NOT NULL REFERENCES cliente(id)
);

CREATE TABLE locacao(
    id SERIAL PRIMARY KEY,
    id_cliente INTEGER NOT NULL REFERENCES cliente(id),
    preco FLOAT NOT NULL,
    valor_default FLOAT NOT NULL,
    valor_multa FLOAT DEFAULT 0,
    avaliacao INTEGER,
    data_compra DATE DEFAULT CURRENT_DATE,
    devolucao_prevista DATE NOT NULL,
    devolucao_real DATE
);

CREATE TABLE filme(
    id SERIAL PRIMARY KEY,
    categoria TEXT NOT NULL,
    titulo TEXT NOT NULL,
    duracao INTEGER NOT NULL    
);

CREATE TABLE disco(
    id SERIAL PRIMARY KEY,
    id_filme INTEGER NOT NULL REFERENCES filme(id),
    num_copias INTEGER NOT NULL,
    num_registro INTEGER UNIQUE NOT NULL,
    codigo_barras INTEGER UNIQUE NOT NULL
);

CREATE TABLE locacao_disco(
    id SERIAL PRIMARY KEY,
    id_locacao INTEGER NOT NULL REFERENCES locacao(id),
    id_disco INTEGER NOT NULL REFERENCES disco(id)
);

CREATE TABLE artista(
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    data_nasc DATE NOT NULL,
    nacionalidade TEXT NOT NULL    
);

CREATE TABLE artista_filme(
    id SERIAL PRIMARY KEY,
    id_artista INTEGER NOT NULL REFERENCES artista(id),
    id_filme INTEGER NOT NULL REFERENCES filme(id)
);