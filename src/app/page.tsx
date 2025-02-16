"use client";

import { useEffect, useState, useRef } from "react";
import { Scroll, Share2, Download } from "lucide-react";
import { toJpeg } from "html-to-image";
import Image from "next/image";

interface PrayerType {
  date: string;
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
        <div
          ref={prayerCardRef}
          className="bg-white rounded-3xl shadow-2xl "
        >
          {/* Contenu à exporter */}
          <div ref={prayerContentRef} className="p-10">
            {/* En-tête avec icône et date */}
            <div className="flex flex-col items-center space-y-4 mb-8">
              <Image
                src="/logo.svg"
                alt="Logo Sel du monde"
                height={56}
                width={56}
                className="rounded-full"
              />
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold text-gray-800 ">
                  Prière du Jour
                </h1>
                <p className="text-sm uppercase tracking-wider text-gray-500 ">
                  {new Intl.DateTimeFormat("fr", { dateStyle: "long" }).format(
                    new Date()
                  )}
                </p>
              </div>
            </div>

            {/* Séparateur décoratif */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px w-16 bg-gray-200 "></div>
              <Scroll className="mx-4 w-5 h-5 text-gray-400 " />
              <div className="h-px w-16 bg-gray-200 "></div>
            </div>

            {/* Contenu de la prière */}
            <div className="bg-amber-50  rounded-2xl p-6 mb-10">
              <p className="text-xl text-gray-700  leading-relaxed text-center italic">
                {currentPrayer.prayer}
              </p>
            </div>

            {/* Conclusion */}
            <p className="text-center text-lg font-semibold text-gray-600 ">
              Avec foi, amen!
            </p>
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
