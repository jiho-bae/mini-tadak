export const LocalStorage = (function () {
  const setAuthFlag = () => localStorage.setItem('auth', 'auth');

  const removeAuthFlag = () => localStorage.removeItem('auth');

  const validateAuthFlag = () => {
    const authFlag = localStorage.getItem('auth');
    if (!authFlag) return false;
    return true;
  };

  return { setAuthFlag, removeAuthFlag, validateAuthFlag };
})();
