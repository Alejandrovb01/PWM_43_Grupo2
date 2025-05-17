import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection
} from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db: SQLiteDBConnection | null = null;
  private dbName = 'favorites_db';

  constructor() {}

  async initDb(): Promise<void> {
    if (this.db && (await this.db.isDBOpen())) {
      return; // Ya está abierta
    }

    try {
      const conn = await this.sqlite.createConnection(
        this.dbName,
        false,
        'no-encryption',
        1,
        false
      );
      await conn.open();
      await conn.execute(`
        CREATE TABLE IF NOT EXISTS favorites (
          id TEXT PRIMARY KEY,
          name TEXT,
          description TEXT,
          image TEXT,
          category TEXT,
          price REAL
        );
      `);
      this.db = conn;
    } catch (err) {
      console.error('❌ Error inicializando SQLite:', err);
    }
  }

  async addToFavorites(dish: any): Promise<void> {
    await this.initDb();

    if (!this.db) return;

    const stmt = `
      INSERT OR REPLACE INTO favorites (id, name, description, image, category, price)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [dish.id, dish.name, dish.description, dish.image, dish.category, dish.price];
    await this.db.run(stmt, values);
  }

  async removeFromFavorites(id: string): Promise<void> {
    await this.initDb();
    if (!this.db) return;

    await this.db.run('DELETE FROM favorites WHERE id = ?', [id]);
  }

  async isFavorite(id: string): Promise<boolean> {
    await this.initDb();
    if (!this.db) return false;

    const result = await this.db.query('SELECT id FROM favorites WHERE id = ?', [id]);
    return Array.isArray(result.values) && result.values.length > 0;

  }

  async getAllFavorites(): Promise<any[]> {
    await this.initDb();
    if (!this.db) return [];

    const result = await this.db.query('SELECT * FROM favorites');
    return result.values ?? [];
  }
}
