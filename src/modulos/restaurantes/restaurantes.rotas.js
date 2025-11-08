import { Router } from 'express';
import { RestaurantesControlador } from './restaurantes.controlador.js';

const r = Router();
r.get('/', RestaurantesControlador.listar);
r.get('/:id', RestaurantesControlador.obter);
r.post('/', RestaurantesControlador.criar);
r.put('/:id', RestaurantesControlador.atualizar);
r.delete('/:id', RestaurantesControlador.remover);
export default r;
