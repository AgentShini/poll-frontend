import React, { useState } from 'react';
import axios from 'axios';

function CreatePoll() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [duration, setDuration] = useState(5);

    const handleAddOption = () => setOptions([...options, '']);
    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/polls', {
                question,
                options: options.map(option => ({ text: option })),
                endTime: new Date(Date.now() + duration * 60000).toISOString(),
            });
            setQuestion('');
            setOptions(['', '']);
            setDuration(5);
            alert('Poll created successfully!');
        } catch (error) {
            alert('Error creating poll');
        }
    };

    return (
        <div className="card">
            <h2>Create a New Poll</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                />
                {options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        required
                    />
                ))}
                <button type="button" onClick={handleAddOption}>
                    Add Option
                </button>
                <input
                    type="number"
                    placeholder="Voting duration in minutes"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    min="1"
                    max="1440"
                    required
                />
                <button type="submit">Create Poll</button>
            </form>
        </div>
    );
}

export default CreatePoll;

