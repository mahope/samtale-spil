/**
 * Follow-up prompts for "Ask more" in Praatspel. Asking follow-up questions makes people
 * come across as listening and caring (Huang et al. 2017; Reis & Shaver 1988).
 */
export const followUps: string[] = [
  "Hoe voelde dat?",
  "Wat gebeurde er daarna?",
  "Vertel eens wat meer.",
  "Waarom denk je dat juist dat is blijven hangen?",
  "Wie waren er nog meer bij?",
  "Wat heb je ervan geleerd?",
  "Heb je dat altijd zo gevoeld?",
  "Wat zou je nu anders doen?",
  "Wanneer merkte je dat voor het eerst?",
  "Wat was het mooiste eraan?",
  "Wat verraste je?",
  "Hoe kijk je er nu op terug?",
  "Wat zou je zeggen tegen iemand in dezelfde situatie?",
  "Aan wie zou je het het liefst vertellen?",
  "Wat zegt dat over jou?",
  "Zou je het nog een keer doen?",
  "Waardoor betekende het zoveel voor je?",
  "Hoe reageerden de anderen?",
  "Wat dacht je op dat moment?",
  "Zit daar een verhaal achter?",
];

export function randomFollowUp(exclude?: string): string {
  const pool = followUps.filter((f) => f !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}
