/**
 * Follow-up prompts for "Ask more" on Goodtalk. Asking follow-up questions makes people
 * come across as listening and caring (Huang et al. 2017; Reis & Shaver 1988).
 */
export const followUps: string[] = [
  "How did that feel?",
  "What happened next?",
  "Tell me a bit more.",
  "Why do you think that stuck with you?",
  "Who else was there?",
  "What did you learn from it?",
  "Have you always felt that way?",
  "What would you do differently today?",
  "When did you first notice that?",
  "What was the best part?",
  "What surprised you?",
  "How do you see it now?",
  "What would you tell someone in the same spot?",
  "Who would you most like to tell about it?",
  "What does that say about you?",
  "Would you do it again?",
  "What made it matter so much?",
  "How did the others react?",
  "What were you thinking right then?",
  "Is there a story behind that?",
];

export function randomFollowUp(exclude?: string): string {
  const pool = followUps.filter((f) => f !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}
