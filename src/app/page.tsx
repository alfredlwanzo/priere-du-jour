"use client";

import { useEffect, useState, useRef } from "react";
import { Share2, Download } from "lucide-react";
import { toJpeg } from "html-to-image";
// import Image from "next/image";

interface PrayerType {
  date: string; // "YYYY-MM-DD"
  prayer: string;
}

const prayers: PrayerType[] = [
  {
    date: "2025-02-01",
    prayer:
      "Merci Seigneur pour ce jour nouveau, aide-moi à en faire un jour béni. Remplis mes actions de bonté et d'humilité envers mon prochain.",
  },
  {
    date: "2025-02-02",
    prayer:
      "Seigneur, guide mes pas aujourd'hui et aide-moi à être une lumière pour ceux qui m'entourent.",
  },
  {
    date: "2025-02-03",
    prayer:
      "Père céleste, donne-moi la sagesse pour faire les bons choix et la force pour persévérer dans ta voie.",
  },
  {
    date: "2025-02-04",
    prayer:
      "Merci pour ta protection et ton amour infini. Aide-moi à partager cet amour avec les autres.",
  },
  {
    date: "2025-02-05",
    prayer:
      "Seigneur, que ta paix règne dans mon cœur et que ta joie illumine mon chemin aujourd'hui.",
  },
  {
    prayer:
      "Seigneur, accorde-moi la paix et la sagesse pour cette journée. Remplis mon cœur d'amour et guide mes pensées vers la bienveillance et la sérénité.",
    date: "2025-02-14",
  },
  {
    prayer:
      "Dieu tout-puissant, guide mes pas et éclaire mon chemin. Protège-moi des doutes et renforce ma foi en ta divine providence.",
    date: "2025-02-15",
  },
  {
    prayer:
      "Merci Seigneur pour ce jour nouveau, aide-moi à en faire un jour béni. Remplis mes actions de bonté et d'humilité envers mon prochain.",
    date: "2025-02-16",
  },
  {
    prayer:
      "Seigneur, remplis mon cœur d'amour et de compassion envers les autres. Que je puisse être un instrument de ta paix et de ton amour.",
    date: "2025-02-17",
  },
  {
    prayer:
      "Père céleste, donne-moi la force d'affronter les épreuves avec foi. Que je trouve en toi refuge et réconfort en toutes circonstances.",
    date: "2025-02-18",
  },
  {
    prayer:
      "Seigneur, éclaire mon chemin en ce jour béni. Aide-moi à prendre les bonnes décisions et à avancer avec confiance et détermination.",
    date: "2025-02-19",
  },
  {
    prayer:
      "Dieu d'amour, remplis mon cœur de paix et de gratitude. Apprends-moi à voir tes bénédictions dans chaque instant de ma vie.",
    date: "2025-02-20",
  },
  {
    prayer:
      "Que ta lumière guide mes pas et mes décisions aujourd'hui. Donne-moi la sagesse de discerner le bien et le courage de le suivre.",
    date: "2025-02-21",
  },
  {
    prayer:
      "Merci Seigneur pour la force et la sagesse que tu m'accordes. Aide-moi à avancer avec humilité et confiance en toi.",
    date: "2025-02-22",
  },
  {
    prayer:
      "Père tout-puissant, garde-moi sous ta protection infinie. Protège ma famille et mes amis et comble leur vie de joie et de sérénité.",
    date: "2025-02-23",
  },
  {
    prayer:
      "Seigneur, que ma journée soit remplie d'amour et de bienveillance. Apprends-moi à pardonner et à aimer comme toi tu nous aimes.",
    date: "2025-02-24",
  },
  {
    prayer:
      "Dieu miséricordieux, accorde-moi patience et humilité. Aide-moi à accepter ce que je ne peux changer et à toujours espérer en toi.",
    date: "2025-02-25",
  },
  {
    prayer:
      "Merci Seigneur pour chaque bénédiction reçue aujourd'hui. Ouvre mes yeux aux petites joies et aux grandes merveilles que tu offres.",
    date: "2025-02-26",
  },
  {
    prayer:
      "Seigneur, fortifie-moi face aux épreuves de la vie. Que je ne perde jamais confiance en toi, même dans les moments les plus difficiles.",
    date: "2025-02-27",
  },
  {
    prayer:
      "Que cette journée soit remplie de paix et de sérénité. Apprends-moi à vivre dans l'instant présent, en confiance et en amour.",
    date: "2025-02-28",
  },
  {
    prayer:
      "Dieu tout-puissant, remplis mon cœur d’espérance et de joie. Fais de moi un messager de ton amour et un témoin de ta grâce.",
    date: "2025-03-01",
  },
  {
    prayer:
      "Merci Seigneur pour l’amour que tu me donnes chaque jour. Que je sache le partager avec les autres et en être digne.",
    date: "2025-03-02",
  },
  {
    prayer:
      "Seigneur, donne-moi la patience d’affronter chaque épreuve. Apprends-moi à persévérer et à grandir à travers les défis de la vie.",
    date: "2025-03-03",
  },
  {
    prayer:
      "Que ta paix m’accompagne tout au long de cette journée. Fais de moi un canal de ta paix pour ceux qui en ont besoin.",
    date: "2025-03-04",
  },
  {
    prayer:
      "Seigneur, éclaire mes décisions et mes actions aujourd’hui. Aide-moi à choisir le bien et à toujours suivre le chemin de ta vérité.",
    date: "2025-03-05",
  },
  {
    prayer:
      "Merci Seigneur pour ton amour inconditionnel. Peu importe mes erreurs, je sais que tu es toujours là pour m’accueillir.",
    date: "2025-03-06",
  },
  {
    prayer:
      "Père céleste, enseigne-moi la voie de la sagesse et de la vérité. Que mes pensées et mes paroles reflètent ta lumière en tout temps.",
    date: "2025-03-07",
  },
  {
    prayer:
      "Seigneur, donne-moi la force de pardonner et d’aimer sincèrement. Que je sois un reflet de ta miséricorde auprès de ceux qui m’entourent.",
    date: "2025-03-08",
  },
  {
    prayer:
      "Dieu miséricordieux, accorde-moi la sérénité dans mon cœur. Remplis-moi d’une paix profonde qui dépasse toute compréhension humaine.",
    date: "2025-03-09",
  },
  {
    prayer:
      "Merci Seigneur pour toutes les bénédictions que tu répands sur moi. Aide-moi à être reconnaissant et à partager ces bénédictions avec les autres.",
    date: "2025-03-10",
  },
  {
    prayer:
      "Seigneur, aide-moi à être une source de lumière pour les autres. Que mes actes et mes paroles apportent espoir et réconfort.",
    date: "2025-03-11",
  },
  {
    prayer:
      "Que ta grâce me guide en chaque instant de cette journée. Je me remets entièrement entre tes mains, avec confiance et amour.",
    date: "2025-03-12",
  },
  {
    prayer:
      "Seigneur, protège-moi et donne-moi le courage de suivre ton chemin. Même dans l’incertitude, je veux avancer avec foi et assurance.",
    date: "2025-03-13",
  },
  {
    prayer:
      "Dieu d’amour, fais grandir en moi la foi et l’espérance. Que chaque jour soit une nouvelle occasion de marcher à tes côtés.",
    date: "2025-03-14",
  },
  {
    prayer:
      "Seigneur, veille sur ma famille et mes amis. Remplis leur vie de bonheur et de sécurité sous ton regard bienveillant.",
    date: "2025-03-15",
  },
  {
    date: "2025-03-16",
    prayer: "Seigneur, remplis mon cœur de paix et de gratitude.",
  },
  { date: "2025-03-17", prayer: "Aide-moi à marcher avec confiance en toi." },
  {
    date: "2025-03-18",
    prayer: "Donne-moi la patience et la sagesse pour aujourd’hui.",
  },
  {
    date: "2025-03-19",
    prayer: "Que mon cœur soit rempli de ta lumière et de ton amour.",
  },
  {
    date: "2025-03-20",
    prayer: "Seigneur, apprends-moi à être reconnaissant en toute chose.",
  },
  {
    date: "2025-03-21",
    prayer: "Que ma foi demeure ferme malgré les épreuves.",
  },
  {
    date: "2025-03-22",
    prayer: "Aide-moi à faire preuve de compassion et de bonté.",
  },
  {
    date: "2025-03-23",
    prayer: "Seigneur, sois ma force et mon refuge aujourd’hui.",
  },
  {
    date: "2025-03-24",
    prayer: "Que mes paroles et mes actions reflètent ta grâce.",
  },
  {
    date: "2025-03-25",
    prayer: "Seigneur, renouvelle mon esprit et ma confiance en toi.",
  },
  {
    date: "2025-03-26",
    prayer: "Aide-moi à pardonner et à aimer sans condition.",
  },
  {
    date: "2025-03-27",
    prayer: "Que ton Esprit me guide dans toutes mes décisions.",
  },
  {
    date: "2025-03-28",
    prayer: "Seigneur, remplis mon âme de paix et de sérénité.",
  },
  {
    date: "2025-03-29",
    prayer: "Apprends-moi à vivre selon ta volonté chaque jour.",
  },
  {
    date: "2025-03-30",
    prayer: "Seigneur, accorde-moi la force et le courage nécessaires.",
  },
  {
    date: "2025-03-31",
    prayer: "Que ta lumière éclaire mon chemin aujourd’hui.",
  },
  {
    date: "2025-04-01",
    prayer: "Seigneur, aide-moi à marcher avec foi et confiance.",
  },
  {
    date: "2025-04-02",
    prayer: "Que ton amour soit ma source de joie et de paix.",
  },
  {
    date: "2025-04-03",
    prayer: "Seigneur, remplis-moi de patience et d’humilité.",
  },
  {
    date: "2025-04-04",
    prayer: "Aide-moi à témoigner de ton amour autour de moi.",
  },
  {
    date: "2025-04-05",
    prayer: "Seigneur, je remets cette journée entre tes mains.",
  },
  {
    date: "2025-04-06",
    prayer: "Seigneur, accorde-moi la sagesse pour cette journée.",
  },
  {
    date: "2025-04-07",
    prayer: "Que ta paix remplisse mon cœur et guide mes pas.",
  },
  {
    date: "2025-04-08",
    prayer: "Donne-moi la force d'affronter les défis avec foi.",
  },
  {
    date: "2025-04-09",
    prayer: "Merci pour tes bénédictions renouvelées chaque matin.",
  },
  {
    date: "2025-04-10",
    prayer: "Aide-moi à être une lumière pour ceux qui m'entourent.",
  },
  { date: "2025-04-11", prayer: "Apprends-moi à aimer comme tu aimes." },
  {
    date: "2025-04-12",
    prayer: "Que ta volonté soit faite dans ma vie aujourd’hui.",
  },
  {
    date: "2025-04-13",
    prayer: "Seigneur, renouvelle mon esprit et fortifie ma foi.",
  },
  {
    date: "2025-04-14",
    prayer: "Aide-moi à marcher avec intégrité et humilité.",
  },
  {
    date: "2025-04-15",
    prayer: "Donne-moi un cœur reconnaissant en toute circonstance.",
  },
  {
    date: "2025-04-16",
    prayer: "Seigneur, sois mon refuge et ma force en tout temps.",
  },
  {
    date: "2025-04-17",
    prayer: "Que ton amour soit visible à travers mes actions.",
  },
  {
    date: "2025-04-18",
    prayer: "Remplis-moi de patience et de bienveillance.",
  },
  {
    date: "2025-04-19",
    prayer: "Seigneur, apprends-moi à pardonner sincèrement.",
  },
  {
    date: "2025-04-20",
    prayer: "Que ma foi grandisse à travers chaque épreuve.",
  },
  { date: "2025-04-21", prayer: "Aide-moi à garder les yeux fixés sur toi." },
  { date: "2025-04-22", prayer: "Seigneur, guide mes paroles et mes pensées." },
  {
    date: "2025-04-23",
    prayer: "Donne-moi la force de persévérer dans la prière.",
  },
  {
    date: "2025-04-24",
    prayer: "Que je sois un instrument de paix aujourd’hui.",
  },
  {
    date: "2025-04-25",
    prayer: "Seigneur, garde-moi dans ta vérité et ta justice.",
  },
  {
    date: "2025-04-26",
    prayer: "Aide-moi à témoigner de ton amour autour de moi.",
  },
  {
    date: "2025-04-27",
    prayer: "Remplis-moi d’espérance et de confiance en toi.",
  },
  {
    date: "2025-04-28",
    prayer: "Seigneur, je remets entre tes mains tous mes soucis.",
  },
  {
    date: "2025-04-29",
    prayer: "Aide-moi à écouter ta voix et à suivre ta direction.",
  },
  { date: "2025-04-30", prayer: "Que ma vie reflète ta grâce et ta bonté." },
  {
    date: "2025-05-01",
    prayer: "Seigneur, ouvre mes yeux aux merveilles de ta création.",
  },
  {
    date: "2025-05-02",
    prayer: "Accorde-moi la sérénité face aux incertitudes de la vie.",
  },
  {
    date: "2025-05-03",
    prayer: "Remplis-moi d’une foi inébranlable en ton amour.",
  },
  {
    date: "2025-05-04",
    prayer: "Seigneur, enseigne-moi à mieux écouter les autres.",
  },
  {
    date: "2025-05-05",
    prayer: "Que je sois un porteur d’espérance pour ceux qui souffrent.",
  },
  {
    date: "2025-05-06",
    prayer: "Aide-moi à trouver du réconfort dans ta présence.",
  },
  {
    date: "2025-05-07",
    prayer: "Seigneur, renouvelle mon courage et ma détermination.",
  },
  {
    date: "2025-05-08",
    prayer: "Donne-moi la patience nécessaire pour accomplir ta volonté.",
  },
  {
    date: "2025-05-09",
    prayer: "Seigneur, garde mon cœur humble et reconnaissant.",
  },
  {
    date: "2025-05-10",
    prayer: "Que ton amour éclaire mes décisions aujourd’hui.",
  },
  {
    date: "2025-05-11",
    prayer: "Seigneur, apprends-moi à me réjouir en toute circonstance.",
  },
  {
    date: "2025-05-12",
    prayer: "Remplis-moi de paix lorsque le doute m’envahit.",
  },
  { date: "2025-05-13", prayer: "Que ma foi soit plus forte que mes peurs." },
  {
    date: "2025-05-14",
    prayer: "Seigneur, donne-moi la grâce de pardonner sincèrement.",
  },
  {
    date: "2025-05-15",
    prayer: "Aide-moi à trouver du repos en toi aujourd’hui.",
  },
  {
    date: "2025-05-16",
    prayer: "Seigneur, garde-moi éloigné de toute tentation.",
  },
  { date: "2025-05-17", prayer: "Que ma vie témoigne de ta présence en moi." },
  {
    date: "2025-05-18",
    prayer: "Accorde-moi la force de surmonter les obstacles.",
  },
  { date: "2025-05-19", prayer: "Seigneur, illumine mon chemin et mes choix." },
  {
    date: "2025-05-20",
    prayer: "Remplis-moi d’une joie profonde et véritable.",
  },
  { date: "2025-05-21", prayer: "Aide-moi à aimer sans attendre en retour." },
  { date: "2025-05-22", prayer: "Seigneur, renouvelle mon esprit fatigué." },
  { date: "2025-05-23", prayer: "Que ma confiance en toi ne vacille jamais." },
  {
    date: "2025-05-24",
    prayer: "Seigneur, aide-moi à rester fidèle à tes commandements.",
  },
  {
    date: "2025-05-25",
    prayer: "Remplis-moi d’une paix qui surpasse toute compréhension.",
  },
  {
    date: "2025-05-26",
    prayer: "Accorde-moi la sagesse pour discerner le bien du mal.",
  },
  {
    date: "2025-05-27",
    prayer: "Seigneur, apprends-moi à mieux te connaître chaque jour.",
  },
  {
    date: "2025-05-28",
    prayer: "Que mon amour pour toi grandisse sans cesse.",
  },
  {
    date: "2025-05-29",
    prayer: "Seigneur, apprends-moi à me confier entièrement à toi.",
  },
  {
    date: "2025-05-30",
    prayer: "Aide-moi à trouver du réconfort dans ta parole.",
  },
  {
    date: "2025-05-31",
    prayer: "Seigneur, garde-moi sous ton aile protectrice.",
  },
  { date: "2025-06-01", prayer: "Que ma foi illumine les ténèbres du doute." },
  {
    date: "2025-06-02",
    prayer: "Seigneur, donne-moi la force d’aimer mes ennemis.",
  },
  { date: "2025-06-03", prayer: "Que ma vie reflète ta bonté et ta vérité." },
  { date: "2025-06-04", prayer: "Seigneur, remplis-moi de ton Esprit Saint." },
  { date: "2025-06-05", prayer: "Donne-moi un cœur compatissant et généreux." },
  {
    date: "2025-06-06",
    prayer: "Seigneur, apprends-moi à être reconnaissant chaque jour.",
  },
  { date: "2025-06-07", prayer: "Que ma prière soit un chant de louange." },
  { date: "2025-06-08", prayer: "Seigneur, garde-moi fidèle à ta parole." },
  {
    date: "2025-06-09",
    prayer: "Accorde-moi la paix dans les moments d’incertitude.",
  },
  { date: "2025-06-10", prayer: "Seigneur, éclaire mon cœur et mon esprit." },
  {
    date: "2025-06-11",
    prayer: "Que mon amour pour les autres reflète ton amour pour moi.",
  },
  {
    date: "2025-06-12",
    prayer: "Seigneur, sois ma force dans les moments de faiblesse.",
  },
  {
    date: "2025-06-13",
    prayer: "Donne-moi la grâce d’être patient et compatissant.",
  },
  {
    date: "2025-06-14",
    prayer: "Seigneur, renouvelle en moi un esprit de paix.",
  },
  { date: "2025-06-15", prayer: "Que ma confiance en toi soit mon refuge." },
  {
    date: "2025-06-16",
    prayer: "Seigneur, donne-moi la force de toujours choisir le bien.",
  },
  { date: "2025-06-17", prayer: "Accorde-moi un cœur humble et obéissant." },
  {
    date: "2025-06-18",
    prayer: "Seigneur, guide-moi sur le chemin de la justice.",
  },
  { date: "2025-06-19", prayer: "Que ma vie soit un témoignage de ton amour." },
  { date: "2025-06-20", prayer: "Seigneur, fortifie mon âme et mon esprit." },
  {
    date: "2025-06-21",
    prayer: "Donne-moi la patience pour attendre ton plan parfait.",
  },
  { date: "2025-06-22", prayer: "Seigneur, enseigne-moi à aimer comme toi." },
  { date: "2025-06-23", prayer: "Remplis mon cœur de paix et de joie." },
  { date: "2025-06-24", prayer: "Seigneur, sois ma lumière et mon salut." },
  { date: "2025-06-25", prayer: "Que ma foi en toi grandisse chaque jour." },
  {
    date: "2025-06-26",
    prayer: "Seigneur, garde-moi proche de toi en tout temps.",
  },
  {
    date: "2025-06-27",
    prayer: "Que je sois un témoin de ton amour sur terre.",
  },
  {
    date: "2025-06-28",
    prayer: "Seigneur, renouvelle mes forces et mon espérance.",
  },
  {
    date: "2025-06-29",
    prayer: "Que ton Esprit me guide chaque jour de ma vie.",
  },
  {
    date: "2025-06-30",
    prayer: "Seigneur, sois toujours ma source de paix et d’amour.",
  },
];

const DEFAULT_PRAYER: Readonly<PrayerType> = {
  date: new Date().toDateString(),
  prayer:
    "Seigneur, guide mes pas aujourd'hui et aide-moi à être une lumière pour ceux qui m'entourent.",
};

export default function Home() {
  const [currentPrayer, setCurrentPrayer] = useState<PrayerType | null>(null);
  const prayerCardRef = useRef<HTMLDivElement>(null);
  const prayerContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const prayer = prayers.find((p) => p.date === today) || DEFAULT_PRAYER;
    setCurrentPrayer(prayer);
  }, []);

  const handleShare = async () => {
    if (!currentPrayer) return;

    const shareData = {
      title: "Prière du Jour",
      text: `${currentPrayer.prayer}\n\nAvec foi, amen!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        alert("Prière copiée dans le presse-papier !");
      }
    } catch (error) {
      console.error("Erreur lors du partage:", error);
    }
  };

  const handleExport = async () => {
    if (!prayerContentRef.current) return;

    try {
      const dataUrl = await toJpeg(prayerContentRef.current, {
        quality: 0.95,
        backgroundColor: "white",
      });

      const link = document.createElement("a");
      link.download = `priere-du-${new Date().toISOString().split("T")[0]}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
    }
  };

  if (!currentPrayer) return null;

  return (
    <main className="min-h-screen  flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-amber-100 via-amber-200 to-amber-100">
      <div className="max-w-2xl w-full mx-auto">
        <div ref={prayerCardRef} className="bg-white rounded-3xl shadow-2xl bg-gradient-to-bl from-amber-500  to-purple-500">
          {/* Contenu à exporter */}
          <div ref={prayerContentRef} className="p-10  bg-gradient-to-bl via-blue-red from-amber-500  to-purple-500">
            {/* En-tête avec icône et date */}
            <div className="flex flex-col items-center space-y-4 mb-8">
              {/* <Image
                src="/logo.svg"
                alt="Logo Sel du monde"
                height={56}
                width={56}
                className="rounded-full"
              /> */}
              <div className="space-y-2 text-center">
                <h1 className="text-xl font-bold text-gray-800 ">
                  Prière du Jour
                </h1>
                <p className="text-sm uppercase tracking-wider text-gray-500 ">
                  {new Intl.DateTimeFormat("fr", { dateStyle: "long" }).format(
                    new Date()
                  )}
                </p>
              </div>
            </div>

           

            {/* Contenu de la prière */}
            <div className="  rounded-2xl p-6 mb-10 ">
              <p className="text-xl   leading-relaxed text-center italic">
                {currentPrayer.prayer}
              </p>
            </div>

             {/* Séparateur décoratif */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gray-200 "></div>
              <p>Avec foi, amen!</p>
              {/* <Scroll className="mx-4 w-5 h-5 text-gray-400 " /> */}
              <div className="h-px w-16 bg-gray-200 "></div>
            </div>

            {/* Conclusion */}
            {/* <p className="text-center text-lg font-semibold text-gray-600 ">
              Avec foi, amen!
            </p> */}
          </div>

          {/* Actions - En dehors du contenu à exporter */}
          <div className="flex justify-center gap-8 border-t border-gray-100  pt-10 pb-10 ">
            <button
              onClick={handleShare}
              className="text-gray-500 hover:text-gray-800   transition-colors duration-200"
              title="Partager"
            >
              <Share2 className="w-6 h-6" />
            </button>
            <button
              onClick={handleExport}
              className="text-gray-500 hover:text-gray-800  transition-colors duration-200"
              title="Exporter en image"
            >
              <Download className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm text-gray-500 ">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <a href="https://seldumonde.org">Seldumonde.org</a>. Tous droits
          réservés.
        </p>
        <p className="mt-1 text-xs">Fait avec ❤️ pour la gloire de Dieu</p>
      </div>
    </main>
  );
}
