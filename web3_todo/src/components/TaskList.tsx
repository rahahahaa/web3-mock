import React from 'react';
import { Check, Square, CheckSquare } from 'lucide-react';
import { Task } from '../hooks/useEthereum';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
}

export function TaskList({ tasks, onToggle }: TaskListProps) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => onToggle(task.id)}
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            {task.completed ? (
              <CheckSquare className="w-6 h-6" />
            ) : (
              <Square className="w-6 h-6" />
            )}
          </button>
          <span
            className={`flex-1 ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}
          >
            {task.content}
          </span>
        </div>
      ))}
    </div>
  );
}