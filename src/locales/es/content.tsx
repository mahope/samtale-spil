import Link from "next/link";
import { intlDecks, INTL_CARD_COUNT } from "@/intl/data";

/*
 * The texts of Charlando's About, Privacy and How to play (Spanish; same exports as src/locales/en/content.tsx).
 * The app (*.intlapp.tsx) wraps them in AppTextScreen; "app" swaps links to pages the app does not have.
 */

export function AboutText() {
  return (
    <>
      <p>
        La idea viene de esa caja de cartas de conversación que mucha gente guarda en un cajón: preguntas que hacen que las personas
        cuenten cosas que, si no, nunca habrían dicho. Charlando hace lo mismo en el teléfono, totalmente gratis.
      </p>
      <p>
        Hay {INTL_CARD_COUNT.toLocaleString("es-ES")} preguntas en {intlDecks.length} barajas. Cada pregunta está marcada como ligera,
        media o profunda, para que elijas hasta dónde quieres llegar.
      </p>
      <h2>Quién está detrás</h2>
      <p>
        Charlando lo ha creado Mads Holst Jensen, que dirige el pequeño estudio web <a href="https://mahoje.dk">Mahoje</a> en Dinamarca.
        Empezó en danés como <a href="https://snakkespil.dk" hrefLang="da">Snakkespil</a> y también existe en inglés como{" "}
        <a href="https://goodtalkcards.com" hrefLang="en">Goodtalk</a>.
      </p>
      <h2>Sin cuenta y sin anuncios</h2>
      <p>Nada de lo que haces aquí se asocia a ti. No hay cuentas ni cookies de seguimiento, y nunca vendemos ni compartimos datos.</p>
    </>
  );
}

export const PRIVACY_LEAD = "En resumen: sin cuenta, sin anuncios, sin cookies de seguimiento, y lo que guardas se queda en tu dispositivo.";

export function PrivacyText({ app = false }: { app?: boolean }) {
  return (
    <>
      <h2>Lo que se queda en tu dispositivo</h2>
      {app ? (
        <p>Tus favoritos y ajustes se guardan en la aplicación, en tu teléfono. Nunca salen de tu dispositivo, y si borras la aplicación, desaparecen.</p>
      ) : (
        <p>Tus ajustes se guardan en el almacenamiento local del navegador. Nunca salen de tu dispositivo, y puedes borrarlos eliminando los datos del navegador.</p>
      )}
      <h2>Lo que contamos</h2>
      <p>
        Usamos Plausible y Umami, dos herramientas de analítica respetuosas con la privacidad que gestionamos nosotros mismos en nuestros propios servidores de la UE, para contar
        las páginas vistas y algunos eventos anónimos como «se ha empezado una partida». Ninguna de las dos usa cookies ni guarda datos personales o direcciones IP. Plausible no
        puede seguirte de una página a otra ni de un día para otro. Umami da a tu navegador un identificador de visita anónimo, calculado a partir de tu dirección IP y tu
        navegador con un valor secreto que cambia con regularidad, de modo que puede ver que las páginas vistas en un mismo periodo vienen del mismo navegador, pero no quién eres.
      </p>
      <h2>Informar sobre una carta</h2>
      <p>
        Si informas sobre una carta, recibimos la carta, el motivo que elegiste y tu comentario en un correo, que se envía a través del servicio de correo Resend.
        No recibimos tu nombre, tu correo electrónico ni tu dirección IP. Para evitar el spam, el formulario usa Cloudflare Turnstile, que comprueba que eres una
        persona. Cloudflare usa tu dirección IP durante un momento para esa comprobación y para limitar cuántos avisos pueden llegar desde una misma dirección.
      </p>
      <h2>Responsable</h2>
      <p>Mahope, Dinamarca. Preguntas sobre privacidad: mads@mahoje.dk.</p>
    </>
  );
}

export const HOW_TO_PLAY_LEAD = "Charlando se basa en lo que la investigación sabe sobre las conversaciones que acercan a las personas. Esto es lo más importante.";

export function HowToPlayText({ app = false }: { app?: boolean }) {
  return (
    <>
      <h2>Para sacarle el máximo partido</h2>
      <p>Busca un momento tranquilo, sin interrupciones. Deja a un lado los teléfonos, menos el que usas para jugar.</p>
      <p>Empieza por las cartas ligeras y pasa a las profundas cuando apetezca. Las primeras preguntas suelen dar un poco de vergüenza. Es completamente normal.</p>
      <p>Todos responden. Quien lee la carta responde primero, y luego se van turnando para leer.</p>
      <p>Haz una pregunta más. La mejor pregunta suele ser la segunda: «¿Cómo te sentiste?» o «Cuéntame más». Escucha para entender, no para responder.</p>
      <p>Siempre puedes saltarte una carta o sacar otra. Nadie tiene que explicar por qué.</p>
      <p>Termina con una carta ligera o alegre, y da las gracias a los demás por la charla.</p>

      <h2>Cuando una conversación se pone difícil</h2>
      <p>A veces una pregunta toca un punto sensible. Eso no significa que algo vaya mal. Algunas cosas ayudan:</p>
      <ul>
        <li>Ve más despacio y escucha. No hace falta arreglar nada ahora mismo.</li>
        <li>Di lo que sientes y lo que necesitas, en lugar de lo que la otra persona hace siempre.</li>
        <li>Haz una pausa si alguien se siente desbordado, y pon un momento para retomar el tema.</li>
      </ul>

      <h2 id="not-therapy">Un juego de conversación, no una terapia</h2>
      <p>
        Charlando puede hacer que hablar resulte más fácil, pero no sustituye la ayuda de un profesional. Si algo te pesa, o si la misma
        discusión vuelve una y otra vez, habla con un médico o con un psicólogo.
      </p>
      <p>
        Si estás pensando en el suicidio, o si alguien que conoces está en peligro, llama ya al 112. En España también puedes llamar al 024, la línea
        de atención a la conducta suicida, gratuita y disponible a todas horas. Fuera de España encontrarás una línea de ayuda gratuita y confidencial en
        tu país en <a href="https://findahelpline.com/">findahelpline.com</a>.
      </p>
      <p>
        ¿Listos? <Link href={app ? "/" : "/play/"}>Elige una baraja</Link>.
      </p>
    </>
  );
}
