
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import TaskList from '@/components/tasks/TaskList';
import TaskForm from '@/components/tasks/TaskForm';
import { useTaskContext } from '@/contexts/TaskContext';

const Dashboard = () => {
  const { tasks } = useTaskContext();
  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Task Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize your tasks efficiently
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <PlusCircle className="h-5 w-5" />
              Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <TaskForm />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="sci-card p-6 rounded-xl flex flex-col items-center justify-center relative z-10">
          <span className="text-4xl font-semibold text-gradient-blue">{tasks.length}</span>
          <span className="text-muted-foreground mt-1">Total Tasks</span>
        </div>
        
        <div className="sci-card p-6 rounded-xl flex flex-col items-center justify-center relative z-10">
          <span className="text-4xl font-semibold text-amber-500">{pendingCount}</span>
          <span className="text-muted-foreground mt-1">Pending Tasks</span>
        </div>
        
        <div className="sci-card p-6 rounded-xl flex flex-col items-center justify-center relative z-10">
          <span className="text-4xl font-semibold text-green-500">{completedCount}</span>
          <span className="text-muted-foreground mt-1">Completed Tasks</span>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="all" className="flex-1">All Tasks</TabsTrigger>
          <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <TaskList />
        </TabsContent>
        <TabsContent value="upcoming" className="mt-6">
          <p className="text-muted-foreground text-center py-12">
            Upcoming tasks will be shown here.
          </p>
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <p className="text-muted-foreground text-center py-12">
            Completed tasks will be shown here.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
