
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskCategory, TaskPriority } from '@/types/task';
import { useToast } from '@/components/ui/use-toast';

interface TaskContextType {
  tasks: Task[];
  categories: TaskCategory[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  addCategory: (category: Omit<TaskCategory, 'id'>) => void;
  deleteCategory: (id: string) => void;
}

const defaultCategories: TaskCategory[] = [
  { id: '1', name: 'Work', color: '#4299E1' },
  { id: '2', name: 'Personal', color: '#ED8936' },
  { id: '3', name: 'Learning', color: '#38B2AC' },
  { id: '4', name: 'Health', color: '#9F7AEA' },
];

const defaultTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finish the quarterly project proposal for the management team',
    completed: false,
    priority: 'high',
    category: defaultCategories[0],
    dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Schedule dentist appointment',
    description: 'Call the dentist office to schedule a routine cleaning',
    completed: true,
    priority: 'medium',
    category: defaultCategories[1],
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: '3',
    title: 'Complete React tutorial',
    description: 'Finish the advanced React hooks tutorial',
    completed: false,
    priority: 'medium',
    category: defaultCategories[2],
    dueDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
    createdAt: new Date(),
  },
  {
    id: '4',
    title: 'Go for a 30-minute run',
    description: 'Complete a 30-minute jogging session in the park',
    completed: false,
    priority: 'low',
    category: defaultCategories[3],
    dueDate: new Date(Date.now()), // Today
    createdAt: new Date(),
  },
];

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [categories, setCategories] = useState<TaskCategory[]>(defaultCategories);
  const { toast } = useToast();

  // For more complex apps, we would use localStorage or a backend API
  // This is a simplified implementation for demo purposes
  useEffect(() => {
    // Initialize from localStorage if we were to implement persistence
  }, []);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setTasks((prev) => [newTask, ...prev]);
    toast({
      title: "Task created",
      description: "Your task has been successfully added",
    });
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks((prev) => 
      prev.map((task) => 
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
    toast({
      title: "Task updated",
      description: "Your task has been successfully updated",
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "Your task has been successfully removed",
    });
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prev) => 
      prev.map((task) => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addCategory = (category: Omit<TaskCategory, 'id'>) => {
    const newCategory: TaskCategory = {
      ...category,
      id: Date.now().toString()
    };
    
    setCategories((prev) => [...prev, newCategory]);
    toast({
      title: "Category created",
      description: "Your category has been successfully added",
    });
  };

  const deleteCategory = (id: string) => {
    // Update tasks that have this category
    setTasks((prev) => 
      prev.map((task) => 
        task.category?.id === id ? { ...task, category: undefined } : task
      )
    );
    
    // Remove the category
    setCategories((prev) => prev.filter((category) => category.id !== id));
    toast({
      title: "Category deleted",
      description: "Your category has been successfully removed",
    });
  };

  const value = {
    tasks,
    categories,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    addCategory,
    deleteCategory
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  
  return context;
};
