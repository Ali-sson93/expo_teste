// Importamos o SQLite moderno do Expo
import * as SQLite from "expo-sqlite";
import { Produto } from "../../models/Produto";

// O Expo já abre a base de dados de forma simples
const db = SQLite.openDatabaseSync("LojaDatabase.db");

class GestorDados {
  constructor() {
    // Quando o Gestor for chamado, ele cria a tabela se não existir (DDL)
    this.criarBanco();
  }

  // Criação da Tabela (SQL: CREATE TABLE)
  criarBanco() {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS PRODUTO (
        CODIGO INTEGER PRIMARY KEY,
        NOME VARCHAR(20),
        QUANTIDADE INTEGER
      );
    `);
  }

  // Adicionar Produto (SQL: INSERT)
  adicionar(produto) {
    // Usamos o runSync para comandos que modificam dados
    db.runSync(
      "INSERT INTO PRODUTO (CODIGO, NOME, QUANTIDADE) VALUES (?, ?, ?);",
      [produto.codigo, produto.nome, produto.quantidade],
    );
  }

  // Remover Produto (SQL: DELETE)
  remover(codigo) {
    db.runSync("DELETE FROM PRODUTO WHERE CODIGO = ?;", [codigo]);
  }

  // Obter Todos os Produtos (SQL: SELECT)
  obterTodos() {
    // Usamos o getAllSync para puxar os dados
    const results = db.getAllSync("SELECT * FROM PRODUTO;");

    // Convertendo as linhas do banco de volta para o objeto Produto
    let objetos = [];
    for (let i = 0; i < results.length; i++) {
      let linha = results[i];
      let produto = new Produto(linha.CODIGO, linha.NOME, linha.QUANTIDADE);
      objetos.push(produto);
    }
    return objetos;
  }
}

export default GestorDados;
