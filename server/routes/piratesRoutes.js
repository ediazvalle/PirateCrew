const express = require('express');
const { AuthenticatorJWT } = require('../middlewares/authenticator');
const { addPirate, getPirateById, getPirateByUserID, deletePirate, updatePirate } = require('../controllers/piratesController');
const router = express.Router();


router.post('/new', AuthenticatorJWT, addPirate);
router.get('/pirate/:id', AuthenticatorJWT, getPirateById);
router.get('/user/:id', AuthenticatorJWT, getPirateByUserID);
router.put('/update/:id', AuthenticatorJWT, updatePirate);
router.delete('/delete/:id', AuthenticatorJWT, deletePirate);

module.exports = router; 