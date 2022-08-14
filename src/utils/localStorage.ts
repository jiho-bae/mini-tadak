export const LocalStorage = (function () {
  const setAuthFlag = () => localStorage.setItem('auth', 'auth');

  const removeAuthFlag = () => {
    console.log('remove user');
    localStorage.removeItem('auth');
  };

  const validateAuthFlag = () => {
    const authFlag = localStorage.getItem('auth');
    if (!authFlag) return false;
    return true;
  };

  return { setAuthFlag, removeAuthFlag, validateAuthFlag };
})();
