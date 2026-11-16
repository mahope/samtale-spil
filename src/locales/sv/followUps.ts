/**
 * Follow-up prompts for "Ask more" in Pratspel. Asking follow-up questions makes people
 * come across as listening and caring (Huang et al. 2017; Reis & Shaver 1988).
 */
export const followUps: string[] = [
  "Hur kändes det?",
  "Vad hände sedan?",
  "Berätta lite mer.",
  "Varför tror du att just det fastnade?",
  "Vem mer var där?",
  "Vad lärde du dig av det?",
  "Har du alltid känt så?",
  "Vad skulle du göra annorlunda i dag?",
  "När märkte du det första gången?",
  "Vad var det bästa med det?",
  "Vad förvånade dig?",
  "Hur ser du på det nu?",
  "Vad skulle du säga till någon i samma situation?",
  "Vem skulle du helst vilja berätta det för?",
  "Vad säger det om dig?",
  "Skulle du göra om det?",
  "Vad gjorde att det betydde så mycket?",
  "Hur reagerade de andra?",
  "Vad tänkte du just då?",
  "Finns det en historia bakom det?",
];

export function randomFollowUp(exclude?: string): string {
  const pool = followUps.filter((f) => f !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}
