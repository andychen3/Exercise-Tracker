import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true, min: 1 },
    weight: { type: Number, required: true, min: 1 },
    unit: { type: String, required: true, enum: ['kgs', 'lbs'], lowercase: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercises = mongoose.model("Exercises", exerciseSchema);

// Function that creates new instances of the class Exercises
const createExercises = async (name, reps, weight, unit, date) => {
    const exercises = new Exercises({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    if (isNameValid(exercises.name) === false || isRepsValid(exercises.reps) === false || isWeightValid(exercises.weight) === false
        || isUnitValid(exercises.unit) === false || isDateValid(exercises.date) === false) {
        return null
    } else {
        return exercises.save();
    };
};

// Function that finds an exercise by ID
const findExerciseByID = async (_id) => {
    const query = Exercises.findById(_id);
    return query.exec();
};

// Function that finds all exercises
const findExercises = async (filter, projection, limit) => {
    const query = Exercises.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
};

// Function that updates an exercise
const updateExercises = async (_id, name, reps, weight, unit, date) => {
    if (isNameValid(name) === false || isRepsValid(reps) === false || isWeightValid(weight) === false
        || isUnitValid(unit) === false || isDateValid(date) === false) {
        return null
    } else {
        const result = await Exercises.updateOne({ _id: _id }, { name: name, reps: reps, weight: weight, unit: unit, date: date });
        return result.modifiedCount;
    };
};

// Function that deletes an exercise
const deleteByID = async (_id) => {
    const deletedResult = await Exercises.deleteOne({ _id: _id });
    return deletedResult.deletedCount;
};

// Function to validate name
function isNameValid(name) {
    if (name !== null && name !== '' && name.length >= 1 && name !== ' ') {
        return true
    } else {
        return false
    };
};


// Function to validate reps
function isRepsValid(reps) {
    if (typeof(Number(reps)) === 'number' && reps >= 1) {
        return true
    } else {
        return false
    };
};


// Function to validate weight
function isWeightValid(weight) {
    if (typeof(Number(weight)) === 'number' && weight >= 1) {
        return true
    } else {
        return false
    };
};


// Function to validate units
function isUnitValid(unit) {
    if (unit === 'kgs' || unit === 'lbs') {
        return true
    } else {
        return false
    };
};

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
};

// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export { createExercises, findExerciseByID, findExercises, updateExercises, deleteByID };