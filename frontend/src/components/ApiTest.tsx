import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';
import { apiService, type Item } from '../services/api';
import { Trash2, Edit, Plus, RefreshCw, CheckCircle, Circle } from 'lucide-react';

export function ApiTest() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  
  // Form state
  const [newItem, setNewItem] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  // Check backend connection
  const checkBackendStatus = async () => {
    try {
      setBackendStatus('checking');
      await apiService.healthCheck();
      setBackendStatus('connected');
    } catch (error) {
      setBackendStatus('disconnected');
    }
  };

  // Load items
  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getItems();
      if (response.success && response.data) {
        setItems(response.data);
      }
    } catch (error) {
      setError('Failed to load items. Make sure the backend is running on port 3001.');
    } finally {
      setLoading(false);
    }
  };

  // Create item
  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title.trim() || !newItem.description.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const response = await apiService.createItem(newItem);
      if (response.success) {
        setSuccess('Item created successfully!');
        setNewItem({ title: '', description: '' });
        loadItems();
      }
    } catch (error) {
      setError('Failed to create item');
    } finally {
      setLoading(false);
    }
  };

  // Update item
  const handleUpdateItem = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.updateItem(id, editForm);
      if (response.success) {
        setSuccess('Item updated successfully!');
        setEditingId(null);
        setEditForm({ title: '', description: '' });
        loadItems();
      }
    } catch (error) {
      setError('Failed to update item');
    } finally {
      setLoading(false);
    }
  };

  // Toggle completion
  const handleToggleComplete = async (item: Item) => {
    try {
      setError(null);
      await apiService.updateItem(item.id, { completed: !item.completed });
      loadItems();
    } catch (error) {
      setError('Failed to update item');
    }
  };

  // Delete item
  const handleDeleteItem = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.deleteItem(id);
      if (response.success) {
        setSuccess('Item deleted successfully!');
        loadItems();
      }
    } catch (error) {
      setError('Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  // Start editing
  const startEditing = (item: Item) => {
    setEditingId(item.id);
    setEditForm({ title: item.title, description: item.description });
  };

  useEffect(() => {
    checkBackendStatus();
    loadItems();
  }, []);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            API Test Dashboard
            <div className="flex items-center gap-2">
              <Badge 
                variant={backendStatus === 'connected' ? 'default' : 'destructive'}
                className="flex items-center gap-1"
              >
                <div 
                  className={`w-2 h-2 rounded-full ${
                    backendStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'
                  }`} 
                />
                {backendStatus === 'checking' ? 'Checking...' : 
                 backendStatus === 'connected' ? 'Backend Connected' : 'Backend Disconnected'}
              </Badge>
              <Button variant="outline" size="sm" onClick={checkBackendStatus}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Testing the connection between frontend and backend. Make sure to run the backend on port 3001.
          </CardDescription>
        </CardHeader>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription className="text-green-600">{success}</AlertDescription>
        </Alert>
      )}

      {/* Create New Item */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateItem} className="space-y-4">
            <Input
              placeholder="Item title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            />
            <Textarea
              placeholder="Item description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            />
            <Button type="submit" disabled={loading} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Create Item
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Items List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Items ({items.length})
            <Button variant="outline" size="sm" onClick={loadItems} disabled={loading}>
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading && items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">Loading items...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No items found. Create one above!
            </div>
          ) : (
            items.map((item) => (
              <Card key={item.id} className="p-4">
                {editingId === item.id ? (
                  <div className="space-y-3">
                    <Input
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    />
                    <Textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleUpdateItem(item.id)}>
                        Save
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => handleToggleComplete(item)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <h3 className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {item.title}
                        </h3>
                        <p className={`text-sm ${item.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                          {item.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Created: {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEditing(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
} 