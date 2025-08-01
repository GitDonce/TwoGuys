import fs from 'fs';
import path from 'path';

export interface Item {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

class DataStorage {
  private dataDir: string;
  private itemsFile: string;

  constructor() {
    this.dataDir = path.join(__dirname, '../../data');
    this.itemsFile = path.join(this.dataDir, 'items.json');
    this.ensureDataDirectory();
  }

  private ensureDataDirectory(): void {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
    
    if (!fs.existsSync(this.itemsFile)) {
      this.writeItems(this.getInitialData());
    }
  }

  private getInitialData(): Item[] {
    return [
      {
        id: '1',
        title: 'Visit Vilnius Old Town',
        description: 'Explore the beautiful historic center of Vilnius',
        completed: false,
        createdAt: new Date('2024-01-15').toISOString()
      },
      {
        id: '2',
        title: 'Check out Utena Lakes',
        description: 'Visit the scenic lakes around Utena city',
        completed: true,
        createdAt: new Date('2024-01-10').toISOString()
      },
      {
        id: '3',
        title: 'Try Lithuanian cuisine',
        description: 'Sample traditional dishes like cepelinai and šaltibarščiai',
        completed: false,
        createdAt: new Date('2024-01-20').toISOString()
      }
    ];
  }

  readItems(): Item[] {
    try {
      const data = fs.readFileSync(this.itemsFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading items file:', error);
      const initialData = this.getInitialData();
      this.writeItems(initialData);
      return initialData;
    }
  }

  writeItems(items: Item[]): void {
    try {
      fs.writeFileSync(this.itemsFile, JSON.stringify(items, null, 2));
    } catch (error) {
      console.error('Error writing items file:', error);
      throw error;
    }
  }

  // Helper methods for common operations
  getAllItems(): Item[] {
    return this.readItems();
  }

  getItemById(id: string): Item | undefined {
    const items = this.readItems();
    return items.find(item => item.id === id);
  }

  addItem(item: Omit<Item, 'id' | 'createdAt' | 'completed'>): Item {
    const items = this.readItems();
    const newItem: Item = {
      id: (items.length + 1).toString(),
      title: item.title,
      description: item.description,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    items.push(newItem);
    this.writeItems(items);
    return newItem;
  }

  updateItem(id: string, updates: Partial<Pick<Item, 'title' | 'description' | 'completed'>>): Item | null {
    const items = this.readItems();
    const itemIndex = items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      return null;
    }
    
    items[itemIndex] = {
      ...items[itemIndex],
      ...updates
    };
    
    this.writeItems(items);
    return items[itemIndex];
  }

  deleteItem(id: string): Item | null {
    const items = this.readItems();
    const itemIndex = items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      return null;
    }
    
    const deletedItem = items.splice(itemIndex, 1)[0];
    this.writeItems(items);
    return deletedItem;
  }
}

// Export a singleton instance
export const dataStorage = new DataStorage(); 