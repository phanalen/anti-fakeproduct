// Mock MetaMask
if (typeof window.ethereum === 'undefined') {
  console.log('Injecting mock MetaMask...');
  window.ethereum = {
    isMetaMask: true,
    isConnected: () => true,
    request: async ({ method, params }) => {
      console.log('Mock MetaMask request:', method, params);
      
      const accounts = ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'];
      
      switch (method) {
        case 'eth_requestAccounts':
          return accounts;
        case 'eth_accounts':
          return accounts;
        case 'eth_chainId':
          return '0x7a69'; // 31337
        case 'personal_sign':
          return '0x1234567890abcdef';
        default:
          console.warn('Unhandled method:', method);
          return null;
      }
    },
    on: () => {},
    removeListener: () => {}
  };
}
