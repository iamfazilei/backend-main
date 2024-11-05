import React, { createContext, useState, useEffect } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [timers, setTimers] = useState({});

    const startTimer = (quizId, initialTime) => {
        setTimers((prevTimers) => {
            if (prevTimers[quizId]) return prevTimers; 
            const timer = setInterval(() => {
                setTimers((prevTimers) => {
                    const newTime = prevTimers[quizId] - 1;
                    if (newTime <= 0) {
                        clearInterval(timer);
                        return { ...prevTimers, [quizId]: 0 };
                    }
                    return { ...prevTimers, [quizId]: newTime };
                });
            }, 1000);
            return { ...prevTimers, [quizId]: initialTime };
        });
    };

    const stopTimer = (quizId) => {
        setTimers((prevTimers) => {
            clearInterval(prevTimers[quizId]);
            const { [quizId]: _, ...rest } = prevTimers;
            return rest;
        });
    };

    return (
        <TimerContext.Provider value={{ timers, startTimer, stopTimer }}>
            {children}
        </TimerContext.Provider>
    );
};