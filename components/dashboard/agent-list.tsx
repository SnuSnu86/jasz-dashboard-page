/**
 * Komponente zur Anzeige der Liste der Voice Agents.
 * 
 * Zeigt aktuell einen Platzhalter an, wenn keine Agenten vorhanden sind.
 * TODO: Später Logik zur Anzeige der tatsächlichen Agentenliste hinzufügen.
 */
export function AgentList() {
  // TODO: Hier später Logik hinzufügen, um echte Agentendaten abzurufen und anzuzeigen.
  const agents: any[] = []; // Leeres Array für den Platzhalter

  if (agents.length === 0) {
    return (
      <div className="bg-card border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground">
          Hier werden bald Ihre erstellten Voice Agents angezeigt. Noch keine Agenten erstellt?
          {/* Optional: Link zum Erstellen hinzufügen */}
        </p>
      </div>
    );
  }

  // TODO: Hier die Darstellung der Agentenliste implementieren, wenn Agenten vorhanden sind.
  return (
    <div>
      {/* Agenten-Liste wird hier gerendert */}
    </div>
  );
}
