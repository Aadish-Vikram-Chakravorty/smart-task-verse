
import React from 'react';
import { ArrowRight, CheckCircle, Clock, PlusCircle, Sliders, Brain, Database, ChartBar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Brain,
    title: 'Smart Organization',
    description: 'AI-powered task organization with categories, priorities, and intelligent due dates.',
  },
  {
    icon: Clock,
    title: 'Time Analytics',
    description: 'Track time patterns and get analytics on your productivity cycles.',
  },
  {
    icon: Database,
    title: 'Data-Driven Insights',
    description: 'Get valuable insights about your productivity patterns and optimization opportunities.',
  },
];

const Index = () => {
  return (
    <div className="relative flex flex-col min-h-[85vh] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 grid-pattern dark:opacity-10" />
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-5 filter blur-sm" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7')", 
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      
      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-4 py-16 md:py-24 max-w-5xl mx-auto">
        <div className="space-y-4 animate-fade-in">
          <div className="inline-block">
            <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
              Advanced Task Analytics
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl tracking-tight">
            Task management with <span className="text-gradient">data-driven precision</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A scientifically designed task management system that analyzes your work patterns and optimizes your productivity.
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
      <section className="relative z-10 py-16 md:py-24 bg-accent/5 dark:bg-accent/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Data-Driven Task Management
            </h2>
            <p className="text-muted-foreground text-lg">
              Leverage analytics and scientific principles to maximize your productivity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  "sci-card p-8 transition-all duration-500 hover:translate-y-[-5px]",
                  "animate-fade-in opacity-0"
                )}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 relative z-10">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 relative z-10 font-['Space_Grotesk']">{feature.title}</h3>
                <p className="text-muted-foreground relative z-10">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative z-10 py-16 md:py-24 text-center max-w-4xl mx-auto px-4">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent opacity-80"></div>
        <ChartBar className="w-16 h-16 mx-auto mb-6 text-accent opacity-20" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Space_Grotesk']">
          Analyze your productivity patterns
        </h2>
        <p className="text-muted-foreground text-lg mb-8 md:mb-10 max-w-2xl mx-auto">
          Start tracking your tasks scientifically and discover insights that will transform your productivity and time management approach.
        </p>
        <Button asChild size="lg" className="rounded-full px-10 bg-gradient-to-r from-accent to-primary hover:opacity-90">
          <Link to="/dashboard">
            Start Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default Index;
