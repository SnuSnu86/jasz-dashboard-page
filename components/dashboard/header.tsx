import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

/**
 * Header für den Hauptbereich des Dashboards.
 * 
 * Zeigt den Titel des aktuellen Bereichs und Aktionen wie "Create new Agent".
 */
export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Titel mit proper Shadcn typography */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your AI voice agents and monitor performance
        </p>
      </div>
      
      {/* Button mit proper Shadcn styling */}
      <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
        <Link href="/dashboard/create">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create new Agent
        </Link>
      </Button>
    </div>
  );
}
