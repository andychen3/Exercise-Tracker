import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Navigation from '../components/Navigation';

export const EditExercisePage = ({ exerciseToEdit }) => {

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory();

    const editExercise = async () => {
        const editedExercise = { name, reps, weight, unit, date };
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert('Successfully edited the exercise');
        } else {
            alert('Failed to edit exercise. Please try again.')
        };
        history.push('/');
    };

    return (
        <div>
            <header>
                <h1>Edit Exercise</h1>
                <p>You can edit an existing exercise</p>
                <Navigation></Navigation>
            </header>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select value={unit} onChange={e => setUnit(e.target.value)}>
                <option value={"kgs"}>kgs</option>
                <option value={"lbs"}>lbs</option>
            </select>
            <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button class="save-button"
                onClick={editExercise}
            >Save</button>
        </div>
    );
}

export default EditExercisePage;