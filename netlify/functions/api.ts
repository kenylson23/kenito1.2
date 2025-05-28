import { Handler } from '@netlify/functions';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { eq, ilike, or } from 'drizzle-orm';
import { z } from 'zod';
import ws from 'ws';

// Database schema
import { pgTable, text, serial, decimal, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

// Schema definitions
const stores = pgTable('stores', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  province: text('province').notNull(),
  phone: text('phone'),
  email: text('email'),
  latitude: decimal('latitude', { precision: 10, scale: 7 }),
  longitude: decimal('longitude', { precision: 10, scale: 7 }),
  type: text('type').notNull().default('retail'),
  openHours: text('open_hours'),
  createdAt: timestamp('created_at').defaultNow(),
});

const insertStoreSchema = createInsertSchema(stores).omit({
  id: true,
  createdAt: true,
});

type Store = typeof stores.$inferSelect;
type InsertStore = z.infer<typeof insertStoreSchema>;

// Database setup
neonConfig.webSocketConstructor = ws;

let db: any = null;

function getDb() {
  if (!db) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL must be set');
    }
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema: { stores } });
  }
  return db;
}

// Storage class
class DatabaseStorage {
  async getAllStores(): Promise<Store[]> {
    const database = getDb();
    return await database.select().from(stores);
  }

  async getStoresByProvince(province: string): Promise<Store[]> {
    const database = getDb();
    return await database.select().from(stores).where(eq(stores.province, province));
  }

  async getStoresByCity(city: string): Promise<Store[]> {
    const database = getDb();
    return await database.select().from(stores).where(eq(stores.city, city));
  }

  async searchStores(query: string): Promise<Store[]> {
    const database = getDb();
    return await database.select().from(stores).where(
      or(
        ilike(stores.name, `%${query}%`),
        ilike(stores.address, `%${query}%`),
        ilike(stores.city, `%${query}%`)
      )
    );
  }

  async createStore(insertStore: InsertStore): Promise<Store> {
    const database = getDb();
    const [store] = await database
      .insert(stores)
      .values(insertStore)
      .returning();
    return store;
  }

  async getStore(id: number): Promise<Store | undefined> {
    const database = getDb();
    const [store] = await database.select().from(stores).where(eq(stores.id, id));
    return store || undefined;
  }
}

const storage = new DatabaseStorage();

// API Handler
export const handler: Handler = async (event, context) => {
  const { httpMethod, path, queryStringParameters, body } = event;
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    // Health check
    if (path === '/.netlify/functions/api/health') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ status: 'ok' }),
      };
    }

    // Store routes
    if (path === '/.netlify/functions/api/stores') {
      if (httpMethod === 'GET') {
        const { province, city, search } = queryStringParameters || {};
        
        let stores;
        if (search) {
          stores = await storage.searchStores(search);
        } else if (province) {
          stores = await storage.getStoresByProvince(province);
        } else if (city) {
          stores = await storage.getStoresByCity(city);
        } else {
          stores = await storage.getAllStores();
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(stores),
        };
      }
      
      if (httpMethod === 'POST') {
        try {
          const validatedData = insertStoreSchema.parse(JSON.parse(body || '{}'));
          const store = await storage.createStore(validatedData);
          return {
            statusCode: 201,
            headers,
            body: JSON.stringify(store),
          };
        } catch (error) {
          if (error instanceof z.ZodError) {
            return {
              statusCode: 400,
              headers,
              body: JSON.stringify({ error: 'Invalid store data', details: error.errors }),
            };
          }
          throw error;
        }
      }
    }

    // Individual store by ID
    const storeIdMatch = path.match(/\.netlify\/functions\/api\/stores\/(\d+)/);
    if (storeIdMatch && httpMethod === 'GET') {
      const id = parseInt(storeIdMatch[1]);
      if (isNaN(id)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid store ID' }),
        };
      }
      
      const store = await storage.getStore(id);
      if (!store) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Store not found' }),
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(store),
      };
    }

    // Route not found
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Route not found' }),
    };

  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};