const { response } = require('express');
const Proposicao = require('../models/Proposicao');

const index = async (req, res) => {
    try {
        const proposicoes = await Proposicao.findAll();
        return res.status(200).json({ proposicoes });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const show = async (req, res) => {
    const { id } = req.params;
    try {
        const proposicao = await Proposicao.findByPk(id);
        return res.status(200).json({ proposicao });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const create = async (req, res) => {
    try {
        const proposicao = await Proposicao.create(req.body);
        console.log(proposicao)

        return res.status(200).json({ proposicao });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Proposicao.update(req.body, { where: { id: id } });
        if (updated) {
            const proposicao = await Proposicao.findByPk(id);
            return res.status(200).send(proposicao);
        }
        throw new Error();
    } catch (err) {
        return res.status(500).json("Proposição não encontrado");
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Proposicao.destroy({ where: { id: id } });
        if (deleted) {
            return res.status(200).json("Proposição deletada com sucesso.");
        }
        throw new Error();
    } catch (err) {
        return res.status(500).json("Proposição não encontrada.");
    }
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy
};