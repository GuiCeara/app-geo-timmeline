"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrar = exports.consultarPorId = exports.consultar = void 0;
const database_1 = __importDefault(require("../config/database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const consultar = async (req, res) => {
    try {
        const users = await database_1.default.usuario.findMany(); // Buscar muitos
        res.json(users).status(200);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};
exports.consultar = consultar;
const consultarPorId = async (req, res) => {
    try {
        const _id = parseInt(req.params.id);
        const usuario = await database_1.default.usuario.findUnique({ where: { id: _id } });
        res.json(usuario).status(200);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};
exports.consultarPorId = consultarPorId;
const cadastrar = async (req, res) => {
    try {
        const { nome, email, senha, data_nasc } = req.body;
        // Validação básica
        if (!nome || !email || !senha || !data_nasc) {
            return res.status(400).json({
                result: false,
                data: null,
                info: "Nome, email e senha são obrigatórios"
            });
        }
        // Verificar se o email já está cadastrado
        const usuarioExistente = await database_1.default.usuario.findUnique({
            where: { email }
        });
        if (usuarioExistente) {
            return res.status(400).json({
                result: false,
                data: null,
                info: "Email já cadastrado"
            });
        }
        // Criptografar a senha antes de salvar
        const salt = await bcryptjs_1.default.genSalt(5);
        const hashCriptografado = await bcryptjs_1.default.hash(senha, salt);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao cadastrar usuários' });
    }
};
exports.cadastrar = cadastrar;
