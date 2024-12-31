/* eslint-disable @typescript-eslint/no-unused-vars */
import Dexie, { type EntityTable } from 'dexie';

type PersistedStudioCategoryColorItemType = {
  key: string;
  color: string;
  createdAt?: string;
};

class CategoryColorDatabase {
  private databaseName = 'studio-category-color';
  private db;
  constructor() {
    try {
      this.db = new Dexie(this.databaseName) as Dexie & {
        category: EntityTable<PersistedStudioCategoryColorItemType, 'key'>;
      };

      // for version 1
      this.db.version(1).stores({
        category: 'key, color, createdAt',
      });
    } catch (e) {
      //
    }
  }

  private async getItem(key: string) {
    try {
      return await this.db?.category.get(key);
    } catch (e) {
      //
    }

    return null;
  }

  public async getAllItemsToMap() {
    try {
      const allItems = await this.db?.category.toArray();
      if (allItems) {
        return allItems.reduce((acc: Record<string, string>, item) => {
          acc[item.key] = item.color;

          return acc;
        }, {});
      }
    } catch (e) {
      //
    }

    return {};
  }

  private async addItem(newItem: PersistedStudioCategoryColorItemType) {
    try {
      await this.db?.category.add({
        ...newItem,
        createdAt: new Date().toISOString(),
      });

      return newItem;
    } catch (e) {
      //
    }

    return null;
  }

  private async updateItem(updatedItem: PersistedStudioCategoryColorItemType) {
    try {
      await this.db?.category.update(updatedItem.key, updatedItem);

      return updatedItem;
    } catch (e) {
      //
    }

    return null;
  }

  async upsertItem(item: PersistedStudioCategoryColorItemType) {
    try {
      const persisted = await this.getItem(item.key);
      if (persisted) {
        return this.updateItem(item);
      } else {
        return this.addItem(item);
      }
    } catch (e) {
      //
    }

    return null;
  }
}

const categoryColorDatabase = new CategoryColorDatabase();
export default categoryColorDatabase;