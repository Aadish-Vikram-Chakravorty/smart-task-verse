
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Task, TaskPriority } from '@/types/task';
import { useTaskContext } from '@/contexts/TaskContext';
import { cn } from '@/lib/utils';

interface TaskFormProps {
  task?: Task;
  mode?: 'create' | 'edit';
}

const TaskForm = ({ task, mode = 'create' }: TaskFormProps) => {
  const { addTask, updateTask, categories } = useTaskContext();
  
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState<TaskPriority>(task?.priority || 'medium');
  const [categoryId, setCategoryId] = useState<string | undefined>(task?.category?.id);
  const [dueDate, setDueDate] = useState<Date | undefined>(task?.dueDate);
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCategory = categories.find(cat => cat.id === categoryId);
    
    if (mode === 'create') {
      addTask({
        title,
        description,
        priority,
        category: selectedCategory,
        dueDate,
        completed: false
      });
    } else if (task) {
      updateTask(task.id, {
        title,
        description,
        priority,
        category: selectedCategory,
        dueDate
      });
    }
    
    // Close dialog by dispatching cancel event
    const closeEvent = new CustomEvent('close-dialog');
    window.dispatchEvent(closeEvent);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <DialogHeader>
        <DialogTitle>{mode === 'create' ? 'Create a new task' : 'Edit task'}</DialogTitle>
        <DialogDescription>
          {mode === 'create' 
            ? 'Add a new task to your list. Fill out the details below.'
            : 'Update your task details.'
          }
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-sm font-medium">
            Task Title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="mt-1.5"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="description" className="text-sm font-medium">
            Description (optional)
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="mt-1.5 min-h-[80px]"
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium">Priority</Label>
          <RadioGroup 
            defaultValue={priority} 
            onValueChange={(value) => setPriority(value as TaskPriority)}
            className="flex space-x-2 mt-1.5"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                value="low" 
                id="low" 
                className="border-green-400 text-green-600 focus:ring-green-400"
              />
              <Label htmlFor="low" className="text-sm cursor-pointer">Low</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                value="medium" 
                id="medium" 
                className="border-yellow-400 text-yellow-600 focus:ring-yellow-400"
              />
              <Label htmlFor="medium" className="text-sm cursor-pointer">Medium</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                value="high" 
                id="high" 
                className="border-red-400 text-red-600 focus:ring-red-400"
              />
              <Label htmlFor="high" className="text-sm cursor-pointer">High</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category" className="text-sm font-medium">
              Category (optional)
            </Label>
            <Select 
              value={categoryId} 
              onValueChange={setCategoryId}
            >
              <SelectTrigger id="category" className="mt-1.5">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: category.color }}
                      />
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Due Date (optional)</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full mt-1.5 justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={(date) => {
                    setDueDate(date);
                    setCalendarOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button 
          type="submit" 
          disabled={!title.trim()}
          className="w-full sm:w-auto"
        >
          {mode === 'create' ? 'Create Task' : 'Update Task'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default TaskForm;
