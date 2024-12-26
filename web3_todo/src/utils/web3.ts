import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';

export async function getProvider() {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed');
  }
  return new ethers.BrowserProvider(window.ethereum);
}

export async function getContract() {
  if (!CONTRACT_ADDRESS) {
    throw new Error('Contract address not configured');
  }
  
  const provider = await getProvider();
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

export async function requestAccount() {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed');
  }
  
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  return accounts[0];
}