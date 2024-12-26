// Contract configuration
export const CONTRACT_ADDRESS = '0x...'; // Replace with your deployed contract address

export const CONTRACT_ABI = [
  "function createTask(string memory _content) public",
  "function toggleTask(uint _id) public",
  "function getTasks() public view returns (tuple(uint256 id, string content, bool completed)[] memory)",
  "event TaskCreated(address indexed owner, uint id, string content)",
  "event TaskCompleted(address indexed owner, uint id, bool completed)"
] as const;