import React from 'react';
import { ArrowRight, CheckCircle, Clock, PlusCircle, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: CheckCircle,
    title: 'Task Organization',
    description: 'Keep your tasks organized with categories, priorities, and due dates.',
  },
  {
    icon: Clock,
    title: 'Time Management',
    description: 'Set due dates and never miss a deadline with reminders and notifications.',
  },
  {
    icon: Sliders,
    title: 'Customizable Views',
    description: 'View your tasks the way you want with customizable filters and sorting options.',
  },
];

const Index = () => {
  return (
    <div className="relative flex flex-col min-h-[85vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-10 filter blur-sm" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')", 
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      
      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-4 py-16 md:py-24 max-w-5xl mx-auto">
        <div className="space-y-4 animate-fade-in">
          <div className="inline-block">
            <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              Smart Task Management
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl tracking-tight">
            Manage your tasks with <span className="text-gradient">elegance and precision</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A beautifully designed task management app that helps you organize your work and life with simplicity and focus.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/dashboard">
                <PlusCircle className="mr-2 h-5 w-5" />
                Create a Task
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="relative z-10 py-16 md:py-24 bg-accent/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Designed for Focus and Productivity
            </h2>
            <p className="text-muted-foreground text-lg">
              Task management reimagined with modern design principles and thoughtful user experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  "glass p-8 rounded-xl transition-all duration-500 hover:translate-y-[-5px]",
                  "animate-fade-in opacity-0"
                )}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative z-10 py-16 md:py-24 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to manage your tasks differently?
        </h2>
        <p className="text-muted-foreground text-lg mb-8 md:mb-10 max-w-2xl mx-auto">
          Start organizing your tasks today and experience the difference that thoughtful design can make to your productivity.
        </p>
        <Button asChild size="lg" className="rounded-full px-10">
          <Link to="/dashboard">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default Index;
