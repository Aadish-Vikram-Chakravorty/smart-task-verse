
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import TaskForm from '../tasks/TaskForm';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-8 transition-all duration-300 ease-apple-ease",
        scrolled ? "glass shadow-sm backdrop-blur-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Link to="/" className="text-2xl font-medium flex items-center">
            <span className="text-gradient">TaskVerse</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              type="search" 
              placeholder="Search tasks..." 
              className="pl-10 py-2 h-10 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-offset-0"
            />
          </div>
          
          <nav className="flex items-center space-x-1">
            <Link to="/" className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors">
              Dashboard
            </Link>
          </nav>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full px-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <TaskForm />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 p-4 glass animate-fade-in">
          <div className="flex flex-col space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                type="search" 
                placeholder="Search tasks..." 
                className="pl-10 py-2 h-10 bg-white/50 border-0"
              />
            </div>
            
            <nav className="flex flex-col space-y-1">
              <Link 
                to="/" 
                className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/dashboard" 
                className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </nav>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full justify-center rounded-md">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <TaskForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </header>
  );
};

import { cn } from '@/lib/utils';
export default Header;
