import { Router } from 'express';
import { PedidosControlador } from './pedidos.controlador.js';

const r = Router();
r.get('/', PedidosControlador.listar);
r.get('/:id', PedidosControlador.obter);
r.post('/', PedidosControlador.criar);
r.patch('/:id/status', PedidosControlador.atualizarStatus);
r.delete('/:id', PedidosControlador.remover);
export default r;
