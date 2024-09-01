import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import PollList from './components/PollList';
import PollAnalytics from './components/PollAnalytics';
import CreatePoll from './components/CreatePoll';

function App() {
    const [polls, setPolls] = useState([]);
    const [selectedPollId, setSelectedPollId] = useState(null); // For analytics
    const [chartData, setChartData] = useState(null);
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        const fetchPolls = async () => {
            const res = await axios.get('http://localhost:5000/api/polls');
            setPolls(res.data);
            if (res.data.length > 0) {
                fetchAnalytics(res.data[0]._id); // Fetch analytics for the first poll by default
                updateChartData(res.data); // Initialize chart data
            }
        };

        fetchPolls();

        // Real-time updates with WebSocket
        const ws = new WebSocket('ws://localhost:5000');
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'voteUpdated') {
                fetchPolls();
            }
        };

        return () => ws.close();
    }, []);

    const fetchAnalytics = async (pollId) => {
        const res = await axios.get(`http://localhost:5000/api/polls/analytics/${pollId}`);
        setAnalytics(res.data); // Set the analytics data
    };

    const updateChartData = (polls) => {
        if (polls.length === 0) return;

        const labels = polls[0].options.map((option) => option.text);
        const data = polls[0].options.map((option) => option.votes);

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Votes',
                    data,
                    backgroundColor: ['#000', '#666', '#aaa', '#333', '#888'],
                    borderColor: '#000',
                    borderWidth: 2,
                },
            ],
        });
    };

    return (
        <div className="container">
            <h1>Retro Polling App</h1>
            <CreatePoll />
            <PollList polls={polls} onSelectPoll={setSelectedPollId} />
            {chartData && <PollAnalytics chartData={chartData} analytics={analytics} />}
        </div>
    );
}

export default App;
