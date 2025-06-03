export const mockUsers = [
  {
    id: '1',
    username: 'demo',
    email: 'demo@prosolartec.com',
    password: 'demo' // In real app: hashed
  }
];

export const authResponses = {
  success: (user: any) => ({
    success: true,
    user: { 
      id: user.id,
      username: user.username,
      email: user.email,
      isAuthenticated: true
    },
    token: 'mock-jwt-token-' + Date.now(),
    message: 'Login erfolgreich'
  }),
  failure: {
    success: false,
    message: 'Ungültiger Benutzername oder Passwort'
  }
};