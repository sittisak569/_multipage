const users = [
    { 
      user: 'user',
      password: 'pass',
      role: 'admin',
      token: 'user'
    }
  ];
  
  export function verifyUser(user, pass) {
    const userFound = users.find((u) => {
      return u.user === user && u.password === pass;
    });
  
    return userFound ? { role: userFound.role, token: userFound.token } : null;
  }
  
  export default users;