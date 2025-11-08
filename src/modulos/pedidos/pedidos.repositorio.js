import { pool } from '../../config/Conexao-Banco.js';

export const PedidosRepositorio = {
  async listar() {
    const [rows] = await pool.query(
      `SELECT p.id_pedido, p.id_cliente, p.id_restaurante, p.data_hora, p.pedido_status,
              c.nome AS cliente, r.nome_restaurante AS restaurante
         FROM Pedidos p
         JOIN Clientes c      ON c.id_cliente      = p.id_cliente
         JOIN Restaurantes r  ON r.id_restaurante  = p.id_restaurante
        ORDER BY p.id_pedido DESC`
    );
    return rows;
  },

  async obterCompleto(id_pedido) {
    const [[pedido]] = await pool.query('SELECT * FROM Pedidos WHERE id_pedido=?', [id_pedido]);
    if (!pedido) return null;
    const [itens] = await pool.query(
      'SELECT id_item, descricao, quantidade, preco_unitario, total FROM ItemPedido WHERE id_pedido=?',
      [id_pedido]
    );
    return { ...pedido, itens };
  },

  async criarPedido({ id_cliente, id_restaurante }) {
    const [res] = await pool.query(
      'INSERT INTO Pedidos (id_cliente, id_restaurante) VALUES (?,?)',
      [id_cliente, id_restaurante]
    );
    return res.insertId;
  },

  async adicionarItem({ id_pedido, descricao, quantidade, preco_unitario }) {
    await pool.query(
      'INSERT INTO ItemPedido (id_pedido, descricao, quantidade, preco_unitario) VALUES (?,?,?,?)',
      [id_pedido, descricao, quantidade, preco_unitario]
    );
  },

  async atualizarStatus(id_pedido, novoStatus) {
    await pool.query('UPDATE Pedidos SET pedido_status=? WHERE id_pedido=?', [novoStatus, id_pedido]);
  },

  async remover(id_pedido) {
    await pool.query('DELETE FROM Pedidos WHERE id_pedido=?', [id_pedido]); // ON DELETE CASCADE remove itens
  }
};
