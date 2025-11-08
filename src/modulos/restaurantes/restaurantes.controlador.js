import { RestaurantesRepositorio } from './restaurantes.repositorio.js';

function validarRest({ nome_restaurante, tipo_cozinha, telefone_restaurante }) {
  if (!nome_restaurante || !tipo_cozinha || !telefone_restaurante) return 'Nome, tipo de cozinha e telefone são obrigatórios.';
  if (!/^\d{11}$/.test(String(telefone_restaurante))) return 'Telefone do restaurante deve ter 11 dígitos numéricos.';
  return null;
}

export const RestaurantesControlador = {
  async listar(_req, res, next) { try { res.json(await RestaurantesRepositorio.listar()); } catch (e) { next(e); } },

  async obter(req, res, next) {
    try {
      const it = await RestaurantesRepositorio.obterPorId(Number(req.params.id));
      if (!it) return res.status(404).json({ erro: 'Restaurante não encontrado' });
      res.json(it);
    } catch (e) { next(e); }
  },

  async criar(req, res, next) {
    try {
      const erro = validarRest(req.body);
      if (erro) return res.status(400).json({ erro });
      const novo = await RestaurantesRepositorio.criar(req.body);
      res.status(201).json(novo);
    } catch (e) { next(e); }
  },

  async atualizar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const erro = validarRest(req.body);
      if (erro) return res.status(400).json({ erro });
      const atualizado = await RestaurantesRepositorio.atualizar(id, req.body);
      res.json(atualizado);
    } catch (e) { next(e); }
  },

  async remover(req, res, next) {
    try {
      await RestaurantesRepositorio.remover(Number(req.params.id));
      res.status(204).end();
    } catch (e) { next(e); }
  },
};
