
CREATE DATABASE IF NOT EXISTS Dex;

USE Dex;

CREATE TABLE Clientes(
  id_cliente INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  telefone CHAR(11) NOT NULL UNIQUE,
  endereco VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE Restaurantes(
  id_restaurante INT PRIMARY KEY AUTO_INCREMENT,
  nome_restaurante VARCHAR(100) NOT NULL,
  tipo_cozinha VARCHAR(100) NOT NULL,
  telefone_restaurante CHAR(11) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE ItensCardapio (
  id_item_cardapio INT PRIMARY KEY AUTO_INCREMENT,
  id_restaurante INT NOT NULL,
  nome_item VARCHAR(100) NOT NULL,
  descricao VARCHAR(255),
  preco DECIMAL(10,2) NOT NULL,
  ativo TINYINT DEFAULT 1,
  FOREIGN KEY (id_restaurante) REFERENCES Restaurantes(id_restaurante)
);


CREATE TABLE Pedidos(
  id_pedido INT PRIMARY KEY AUTO_INCREMENT,
  id_cliente INT NOT NULL,
  id_restaurante INT NOT NULL,
  data_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  pedido_status ENUM('CRIADO','EM_PREPARO','A_CAMINHO','ENTREGUE','CANCELADO') NOT NULL DEFAULT 'CRIADO',
  FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (id_restaurante) REFERENCES Restaurantes(id_restaurante)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ItemPedido (
  id_item INT PRIMARY KEY AUTO_INCREMENT,
  id_pedido INT NOT NULL,
  id_item_cardapio INT NOT NULL,
  quantidade INT NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,

  FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido)
    ON UPDATE CASCADE ON DELETE CASCADE,

  FOREIGN KEY (id_item_cardapio) REFERENCES ItensCardapio(id_item_cardapio)
    ON UPDATE CASCADE ON DELETE CASCADE
);








