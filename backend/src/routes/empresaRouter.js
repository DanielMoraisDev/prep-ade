import {Router } from "express"
import { create } from "../controllers/empresaController.js";
import { getEmpresa } from "../controllers/empresaController.js";

const router = Router()

router.post('/', create);
router.get('/', getEmpresa);

export default router;