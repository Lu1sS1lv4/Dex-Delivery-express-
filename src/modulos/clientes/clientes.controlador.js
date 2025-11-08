import { ClientesRepositorio } from './clientes.repositorio.js';

function validarCliente({ nome, telefone, endereco }) {
  if (!nome || !telefone || !endereco) return 'Nome, telefone e endereço são obrigatórios.';
  if (!/^\d{11}$/.test(String(telefone))) return 'Telefone deve ter 11 dígitos numéricos.';
  return null;
}

export const ClientesControlador = {
  async listar(_req, res, next) {
    try { res.json(await ClientesRepositorio.listar()); }
    catch (e) { next(e); }
  },

  async obter(req, res, next) {
    try {
      const cli = await ClientesRepositorio.obterPorId(Number(req.params.id));
      if (!cli) return res.status(404).json({ erro: 'Cliente não encontrado' });
      res.json(cli);
    } catch (e) { next(e); }
  },

  async criar(req, res, next) {
    try {
      const erro = validarCliente(req.body);
      if (erro) return res.status(400).json({ erro });
      const novo = await ClientesRepositorio.criar(req.body);
      res.status(201).json(novo);
    } catch (e) { next(e); }
  },

  async atualizar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const erro = validarCliente(req.body);
      if (erro) return res.status(400).json({ erro });
      const atualizado = await ClientesRepositorio.atualizar(id, req.body);
      res.json(atualizado);
    } catch (e) { next(e); }
  },

  async remover(req, res, next) {
    try {
      await ClientesRepositorio.remover(Number(req.params.id));
      res.status(204).end();
    } catch (e) { next(e); }
  },
};
