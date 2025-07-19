"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Calendar, LayoutTemplate, SquarePen } from "lucide-react";

const defaultCards = [
  {
    icon: <Calendar className="size-4 text-primary-foreground" />,
    title: "BOOK A MEETING",
    description: "Book a meeting with us for individual solutions",
    date: "2 days ago",
    iconClassName: "text-primary",
    titleClassName: "text-primary",
    className:
      "[grid-area:stack] hover:-translate-y-40 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <SquarePen className="size-4 text-primary-foreground" />,
    title: "CREATE FROM SCRATCH",
    description: "Create an agent from scratch",
    date: "2 days ago",
    iconClassName: "text-primary",
    titleClassName: "text-primary",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-30 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <LayoutTemplate className="size-4 text-primary-foreground" />,
    title: "CREATE TEMPLATE AGENT",
    description: "Use one of the pre-built templates",
    date: "Use the form below",
    iconClassName: "text-primary",
    titleClassName: "text-primary",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

function DisplayCardsAnimated() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center py-20">
      <div className="w-full max-w-3xl">
        <DisplayCards cards={defaultCards} />
      </div>
    </div>
  );
}

export { DisplayCardsAnimated };
