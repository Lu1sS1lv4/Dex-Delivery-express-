import { pool } from '../../config/Conexao-Banco.js';

export const RestaurantesRepositorio = {
  async listar() {
    const [rows] = await pool.query(
      'SELECT id_restaurante, nome_restaurante, tipo_cozinha, telefone_restaurante FROM Restaurantes ORDER BY id_restaurante'
    );
    return rows;
  },

  async obterPorId(id) {
    const [rows] = await pool.query(
      'SELECT id_restaurante, nome_restaurante, tipo_cozinha, telefone_restaurante FROM Restaurantes WHERE id_restaurante=?',
      [id]
    );
    return rows[0] || null;
  },

  async criar({ nome_restaurante, tipo_cozinha, telefone_restaurante }) {
    const [res] = await pool.query(
      'INSERT INTO Restaurantes (nome_restaurante, tipo_cozinha, telefone_restaurante) VALUES (?,?,?)',
      [nome_restaurante, tipo_cozinha, telefone_restaurante]
    );
    return { id_restaurante: res.insertId, nome_restaurante, tipo_cozinha, telefone_restaurante };
  },

  async atualizar(id, { nome_restaurante, tipo_cozinha, telefone_restaurante }) {
    await pool.query(
      'UPDATE Restaurantes SET nome_restaurante=?, tipo_cozinha=?, telefone_restaurante=? WHERE id_restaurante=?',
      [nome_restaurante, tipo_cozinha, telefone_restaurante, id]
    );
    return this.obterPorId(id);
  },

  async remover(id) {
    await pool.query('DELETE FROM Restaurantes WHERE id_restaurante=?', [id]);
  },
};
