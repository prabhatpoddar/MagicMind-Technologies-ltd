import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ targetDate }) => {
    const targetTime = new Date(targetDate).getTime();
    const [timeRemaining, setTimeRemaining] = useState(targetTime - new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const remaining = targetTime - now;

            if (remaining <= 0) {
                clearInterval(interval);
                setTimeRemaining(0);
            } else {
                setTimeRemaining(remaining);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetTime]);

    const formatTime = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000) % 60;
        const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
        const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
        const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const getFormattedDate = () => {
        if (timeRemaining > 0) {
            return formatTime(timeRemaining);
        } else {
            const endDate = new Date(targetTime);
            const day = endDate.getDate();
            const month = endDate.getMonth() + 1;
            const year = endDate.getFullYear();
            return `${month}/${day}/${year}`;
        }
    };

    return (
        <div>
            {getFormattedDate()}
        </div>
    );
};

export default CountdownTimer;
