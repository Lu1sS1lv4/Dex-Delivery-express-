import { pool } from '../../config/Conexao-Banco.js';

export const ClientesRepositorio = {
  async listar() {
    const [rows] = await pool.query(
      'SELECT id_cliente, nome, telefone, endereco FROM Clientes ORDER BY id_cliente'
    );
    return rows;
  },

  async obterPorId(id) {
    const [rows] = await pool.query(
      'SELECT id_cliente, nome, telefone, endereco FROM Clientes WHERE id_cliente=?',
      [id]
    );
    return rows[0] || null;
  },

  async criar({ nome, telefone, endereco }) {
    const [res] = await pool.query(
      'INSERT INTO Clientes (nome, telefone, endereco) VALUES (?,?,?)',
      [nome, telefone, endereco]
    );
    return { id_cliente: res.insertId, nome, telefone, endereco };
  },

  async atualizar(id, { nome, telefone, endereco }) {
    await pool.query(
      'UPDATE Clientes SET nome=?, telefone=?, endereco=? WHERE id_cliente=?',
      [nome, telefone, endereco, id]
    );
    return this.obterPorId(id);
  },

  async remover(id) {
    await pool.query('DELETE FROM Clientes WHERE id_cliente=?', [id]);
  },
};
