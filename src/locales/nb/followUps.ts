/**
 * Follow-up prompts for "Ask more" in Pratespill. Asking follow-up questions makes people
 * come across as listening and caring (Huang et al. 2017; Reis & Shaver 1988).
 */
export const followUps: string[] = [
  "Hvordan føltes det?",
  "Hva skjedde så?",
  "Fortell litt mer.",
  "Hvorfor tror du akkurat det satte seg fast?",
  "Hvem andre var der?",
  "Hva lærte du av det?",
  "Har du alltid følt det sånn?",
  "Hva ville du gjort annerledes i dag?",
  "Når merket du det første gang?",
  "Hva var det beste med det?",
  "Hva overrasket deg?",
  "Hvordan ser du på det nå?",
  "Hva ville du sagt til noen i samme situasjon?",
  "Hvem ville du helst fortalt det til?",
  "Hva sier det om deg?",
  "Ville du gjort det igjen?",
  "Hva gjorde at det betydde så mye?",
  "Hvordan reagerte de andre?",
  "Hva tenkte du akkurat da?",
  "Finnes det en historie bak det?",
];

export function randomFollowUp(exclude?: string): string {
  const pool = followUps.filter((f) => f !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}
