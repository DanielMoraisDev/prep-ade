import { literal } from "sequelize";
import Comentario from "../models/comentarioModel.js";
import Publicacao from "../models/publicacaoModel.js";

export const getAll = async (req, res) => {
  try {
    const publicacoes = await Publicacao.findAll({
      raw: true,
      attributes: [
        "id",
        "titulo",
        "local",
        "cidade",
        "imagem",
        [
          literal(`(
              SELECT COUNT(*) FROM curtidas 
              WHERE curtidas.publicacao_id = publicacoes.id
              AND curtidas.tipo_avaliacao = "up"
            )`),
          "total_likes",
        ],
        [
          literal(`(
              SELECT COUNT(*) FROM curtidas 
              WHERE curtidas.publicacao_id = publicacoes.id
              AND curtidas.tipo_avaliacao = "down"
            )`),
          "total_deslikes",
        ],
        [
          literal(`(
              SELECT COUNT(*) FROM comentarios 
              WHERE comentarios.publicacao_id = publicacoes.id
            )`),
          "total_comentarios",
        ],
      ],
    });

    res.json(publicacoes);
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

export const getPublicacao = async (req, res) => {
  const { id } = req.params;
  try {
    const publicacao = await Publicacao.findOne({
      raw: true,
      where: { id },
      attributes: [
        "id",
        "titulo",
        "local",
        "cidade",
        "imagem",
        [
          literal(`(
        SELECT COUNT(*) FROM curtidas 
        WHERE curtidas.publicacao_id = "${id}"
        AND curtidas.tipo_avaliacao = "up"
      )`),
          "total_likes",
        ],
        [
          literal(`(
        SELECT COUNT(*) FROM curtidas 
        WHERE curtidas.publicacao_id = "${id}"
        AND curtidas.tipo_avaliacao = "down"
      )`),
          "total_deslikes",
        ],
        [
          literal(`(
        SELECT COUNT(*) FROM comentarios 
        WHERE comentarios.publicacao_id = "${id}"
      )`),
          "total_comentarios",
        ],
      ],
    });

    const comentariosPublicacao = await Comentario.findAll({
      where: { publicacao_id: publicacao.id },
    });

    publicacao.comentarios = comentariosPublicacao

    res.json(publicacao);
  } catch (error) {
    res.status(500).json({ err: error });
  }
};
