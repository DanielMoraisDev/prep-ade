import {Router } from "express"
import { getAll, getPublicacao } from "../controllers/publicacaoController.js";

const router = Router()

router.get('/', getAll);
router.get('/:id', getPublicacao);

export default router;