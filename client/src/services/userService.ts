import type { User, InsertUser } from '@shared/schema'

// Dados estáticos dos usuários
const staticUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123'
  },
  {
    id: 2,
    username: 'kenito_user',
    password: 'kenito2024'
  }
];

export class UserService {
  // Listar todos os usuários
  static async getAllUsers(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...staticUsers];
  }

  // Buscar usuário por ID
  static async getUser(id: number): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return staticUsers.find(user => user.id === id) || null;
  }

  // Buscar usuário por username
  static async getUserByUsername(username: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return staticUsers.find(user => user.username === username) || null;
  }

  // Criar novo usuário (simulado)
  static async createUser(user: InsertUser): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Verificar se username já existe
    const existingUser = staticUsers.find(u => u.username === user.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }
    
    const newUser: User = {
      id: staticUsers.length + 1,
      ...user
    };
    
    staticUsers.push(newUser);
    return newUser;
  }

  // Atualizar usuário (simulado)
  static async updateUser(id: number, updates: Partial<InsertUser>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const userIndex = staticUsers.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Verificar se o novo username já existe (se estiver sendo atualizado)
    if (updates.username) {
      const existingUser = staticUsers.find(u => u.username === updates.username && u.id !== id);
      if (existingUser) {
        throw new Error('Username already exists');
      }
    }
    
    staticUsers[userIndex] = { ...staticUsers[userIndex], ...updates };
    return staticUsers[userIndex];
  }

  // Deletar usuário (simulado)
  static async deleteUser(id: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const userIndex = staticUsers.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    staticUsers.splice(userIndex, 1);
  }
}