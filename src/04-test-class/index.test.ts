import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 1000;
    const newAccount = getBankAccount(balance);
    expect(newAccount.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 1000;
    const newAccount = getBankAccount(balance);
    const withdraw = () => newAccount.withdraw(balance + 100);
    expect(withdraw).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 1000;
    const account1 = getBankAccount(balance);
    const account2 = getBankAccount(0);
    const transfer = () => account1.transfer(balance + 100, account2);
    expect(transfer).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 1000;
    const newAccount = getBankAccount(balance);
    const transfer = () => newAccount.transfer(balance, newAccount);
    expect(transfer).toThrow();
  });

  test('should deposit money', () => {
    const amount = 1000;
    const newAccount = getBankAccount(amount);
    newAccount.deposit(amount);
    const newBalance = newAccount.getBalance();
    expect(newBalance).toBe(amount * 2);
  });

  test('should withdraw money', () => {
    const balance = 1000;
    const withdrawAmount = 100;
    const newAccount = getBankAccount(balance);
    newAccount.withdraw(100);
    const newBalance = newAccount.getBalance();
    expect(newBalance).toBe(balance - withdrawAmount);
  });

  test('should transfer money', () => {
    const balance = 1000;
    const transferAmount = 100;
    const account1 = getBankAccount(balance);
    const account2 = getBankAccount(0);
    account1.transfer(transferAmount, account2);
    const newBalance = account1.getBalance();
    expect(newBalance).toBe(balance - transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 1000;
    const newAccount = getBankAccount(balance);
    const fetchedBalance = await newAccount.fetchBalance();
    if (fetchedBalance !== null) {
      expect(fetchedBalance).resolves;
      expect(typeof fetchedBalance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 1000;
    const newAccount = getBankAccount(balance);
    const fetchedBalance = await newAccount.fetchBalance();
    const newBalance = newAccount.getBalance();

    if (fetchedBalance !== null) {
      expect(typeof fetchedBalance).toBe('number');
      expect(newBalance).not.toBe(balance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 1000;
    const newAccount = getBankAccount(balance);
    jest
      .spyOn(newAccount, 'fetchBalance')
      .mockImplementationOnce(() => Promise.resolve(null));

    const sync = async () => await newAccount.synchronizeBalance();
    expect(sync).rejects.toThrow(SynchronizationFailedError);
  });
});
