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
    <div className="mb-12 flex items-center">
      {/* Titel ganz links */}
      <div>
        <h1 className="text-3xl md:text-3xl font-bold">Dashboard</h1>
      </div>
      
      {/* Button ganz rechts - durch ml-auto wird er nach rechts gedrückt */}
      <div className="ml-auto">
        <Button asChild>
          <Link href="/dashboard/create">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create new Agent
          </Link>
        </Button>
      </div>
    </div>
  );
}
