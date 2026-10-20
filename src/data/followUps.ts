/**
 * Follow-up prompts for "Spørg videre". Asking follow-up questions makes people
 * come across as listening and caring (Huang et al. 2017; Reis & Shaver 1988),
 * see docs/forskning.md section 2.3.
 */
export const followUps: string[] = [
  "Hvordan føltes det?",
  "Hvad skete der så?",
  "Fortæl lidt mere.",
  "Hvorfor tror du, det har sat sig fast?",
  "Hvem andre var med?",
  "Hvad lærte du af det?",
  "Har du altid haft det sådan?",
  "Hvad ville du gøre anderledes i dag?",
  "Hvornår lagde du første gang mærke til det?",
  "Hvad betyder det for dig nu?",
  "Hvordan reagerede de andre?",
  "Hvad var det bedste ved det?",
  "Hvad var det sværeste ved det?",
  "Hvad tænkte du lige bagefter?",
  "Er der noget, du aldrig har fortalt om det?",
  "Hvordan ville du have det, hvis det skete igen?",
  "Hvad håber du, der sker?",
  "Hvad kan jeg gøre for at forstå det bedre?",
  "Hvordan hænger det sammen med den, du er i dag?",
  "Hvis du skulle give det en overskrift, hvad skulle den så være?",
  "Hvad overraskede dig mest?",
  "Hvem ville du gerne fortælle det til?",
  "Hvad gjorde du for at komme igennem det?",
  "Hvad var lugten, lyden eller stemningen?",
  "Hvad ville du sige til dig selv dengang?",
  "Hvad har du ikke sagt endnu?",
  "Hvad svarer du selv, hvis jeg spørger dig om det samme?",
  "Hvad smiler du af, når du tænker på det?",
];

export function randomFollowUp(exclude?: string): string {
  const pool = exclude ? followUps.filter((f) => f !== exclude) : followUps;
  return pool[Math.floor(Math.random() * pool.length)];
}
