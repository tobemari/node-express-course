const express = require('express')
const router = express.Router()

const {
    getPeople,
    addPerson,
    getPerson,
    updatePerson,
    deletePerson,
} = require('../controllers/people')

router.route('/').get(getPeople).post(addPerson)
router.route('/:id').get(getPerson).put(updatePerson).delete(deletePerson)

module.exports = router