const { people } = require('../data.js');

const getPeople = (req, res) => res.json(people);

const getPersonById = (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id));

    if (!person) {
        return res.status(404).json({
            message: 'That person was not found.'
        });
    }
    res.status(200).json(person);
};

const addPerson = (req, res) => {
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({success: false, message:'please provide name value'})
    }
    people.push({ id: people.length + 1, name: req.body.name });
    res.status(201).json({success: true, name: req.body.name });
}

const updatePerson = (req, res) => {
    const person = people.find((p) => p.id === parseInt(req.params.id));
    if (!person) {
        return res
            .status(404)
            .json({success: false, message:`That person was not found.`})
    }
    person.name = req.body.name || person.name;
    res.status(200).json(person);
}
  
const deletePerson = (req, res) => {
    const person = people.findIndex((p) => p.id === Number(req.params.id));
    if (person === -1) {
        return res
            .status(404)
            .json({success: false, message:`no person with id ${req.params.id}`})
    }
    people.splice(person, 1);
    res.status(200).json({message: 'Person deleted'});
};

module.exports = { 
    getPeople,
    getPersonById,
    addPerson,
    updatePerson,
    deletePerson
};