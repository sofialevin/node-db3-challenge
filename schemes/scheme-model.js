const db = require('../data/db-config.js');

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
        .where({ id })
        .first();
}

function findSteps(id) {
    return db('steps')
        .join('schemes', 'schemes.id', 'steps.scheme_id')
        .select('steps.id as id', 'schemes.scheme_name as scheme_name', 'steps.step_number as step_number', 'steps.instructions as instructions')
        .where({ scheme_id: id })
        .orderBy("steps.step_number");
}

function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then(res => {
            const id = res[0];
            return db("schemes").where({ id });
          });
}

function update(changes, id) {
    return db('schemes')
        .where({ id })
        .update(changes)
        .then(() => {
            return db("schemes").where({ id });
          });
}

async function remove(id) {
    const deleted = await db("schemes").where({ id })
    if (deleted) {
        db("schemes").where({ id }).del();
        return deleted
    } else {
        return null
    }
}

function addStep(step, scheme_id) {
    const newStep = {...step, scheme_id: scheme_id}
    return db('steps')
        .insert(newStep)
        .then(res => {
            const id = res[0];
            return db("steps").where({ id });
          });
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
};