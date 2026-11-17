/**
 * Follow-up prompts for "Ask more" in Plauderspiel. Asking follow-up questions makes people
 * come across as listening and caring (Huang et al. 2017; Reis & Shaver 1988).
 */
export const followUps: string[] = [
  "Wie hat sich das angefühlt?",
  "Was ist dann passiert?",
  "Erzähl ein bisschen mehr.",
  "Warum, glaubst du, ist dir gerade das im Kopf geblieben?",
  "Wer war noch dabei?",
  "Was hast du daraus gelernt?",
  "Hast du das schon immer so gesehen?",
  "Was würdest du heute anders machen?",
  "Wann ist dir das zum ersten Mal aufgefallen?",
  "Was war das Schönste daran?",
  "Was hat dich überrascht?",
  "Wie siehst du das heute?",
  "Was würdest du jemandem in derselben Lage sagen?",
  "Wem würdest du am liebsten davon erzählen?",
  "Was sagt das über dich?",
  "Würdest du es wieder tun?",
  "Warum war dir das so wichtig?",
  "Wie haben die anderen reagiert?",
  "Was hast du in dem Moment gedacht?",
  "Steckt eine Geschichte dahinter?",
];

export function randomFollowUp(exclude?: string): string {
  const pool = followUps.filter((f) => f !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}
