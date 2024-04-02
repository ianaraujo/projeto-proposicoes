const { Router } = require('express');

const ProposicaoController = require('../controllers/ProposicaoController');

const router = Router();


router.get('/proposicoes',ProposicaoController.index);
router.get('/proposicoes/:id',ProposicaoController.show);
router.post('/proposicao',ProposicaoController.create);
router.put('/proposicoes/:id', ProposicaoController.update);
router.delete('/proposicoes/:id', ProposicaoController.destroy);


module.exports = router;