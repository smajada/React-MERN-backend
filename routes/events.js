/**
 * Rutas de Eventos / events
 * host + /api/events
 */
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const router = Router();
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");

// Todas tienen que pasar por la validación de JWT
router.use(validarJWT);

// Obtener eventos
router.get('/',

  getEventos);

// Crear un nuevo evento
router.post('/', 
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validarCampos
  ],
  crearEvento);

// Actualizar evento
router.put('/:id', actualizarEvento);

// Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;
