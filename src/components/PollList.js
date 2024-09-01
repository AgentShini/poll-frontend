import React from 'react';

function PollList({ polls, onSelectPoll }) {
    return (
        <div>
            {polls.map((poll) => (
                <div key={poll._id} className="card" onClick={() => onSelectPoll(poll._id)}>
                    <h2>{poll.question}</h2>
                    <ul>
                        {poll.options.map((option, index) => (
                            <li key={index}>
                                {option.text}: {option.votes} votes
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default PollList;
