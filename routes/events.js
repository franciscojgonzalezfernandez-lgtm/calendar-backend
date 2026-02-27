// Routes for managing events
// Host + /api/events

const express = require('express');
const Router = express.Router;
const { check } = require('express-validator');
const { getEvents, getAllEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validateJWT);

//Get events
router.get("/", getEvents);

//Get ALL events
router.get("/all", getAllEvents);

//Create event
router.post("/new",
    [
        check('title', 'title is mandatory').not().isEmpty(),
        check('start', 'start date is mandatory and should be a date').custom(isDate),
        check('end', 'end date is mandatory and should be a date').custom(isDate),
        validateFields
    ],
    createEvent);

//Update event
router.put("/:id", updateEvent);

//Delete event
router.delete("/:id", deleteEvent);

module.exports = router; 