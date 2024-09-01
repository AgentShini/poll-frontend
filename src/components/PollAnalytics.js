import React from 'react';
import { Pie } from 'react-chartjs-2';

function PollAnalytics({ chartData, analytics }) {
    return (
        <div className="chart-container">
            <h2>Poll Analytics</h2>
            <Pie
                data={chartData}
                options={{
                    plugins: {
                        legend: {
                            labels: {
                                color: '#000',
                                font: {
                                    family: 'Courier New',
                                },
                            },
                        },
                    },
                }}
            />
            {analytics && (
                <div className="card">
                    <h2>Analytics Overview</h2>
                    <p>Total Votes: {analytics.totalVotes}</p>
                    <p>
                        Most Voted Option: {analytics.mostVotedOption.text} (
                        {analytics.mostVotedOption.votes} votes, {analytics.mostVotedOption.percentage}
                        %)
                    </p>
                    <h3>Options Breakdown:</h3>
                    <ul>
                        {analytics.options.map((option, index) => (
                            <li key={index}>
                                {option.text}: {option.votes} votes ({option.percentage}%)
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default PollAnalytics;
