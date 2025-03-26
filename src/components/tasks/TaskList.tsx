
import React, { useState } from 'react';
import { Check, CalendarDays, List, ArrowUpDown, X } from 'lucide-react';
import { useTaskContext } from '@/contexts/TaskContext';
import TaskCard from './TaskCard';
import Chip from '../ui/Chip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaskCategory, TaskPriority } from '@/types/task';
import { cn } from '@/lib/utils';

type SortOption = 'newest' | 'oldest' | 'dueDate' | 'priority';

const TaskList = () => {
  const { tasks, categories } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showCompleted, setShowCompleted] = useState(true);
  
  const filteredTasks = tasks.filter(task => {
    // Filter by search term
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by selected categories
    const matchesCategory = selectedCategories.length === 0 || 
                            (task.category && selectedCategories.includes(task.category.id));
    
    // Filter by priority
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    
    // Filter by completion status
    const matchesCompletion = showCompleted || !task.completed;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesCompletion;
  });
  
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'dueDate':
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'priority': {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      default:
        return 0;
    }
  });
  
  const toggleCategoryFilter = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedPriority('all');
    setSortBy('newest');
    setShowCompleted(true);
  };
  
  const hasActiveFilters = searchTerm !== '' || 
                           selectedCategories.length > 0 || 
                           selectedPriority !== 'all' || 
                           !showCompleted;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            {searchTerm && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortOption)}
            >
              <SelectTrigger className="w-[140px]">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <span>Sort</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              className={cn(
                "transition-colors",
                showCompleted ? "bg-secondary text-secondary-foreground" : "bg-primary/10 text-primary"
              )}
              onClick={() => setShowCompleted(!showCompleted)}
            >
              <Check className="mr-2 h-4 w-4" />
              {showCompleted ? "Showing All" : "Hide Completed"}
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select
            value={selectedPriority}
            onValueChange={(value) => setSelectedPriority(value as TaskPriority | 'all')}
          >
            <SelectTrigger className="h-8 px-3 text-xs w-[110px]">
              <span>Priority</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => toggleCategoryFilter(category.id)}
              className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors h-8",
                "border border-transparent",
                selectedCategories.includes(category.id)
                  ? `bg-opacity-20 text-primary bg-primary/20 border-primary/30`
                  : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
              )}
            >
              <div 
                className="w-2 h-2 rounded-full mr-1.5" 
                style={{ backgroundColor: category.color }}
              />
              {category.name}
            </button>
          ))}
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium h-8 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            >
              <X className="h-3 w-3 mr-1" />
              Clear filters
            </button>
          )}
        </div>
      </div>
      
      {sortedTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="bg-muted/30 rounded-full p-4 mb-4">
            <List className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-1">No tasks found</h3>
          <p className="text-muted-foreground max-w-md">
            {hasActiveFilters
              ? "Try adjusting your filters to find what you're looking for."
              : "Create your first task by clicking the 'Add Task' button."}
          </p>
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={clearFilters}
            >
              Clear all filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTasks.map((task, index) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              className={cn(
                "animate-fade-in opacity-0",
                index % 3 === 0 ? "animate-delay-1" : 
                index % 3 === 1 ? "animate-delay-2" : "animate-delay-3"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
