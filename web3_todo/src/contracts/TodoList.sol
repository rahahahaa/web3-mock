// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {
    struct Task {
        uint id;
        string content;
        bool completed;
    }

    mapping(address => Task[]) private tasks;
    mapping(address => uint) private taskCount;

    event TaskCreated(address indexed owner, uint id, string content);
    event TaskCompleted(address indexed owner, uint id, bool completed);

    function createTask(string memory _content) public {
        uint taskId = taskCount[msg.sender];
        tasks[msg.sender].push(Task(taskId, _content, false));
        taskCount[msg.sender]++;
        
        emit TaskCreated(msg.sender, taskId, _content);
    }

    function toggleTask(uint _id) public {
        require(_id < taskCount[msg.sender], "Task does not exist");
        tasks[msg.sender][_id].completed = !tasks[msg.sender][_id].completed;
        
        emit TaskCompleted(msg.sender, _id, tasks[msg.sender][_id].completed);
    }

    function getTasks() public view returns (Task[] memory) {
        return tasks[msg.sender];
    }
}