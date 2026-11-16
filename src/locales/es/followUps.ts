/**
 * Follow-up prompts for "Ask more" in Charlando. Asking follow-up questions makes people
 * come across as listening and caring (Huang et al. 2017; Reis & Shaver 1988).
 */
export const followUps: string[] = [
  "¿Cómo te sentiste?",
  "¿Y qué pasó después?",
  "Cuéntame un poco más.",
  "¿Por qué crees que se te quedó grabado?",
  "¿Quién más estaba allí?",
  "¿Qué aprendiste de eso?",
  "¿Siempre lo has sentido así?",
  "¿Qué harías distinto hoy?",
  "¿Cuándo te diste cuenta por primera vez?",
  "¿Qué fue lo mejor?",
  "¿Qué te sorprendió?",
  "¿Cómo lo ves ahora?",
  "¿Qué le dirías a alguien en tu misma situación?",
  "¿A quién te gustaría más contárselo?",
  "¿Qué dice eso de ti?",
  "¿Lo volverías a hacer?",
  "¿Qué hizo que importara tanto?",
  "¿Cómo reaccionaron los demás?",
  "¿Qué estabas pensando en ese momento?",
  "¿Hay una historia detrás?",
];

export function randomFollowUp(exclude?: string): string {
  const pool = followUps.filter((f) => f !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}
