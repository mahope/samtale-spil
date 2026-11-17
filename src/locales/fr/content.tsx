import Link from "next/link";
import { intlDecks, INTL_CARD_COUNT } from "@/intl/data";

/*
 * The texts of Goodtalk's About, Privacy and How to play in French (same exports as src/locales/en/content.tsx).
 * The app (*.intlapp.tsx) wraps them in AppTextScreen; "app" swaps links to pages the app does not have.
 */

export function AboutText() {
  return (
    <>
      <p>
        L&rsquo;idée vient de la boîte de cartes de conversation que beaucoup gardent dans un tiroir : des questions qui poussent à
        raconter ce qu&rsquo;on n&rsquo;aurait pas dit autrement. Goodtalk fait la même chose sur ton téléphone, gratuitement.
      </p>
      <p>
        Il y a {INTL_CARD_COUNT.toLocaleString("fr-FR")} questions réparties en {intlDecks.length} jeux. Chaque question est marquée
        légère, moyenne ou profonde, pour que tu choisisses jusqu&rsquo;où tu veux aller.
      </p>
      <h2>Qui est derrière</h2>
      <p>
        Goodtalk est créé par Mads Holst Jensen, qui dirige le petit studio web <a href="https://mahoje.dk">Mahoje</a> au Danemark. Le jeu
        est né en danois sous le nom de <a href="https://snakkespil.dk" hrefLang="da">Snakkespil</a> et existe aussi en anglais sur{" "}
        <a href="https://goodtalkcards.com" hrefLang="en">goodtalkcards.com</a>.
      </p>
      <h2>Sans compte, sans publicité</h2>
      <p>Rien de ce que tu fais ici n&rsquo;est lié à toi. Pas de compte, pas de cookies de suivi, et nous ne vendons ni ne partageons jamais de données.</p>
    </>
  );
}

export const PRIVACY_LEAD = "En bref : pas de compte, pas de publicité, pas de cookies de suivi, et ce que tu enregistres reste sur ton appareil.";

export function PrivacyText({ app = false }: { app?: boolean }) {
  return (
    <>
      <h2>Ce qui reste sur ton appareil</h2>
      {app ? (
        <p>Tes favoris et tes réglages sont enregistrés dans l&rsquo;appli, sur ton téléphone. Ils ne quittent jamais ton appareil, et supprimer l&rsquo;appli les supprime aussi.</p>
      ) : (
        <p>Tes réglages sont enregistrés dans le stockage local de ton navigateur. Ils ne quittent jamais ton appareil, et tu peux les effacer en supprimant les données de ton navigateur.</p>
      )}
      <h2>Ce que nous comptons</h2>
      <p>
        Nous utilisons Plausible et Umami, deux outils de mesure d&rsquo;audience respectueux de la vie privée, que nous hébergeons nous-mêmes sur nos serveurs dans l&rsquo;UE,
        pour compter les pages vues et quelques événements anonymes comme &laquo;&nbsp;une partie a commencé&nbsp;&raquo;. Aucun des deux ne dépose de cookies ni n&rsquo;enregistre
        de données personnelles ou d&rsquo;adresses IP. Plausible ne peut pas te suivre d&rsquo;une page à l&rsquo;autre ni d&rsquo;un jour à l&rsquo;autre. Umami donne à ton
        navigateur un identifiant de visite anonyme, calculé à partir de ton adresse IP et de ton navigateur avec une valeur secrète changée régulièrement : il peut ainsi
        savoir que des pages vues sur une même période viennent du même navigateur, mais pas qui tu es.
      </p>
      <h2>Signaler une carte</h2>
      <p>
        Si tu signales une carte, nous recevons par e-mail la carte, le motif choisi et ton commentaire, envoyés par le service d&rsquo;e-mail Resend. Nous ne recevons
        ni ton nom, ni ton adresse e-mail, ni ton adresse IP. Pour bloquer le spam, le formulaire utilise Cloudflare Turnstile, qui vérifie que tu es bien un humain ;
        Cloudflare utilise brièvement ton adresse IP pour ce contrôle et pour limiter le nombre de signalements venant d&rsquo;une même adresse.
      </p>
      <h2>Qui est responsable</h2>
      <p>Mahope, Danemark. Questions sur la confidentialité : mads@mahoje.dk.</p>
    </>
  );
}

export const HOW_TO_PLAY_LEAD = "Goodtalk s'appuie sur la recherche sur ce qui rapproche les gens quand ils se parlent. Voici l'essentiel.";

export function HowToPlayText({ app = false }: { app?: boolean }) {
  return (
    <>
      <h2>Pour en profiter au mieux</h2>
      <p>Trouvez un moment calme où personne ne vous dérangera. Rangez les téléphones, sauf celui sur lequel vous jouez.</p>
      <p>Commencez par les cartes légères et passez aux plus profondes quand vous en avez envie. Les premières questions semblent souvent un peu gênantes. C&rsquo;est normal.</p>
      <p>Tout le monde répond. Celui ou celle qui lit la carte répond en premier, puis vous lisez chacun votre tour.</p>
      <p>Posez une question de plus. La meilleure question est souvent la deuxième : &laquo;&nbsp;Qu&rsquo;est-ce que tu as ressenti&nbsp;?&nbsp;&raquo; ou &laquo;&nbsp;Raconte-moi.&nbsp;&raquo; Écoutez pour comprendre, pas pour répondre.</p>
      <p>Vous pouvez toujours passer une carte ou en tirer une autre. Personne n&rsquo;a à expliquer pourquoi.</p>
      <p>Finissez par une carte légère ou joyeuse, et remerciez-vous pour la conversation.</p>

      <h2>Quand la conversation devient difficile</h2>
      <p>Parfois, une question touche un point sensible. Ça ne veut pas dire que quelque chose ne va pas. Quelques pistes&nbsp;:</p>
      <ul>
        <li>Ralentissez et écoutez. Vous n&rsquo;avez rien à régler tout de suite.</li>
        <li>Dites ce que vous ressentez et ce dont vous avez besoin, plutôt que ce que l&rsquo;autre fait toujours.</li>
        <li>Faites une pause si quelqu&rsquo;un se sent dépassé, et mettez-vous d&rsquo;accord sur le moment où vous reprendrez.</li>
      </ul>

      <h2 id="not-therapy">Un jeu de conversation, pas une thérapie</h2>
      <p>
        Goodtalk peut aider à se parler, mais ne remplace pas l&rsquo;aide d&rsquo;un professionnel. Si quelque chose te pèse, ou si les mêmes
        disputes reviennent sans cesse, parles-en à un médecin ou à un psychologue.
      </p>
      <p>
        Si tu penses au suicide, ou si quelqu&rsquo;un de ton entourage est en danger, appelle tout de suite le 112 ou le 15. En France, le 3114,
        numéro national de prévention du suicide, répond gratuitement 24&nbsp;h/24 et 7&nbsp;j/7. Ailleurs, tu trouveras une ligne d&rsquo;écoute gratuite
        et confidentielle dans ton pays sur <a href="https://findahelpline.com/">findahelpline.com</a>.
      </p>
      <p>
        Prêt&nbsp;? <Link href={app ? "/" : "/play/"}>Choisis un jeu</Link>.
      </p>
    </>
  );
}
