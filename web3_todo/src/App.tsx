import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Wallet, Plus } from 'lucide-react';
import { useEthereum } from './hooks/useEthereum';
import { TaskList } from './components/TaskList';

function App() {
  const { account, tasks, loading, connectWallet, addTask, toggleTask } = useEthereum();
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask('');
    }
  };

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">SR To-Do</h1>
          <p className="text-gray-600 mb-6">Your To-Do List, Powered by Blockchain.</p>
          <button
            onClick={connectWallet}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Wallet className="w-5 h-5" />
            Connect & Balance Your Tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Web3 Todo List</h1>
            <div className="text-sm text-gray-600">
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </form>

          {loading ? (
            <div className="text-center text-gray-600">Loading tasks...</div>
          ) : (
            <TaskList tasks={tasks} onToggle={toggleTask} />
          )}
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;