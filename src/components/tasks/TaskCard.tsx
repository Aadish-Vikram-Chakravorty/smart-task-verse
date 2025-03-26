
import React from 'react';
import { format } from 'date-fns';
import { Check, Clock, Edit, Trash } from 'lucide-react';
import { Task } from '@/types/task';
import { cn } from '@/lib/utils';
import Chip from '../ui/Chip';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import TaskForm from './TaskForm';
import { useTaskContext } from '@/contexts/TaskContext';

interface TaskCardProps {
  task: Task;
  className?: string;
}

const TaskCard = ({ task, className }: TaskCardProps) => {
  const { toggleTaskCompletion, deleteTask } = useTaskContext();
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-low';
    }
  };

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTaskCompletion(task.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div
      className={cn(
        "group p-5 rounded-xl transition-all duration-300 hover:shadow-md",
        "border border-border bg-card hover:border-primary/20",
        task.completed ? "opacity-75" : "opacity-100",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="mt-0.5">
          <Checkbox 
            checked={task.completed}
            onClick={handleToggleComplete}
            className={cn(
              "transition-all duration-300 border-2",
              task.completed 
                ? "border-primary bg-primary text-primary-foreground" 
                : `border-${getPriorityColor(task.priority)}`
            )}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2 mb-2">
            {task.category && (
              <Chip 
                label={task.category.name} 
                color={task.category.color}
              />
            )}
            
            <Chip 
              label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} 
              className={cn(
                "border",
                task.priority === 'high' 
                  ? "bg-red-100 text-red-700 border-red-200" 
                  : task.priority === 'medium'
                    ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                    : "bg-green-100 text-green-700 border-green-200"
              )}
            />
            
            {isOverdue && (
              <Chip 
                label="Overdue" 
                className="bg-red-100 text-red-700 border border-red-200"
              />
            )}
          </div>
          
          <h3 className={cn(
            "text-base font-medium mb-1 truncate transition-all duration-300",
            task.completed ? "line-through text-muted-foreground" : "text-foreground"
          )}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className={cn(
              "text-sm mb-3 line-clamp-2 transition-all duration-300",
              task.completed ? "text-muted-foreground/70" : "text-muted-foreground"
            )}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {task.dueDate ? (
                <span>Due {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
              ) : (
                <span>Created {format(new Date(task.createdAt), 'MMM d, yyyy')}</span>
              )}
            </div>
            
            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <TaskForm task={task} mode="edit" />
                </DialogContent>
              </Dialog>
              
              <button 
                className="p-1 rounded hover:bg-red-100 text-muted-foreground hover:text-red-600 transition-colors" 
                onClick={handleDelete}
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
