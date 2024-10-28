import { literal } from "sequelize";
import Publicacao  from "../models/publicacaoModel.js";

export const getAll = async (req, res) => {
  try {
    const publicacoes = await Publicacao.findAll({ 
        raw: true,
        attributes: [
            'id',
            'titulo',
            'local',
            'cidade',
            'imagem',
            [literal(`(
              SELECT COUNT(*) FROM curtidas 
              WHERE curtidas.publicacao_id = publicacoes.id
              AND curtidas.tipo_avaliacao = "up"
            )`), "total_likes"],
            [literal(`(
              SELECT COUNT(*) FROM curtidas 
              WHERE curtidas.publicacao_id = publicacoes.id
              AND curtidas.tipo_avaliacao = "down"
            )`), "total_deslikes"],
            [literal(`(
              SELECT COUNT(*) FROM comentarios 
              WHERE comentarios.publicacao_id = publicacoes.id
            )`), "total_comentarios"]
        ]
    })

    res.json(publicacoes)
  } catch (error) {
    res.status(500).json({ err: error });
  }
};
