const USERNAME_KEY = "username";

const LocalStorage = {
  setUsername: (username: string) =>
    localStorage.setItem(USERNAME_KEY, username),
  getUsername: (): string | null => localStorage.getItem(USERNAME_KEY),
  removeUsername: () => localStorage.removeItem(USERNAME_KEY),
};

export default LocalStorage;
