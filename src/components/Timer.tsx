import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useQuestionStore } from '../store/useQuestionStore';

interface TimerProps {
  questionId: string;
  initialTime: number;
}

export function Timer({ questionId, initialTime }: TimerProps) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const updateTimer = useQuestionStore((state) => state.updateTimer);

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
        updateTimer(questionId, time);
      }
    };
  }, [isRunning, questionId, time, updateTimer]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    updateTimer(questionId, 0);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
      <div className="font-mono text-lg">{formatTime(time)}</div>
      <button
        onClick={toggleTimer}
        className="p-1 rounded hover:bg-gray-200"
        title={isRunning ? 'Pause' : 'Start'}
      >
        {isRunning ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </button>
      <button
        onClick={resetTimer}
        className="p-1 rounded hover:bg-gray-200"
        title="Reset"
      >
        <RotateCcw className="h-5 w-5" />
      </button>
    </div>
  );
}