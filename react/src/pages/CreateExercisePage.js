import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Navigation from '../components/Navigation';

export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert('Successfully added the exercise');
        } else {
            alert('Failed to add exercise. Please try again.')
        };
        history.push('/');

    };

    return (
        <div>
            <header>
                <h1>Add Exercise</h1>
                <p>You can add a new exercise to the tracker</p>
                <Navigation></Navigation>
            </header>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select value={unit} onChange={e => setUnit(e.target.value)}>
                <option value={"kgs"}>kgs</option>
                <option value={"lbs"}>lbs</option>
            </select>
            <input
                type="text"
                placeholder="Date: MM-DD-YY"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button class="save-button"
                onClick={addExercise}
            >Save</button>
        </div>
    );
}

export default CreateExercisePage;