// Routes for managing events
// Host + /api/events

const express = require('express');
const Router = express.Router;
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

//Get events
router.get("/", validateJWT, getEvents);

//Create event
router.post("/",
    [
        validateJWT,
        check('title', 'title is mandatory').not().isEmpty(),
        check('start', 'start date is mandatory').not().isEmpty(),
        check('end', 'end date is mandatory').not().isEmpty(),
        validateFields
    ],
    createEvent);

//Update event
router.put("/:id", validateJWT, updateEvent);

//Delete event
router.delete("/:id", validateJWT, deleteEvent);

module.exports = router; 