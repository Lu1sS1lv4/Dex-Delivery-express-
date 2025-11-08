import { Router } from 'express';
import { ClientesControlador } from './clientes.controlador.js';

const r = Router();
r.get('/', ClientesControlador.listar);
r.get('/:id', ClientesControlador.obter);
r.post('/', ClientesControlador.criar);
r.put('/:id', ClientesControlador.atualizar);
r.delete('/:id', ClientesControlador.remover);
export default r;
