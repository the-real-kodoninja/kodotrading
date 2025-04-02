import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';

interface Web3ContextType {
  account: string | null;
  provider: Web3Provider | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  chainId: number | null;
  error: string | null;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 11155111], // Mainnet, Ropsten, Rinkeby, Goerli, Kovan, Sepolia
});

export const Web3ProviderComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { activate, deactivate, account, library, chainId, error } = useWeb3React<Web3Provider>();
  const [web3Error, setWeb3Error] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      await activate(injected);
      setWeb3Error(null);
    } catch (err) {
      setWeb3Error('Failed to connect wallet. Please ensure MetaMask is installed and try again.');
    }
  };

  const disconnectWallet = () => {
    deactivate();
    setWeb3Error(null);
  };

  useEffect(() => {
    if (error) {
      setWeb3Error(error.message);
    }
  }, [error]);

  return (
    <Web3Context.Provider
      value={{
        account,
        provider: library || null,
        connectWallet,
        disconnectWallet,
        chainId,
        error: web3Error,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
