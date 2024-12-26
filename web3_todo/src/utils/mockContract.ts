interface Task {
  id: number;
  content: string;
  completed: boolean;
}

interface TaskStore {
  [address: string]: Task[];
}

class MockContract {
  private tasks: TaskStore = {};
  private taskCounts: { [address: string]: number } = {};

  async getTasks(address: string): Promise<Task[]> {
    return this.tasks[address] || [];
  }

  async createTask(address: string, content: string): Promise<void> {
    if (!this.tasks[address]) {
      this.tasks[address] = [];
      this.taskCounts[address] = 0;
    }

    const taskId = this.taskCounts[address];
    this.tasks[address].push({
      id: taskId,
      content,
      completed: false
    });
    this.taskCounts[address]++;

    // Simulate blockchain delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async toggleTask(address: string, id: number): Promise<void> {
    const userTasks = this.tasks[address];
    if (!userTasks) throw new Error("No tasks found");

    const task = userTasks.find(t => t.id === id);
    if (!task) throw new Error("Task not found");

    task.completed = !task.completed;

    // Simulate blockchain delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

export const mockContract = new MockContract();