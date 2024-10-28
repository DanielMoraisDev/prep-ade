import jwt from "jsonwebtoken"

const createUserToken = (usuario, req, res) => {
    try {
        const token = jwt.sign(
            {
                //payload -> info_usuario
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                nickname: usuario.nickname
            },
            "SenhaSuperSegura", //Senha
            {
                expiresIn: "24h"
            } // Header Token -> crypt, tempo
        )

        res.json({ message: "você está logado", token, usuarioId: usuario.id })
    } catch (error) {
        res.status(500).json({ err: error });
      }
}

export default createUserToken