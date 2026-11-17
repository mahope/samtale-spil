/**
 * Follow-up prompts for "Ask more" in Goodtalk in French. Asking follow-up questions makes people
 * come across as listening and caring (Huang et al. 2017; Reis & Shaver 1988).
 */
export const followUps: string[] = [
  "Qu'est-ce que tu as ressenti ?",
  "Et ensuite, que s'est-il passé ?",
  "Raconte-moi un peu plus.",
  "Pourquoi crois-tu que ça t'a marqué ?",
  "Qui d'autre était là ?",
  "Qu'est-ce que ça t'a appris ?",
  "Tu as toujours pensé ça ?",
  "Que ferais-tu autrement aujourd'hui ?",
  "Quand l'as-tu remarqué pour la première fois ?",
  "Qu'est-ce qui était le mieux ?",
  "Qu'est-ce qui t'a surpris ?",
  "Comment le vois-tu maintenant ?",
  "Que dirais-tu à quelqu'un dans la même situation ?",
  "À qui aimerais-tu le plus le raconter ?",
  "Qu'est-ce que ça dit de toi ?",
  "Tu le referais ?",
  "Pourquoi est-ce que ça comptait autant ?",
  "Comment les autres ont-ils réagi ?",
  "À quoi pensais-tu à ce moment-là ?",
  "Il y a une histoire derrière ça ?",
];

export function randomFollowUp(exclude?: string): string {
  const pool = followUps.filter((f) => f !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}
