//controllers for events

const { response } = require('express');
const Event = require('../models/event');

/**
 * Event controllers
 *
 * - getEvents(req, res): retrieves all events for the authenticated user.
 *   Input: req.uid (set by JWT validation middleware).
 *   Output: { ok, events } where events is an array of event objects.
 * 
 * - getAllEvents(req, res): retrieves all the events from all users. Only for admin users
 *   Input: (req.uid) (set by JWT validation middleware) // TO DO
 *   Output: {ok, events} where events is an array of event objects
 *
 * - createEvent(req, res): creates a new event for the authenticated user.
 *   Input: req.uid and req.name (set by JWT validation middleware), and
 *          { title, start, end, notes } in req.body.
 *   Output: 201 with { ok, event } on success, 400/500 on error.
 *
 * - updateEvent(req, res): updates an existing event owned by the user.
 *   Input: req.uid (set by JWT validation middleware), event id in req.params.id,
 *          and { title, start, end, notes } in req.body.
 *  Output: { ok, event } on success, 404 if event not found, 401 if not owner.
 *
 * - deleteEvent(req, res): deletes an existing event owned by the user.
 *   Input: req.uid (set by JWT validation middleware) and event id in req.params.id.
 *   Output: { ok } on success, 404 if event not found, 401 if not owner.
 */

const getEvents = async (req, res = response) => {
    const events = await Event.find({ user: req.uid }).populate('user', 'name');
    res.json({ ok: true, events });
}

const getAllEvents = async (req, res = response) => {
    const events = await Event.find().populate('user', 'name');
    res.json({ ok: true, events });
}


const createEvent = async (req, res = response) => {
    const event = new Event(req.body);
    event.user = req.uid;
    console.log('Creating event:', event);
    console.log('Event user ID:', event.user);

    try {
        await event.save();
        res.status(201).json({ ok: true, event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: 'Error creating event' });
    }
}

const updateEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ ok: false, msg: 'Event not found' });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({ ok: false, msg: 'Unauthorized' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
        res.json({ ok: true, event: updatedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: 'Error updating event' });
    }
}

const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ ok: false, msg: 'Event not found' });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({ ok: false, msg: 'Unauthorized' });
        }

        await Event.findByIdAndDelete(eventId);
        res.json({ ok: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: 'Error deleting event' });
    }
}

module.exports = {
    getEvents,
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent
}