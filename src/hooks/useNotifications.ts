import { useEffect, useState } from 'react';
import { useInventory } from './useInventory';
import { useTasks } from './useTasks';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'Warning' | 'Urgent' | 'Success' | 'Info';
  timestamp: string;
  read: boolean;
}

export function useNotifications() {
  const { inventory } = useInventory();
  const { tasks } = useTasks();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    const newNotifications: AppNotification[] = [];

    // Check inventory for critical stock
    inventory.forEach(item => {
      if (item.stock <= item.min_threshold) {
        newNotifications.push({
          id: `inv-${item.id}`,
          title: 'Critical Stock Alert',
          message: `${item.name} is below threshold (${item.stock} ${item.unit} remaining).`,
          type: item.stock === 0 ? 'Urgent' : 'Warning',
          timestamp: new Date().toISOString(),
          read: false
        });
      }
    });

    // Check tasks for blocked status
    tasks.forEach(task => {
      if (task.status === 'Blocked') {
        newNotifications.push({
          id: `task-${task.id}`,
          title: 'Task Blocked',
          message: `Task "${task.title}" has been flagged as blocked.`,
          type: 'Urgent',
          timestamp: new Date().toISOString(),
          read: false
        });
      }
    });

    setNotifications(newNotifications);
  }, [inventory, tasks]);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return { notifications, markAsRead };
}
