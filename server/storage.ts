import { users, stores, type User, type InsertUser, type Store, type InsertStore } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or } from "drizzle-orm";
import { TempStorage } from "./temp-storage";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Store methods
  getAllStores(): Promise<Store[]>;
  getStoresByProvince(province: string): Promise<Store[]>;
  getStoresByCity(city: string): Promise<Store[]>;
  searchStores(query: string): Promise<Store[]>;
  createStore(store: InsertStore): Promise<Store>;
  getStore(id: number): Promise<Store | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllStores(): Promise<Store[]> {
    return await db.select().from(stores);
  }

  async getStoresByProvince(province: string): Promise<Store[]> {
    return await db.select().from(stores).where(eq(stores.province, province));
  }

  async getStoresByCity(city: string): Promise<Store[]> {
    return await db.select().from(stores).where(eq(stores.city, city));
  }

  async searchStores(query: string): Promise<Store[]> {
    return await db.select().from(stores).where(
      or(
        ilike(stores.name, `%${query}%`),
        ilike(stores.address, `%${query}%`),
        ilike(stores.city, `%${query}%`)
      )
    );
  }

  async createStore(insertStore: InsertStore): Promise<Store> {
    const [store] = await db
      .insert(stores)
      .values(insertStore)
      .returning();
    return store;
  }

  async getStore(id: number): Promise<Store | undefined> {
    const [store] = await db.select().from(stores).where(eq(stores.id, id));
    return store || undefined;
  }
}

// Use TempStorage quando o banco local não estiver disponível
export const storage = db ? new DatabaseStorage() : new TempStorage();
