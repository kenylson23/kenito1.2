import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStoreSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Store routes
  app.get("/api/stores", async (req, res) => {
    try {
      const { province, city, search } = req.query;
      
      let stores;
      if (search && typeof search === 'string') {
        stores = await storage.searchStores(search);
      } else if (province && typeof province === 'string') {
        stores = await storage.getStoresByProvince(province);
      } else if (city && typeof city === 'string') {
        stores = await storage.getStoresByCity(city);
      } else {
        stores = await storage.getAllStores();
      }
      
      res.json(stores);
    } catch (error) {
      console.error("Error fetching stores:", error);
      res.status(500).json({ error: "Failed to fetch stores" });
    }
  });

  app.get("/api/stores/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid store ID" });
      }
      
      const store = await storage.getStore(id);
      if (!store) {
        return res.status(404).json({ error: "Store not found" });
      }
      
      res.json(store);
    } catch (error) {
      console.error("Error fetching store:", error);
      res.status(500).json({ error: "Failed to fetch store" });
    }
  });

  app.post("/api/stores", async (req, res) => {
    try {
      const validatedData = insertStoreSchema.parse(req.body);
      const store = await storage.createStore(validatedData);
      res.status(201).json(store);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid store data", details: error.errors });
      }
      console.error("Error creating store:", error);
      res.status(500).json({ error: "Failed to create store" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
