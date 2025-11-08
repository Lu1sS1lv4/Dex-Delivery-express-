import { PedidosRepositorio } from './pedidos.repositorio.js';

const STATUS_VALIDOS = ['CRIADO','EM_PREPARO','A_CAMINHO','ENTREGUE','CANCELADO'];

function validarPedidoCriacao({ id_cliente, id_restaurante, itens }) {
  if (!id_cliente || !id_restaurante) return 'id_cliente e id_restaurante são obrigatórios.';
  if (!Array.isArray(itens) || itens.length === 0) return 'Envie ao menos um item.';
  for (const it of itens) {
    if (!it?.descricao) return 'Item sem descrição.';
    if (!(Number(it.quantidade) > 0)) return 'Quantidade deve ser > 0.';
    if (!(Number(it.preco_unitario) >= 0)) return 'Preço unitário deve ser >= 0.';
  }
  return null;
}

export const PedidosControlador = {
  async listar(_req, res, next) {
    try { res.json(await PedidosRepositorio.listar()); }
    catch (e) { next(e); }
  },

  async obter(req, res, next) {
    try {
      const ped = await PedidosRepositorio.obterCompleto(Number(req.params.id));
      if (!ped) return res.status(404).json({ erro: 'Pedido não encontrado' });
      res.json(ped);
    } catch (e) { next(e); }
  },

  // body: { id_cliente, id_restaurante, itens: [{descricao, quantidade, preco_unitario}] }
  async criar(req, res, next) {
    try {
      const erro = validarPedidoCriacao(req.body);
      if (erro) return res.status(400).json({ erro });

      const { id_cliente, id_restaurante, itens } = req.body;
      const id_pedido = await PedidosRepositorio.criarPedido({ id_cliente, id_restaurante });

      for (const it of itens) {
        await PedidosRepositorio.adicionarItem({
          id_pedido,
          descricao: it.descricao,
          quantidade: Number(it.quantidade),
          preco_unitario: Number(it.preco_unitario)
        });
      }

      res.status(201).json(await PedidosRepositorio.obterCompleto(id_pedido));
    } catch (e) { next(e); }
  },

  // body: { status }
  async atualizarStatus(req, res, next) {
    try {
      const { status } = req.body;
      if (!STATUS_VALIDOS.includes(status)) {
        return res.status(400).json({ erro: 'Status inválido' });
      }
      const id = Number(req.params.id);
      await PedidosRepositorio.atualizarStatus(id, status);
      res.json(await PedidosRepositorio.obterCompleto(id));
    } catch (e) { next(e); }
  },

  async remover(req, res, next) {
    try {
      await PedidosRepositorio.remover(Number(req.params.id));
      res.status(204).end();
    } catch (e) { next(e); }
  }
};
