const _ = require('lodash');

// WARNING: beware object mutable

/**
 * @params {Object} store
 * @params {String} name
 * @params {Object} scores
 * @params {Number} scores{key}
 */
exports.updateStudentScore = (store, { name, scores }) => {

    let newStore = _.cloneDeep(store);
    let newHash = _.keyBy(store, 'subject');

    for(let subject in scores) {
        if (!newHash.hasOwnProperty(subject)) {
            newStore = [].concat(newStore, { subject: subject, students:[{ name: name, score: scores[subject]}]})
        }
    }

    newStore.map((item) => {

        let newStudent = true;
        item.students.map((student) => {
            if (student.name === name) {
                student.score = scores[item.subject];
                newStudent = false;
            }
        });

        if (newStudent && scores.hasOwnProperty(item.subject)) {
            item.students = [].concat(item.students, { name: name, score: scores[item.subject]});
        }
    });

    return newStore;
};

/**
 * @params {Object} store
 * @params {String} name
 * @params {String} subject
 */
exports.removeStudentScoreBySubject = (store, { name, subject }) => {

    let newStore = _.cloneDeep(store);
    newStore.map((item) => {
        if (item.subject === subject) {
            item.students = item.students.filter((student) => student.name !== name);
        }
    });
    return newStore;
};

/**
 * @params {Object} store
 */
exports.transformData = store => {
    // code here
};
