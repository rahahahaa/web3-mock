import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { mockContract } from '../utils/mockContract';

export interface Task {
  id: number;
  content: string;
  completed: boolean;
}

const MOCK_ADDRESS = '0xMockAddress123';

export function useEthereum() {
  const [account, setAccount] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const connectWallet = useCallback(async () => {
    try {
      // Simulate wallet connection
      setAccount(MOCK_ADDRESS);
      toast.success('Mock wallet connected!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect mock wallet');
    }
  }, []);

  const loadTasks = useCallback(async () => {
    try {
      const result = await mockContract.getTasks(MOCK_ADDRESS);
      setTasks(result);
    } catch (error) {
      console.error('Error loading tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(async (content: string) => {
    try {
      await mockContract.createTask(MOCK_ADDRESS, content);
      toast.success('Task added successfully!');
      await loadTasks();
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
    }
  }, [loadTasks]);

  const toggleTask = useCallback(async (id: number) => {
    try {
      await mockContract.toggleTask(MOCK_ADDRESS, id);
      toast.success('Task updated successfully!');
      await loadTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
      toast.error('Failed to update task');
    }
  }, [loadTasks]);

  useEffect(() => {
    if (account) {
      loadTasks();
    }
  }, [account, loadTasks]);

  return {
    account,
    tasks,
    loading,
    connectWallet,
    addTask,
    toggleTask,
  };
}