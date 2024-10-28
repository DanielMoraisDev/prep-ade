import Usuario from "../models/usuarioModel.js"

export const logout = (req, res) => {
    res.json({ "Você saiu da aplicação" })
}

export const login = async (req, res) => {
    const { nickname, senha } = req.body

    try {
       const usuario = await Usuario.findOne({ where: { email } })

        if(!email) {
            return res.status(404).json({ message: "Usuario nao encontrado" })
        }

        if (usuario.senha !== senha) {
            return res.status(404).json({ message: "Senha nao confere" })
        }

        createUserToken(usuario, req, res)
    } catch (error) {
        return res.status(500).json({ err: error });
    }
}