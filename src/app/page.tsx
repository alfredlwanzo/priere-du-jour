"use client";

import { useEffect, useState, useRef } from "react";
import { Share2, Download } from "lucide-react";
import { toJpeg } from "html-to-image";
import Image from "next/image";

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
    prayer:
      "Seigneur, en ce Samedi Saint, nous méditons sur ton sacrifice et ton repos dans le tombeau. Aide-nous à attendre avec foi et espérance la gloire de ta résurrection.",
  },
  {
    date: "2025-04-20",
    prayer:
      "Alléluia ! Seigneur, en ce Dimanche de Pâques, nous célébrons ta victoire sur la mort. Remplis nos cœurs de joie et de gratitude pour le don de la vie éternelle.",
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
  {
    date: "2025-07-01",
    prayer: "Seigneur, renouvelle mes forces pour ce nouveau mois.",
  },
  {
    date: "2025-07-02",
    prayer: "Donne-moi un cœur attentif à ta parole aujourd’hui.",
  },
  {
    date: "2025-07-03",
    prayer: "Que mon esprit soit rempli de paix et d’espérance.",
  },
  {
    date: "2025-07-04",
    prayer: "Seigneur, aide-moi à être une source d’encouragement.",
  },
  {
    date: "2025-07-05",
    prayer: "Remplis-moi de gratitude pour chaque bénédiction reçue.",
  },
  {
    date: "2025-07-06",
    prayer: "Que ma vie reflète ta sagesse et ta patience.",
  },
  {
    date: "2025-07-07",
    prayer: "Seigneur, donne-moi la force d’aimer comme toi.",
  },
  {
    date: "2025-07-08",
    prayer: "Aide-moi à affronter les défis avec foi et confiance.",
  },
  {
    date: "2025-07-09",
    prayer: "Seigneur, éclaire mes décisions aujourd’hui.",
  },
  {
    date: "2025-07-10",
    prayer: "Donne-moi la paix face aux incertitudes de la vie.",
  },
  {
    date: "2025-07-11",
    prayer: "Seigneur, que ma journée soit remplie de ta présence.",
  },
  {
    date: "2025-07-12",
    prayer: "Que mes paroles soient douces et bienveillantes.",
  },
  {
    date: "2025-07-13",
    prayer: "Seigneur, accorde-moi la patience en toutes choses.",
  },
  { date: "2025-07-14", prayer: "Aide-moi à trouver du repos en toi." },
  {
    date: "2025-07-15",
    prayer: "Que mon cœur soit rempli d’humilité et d’amour.",
  },
  {
    date: "2025-07-16",
    prayer: "Seigneur, guide-moi sur le chemin de la justice.",
  },
  {
    date: "2025-07-17",
    prayer: "Apprends-moi à être reconnaissant même dans l’épreuve.",
  },
  { date: "2025-07-18", prayer: "Que ma foi grandisse chaque jour en toi." },
  {
    date: "2025-07-19",
    prayer: "Seigneur, enseigne-moi à marcher dans ta lumière.",
  },
  { date: "2025-07-20", prayer: "Remplis mon âme de paix et de joie." },
  {
    date: "2025-07-21",
    prayer: "Aide-moi à voir tes bénédictions dans chaque instant.",
  },
  { date: "2025-07-22", prayer: "Que je sois un témoin fidèle de ton amour." },
  {
    date: "2025-07-23",
    prayer: "Seigneur, garde-moi dans ta vérité et ta justice.",
  },
  {
    date: "2025-07-24",
    prayer: "Apprends-moi à pardonner comme toi tu pardonnes.",
  },
  {
    date: "2025-07-25",
    prayer: "Que ma journée commence et se termine par la prière.",
  },
  { date: "2025-07-26", prayer: "Seigneur, remplis mon cœur de compassion." },
  {
    date: "2025-07-27",
    prayer: "Aide-moi à garder confiance en toi malgré les tempêtes.",
  },
  { date: "2025-07-28", prayer: "Que ma foi se renforce chaque jour en toi." },
  {
    date: "2025-07-29",
    prayer: "Seigneur, enseigne-moi à être patient et humble.",
  },
  { date: "2025-07-30", prayer: "Aide-moi à aimer sans condition." },
  {
    date: "2025-07-31",
    prayer: "Seigneur, prépare mon cœur pour un nouveau mois.",
  },
  { date: "2025-08-01", prayer: "Que ce mois commence sous ta bénédiction." },
  {
    date: "2025-08-02",
    prayer: "Seigneur, donne-moi la sagesse pour chaque situation.",
  },
  {
    date: "2025-08-03",
    prayer: "Aide-moi à voir ta main dans chaque détail de ma vie.",
  },
  {
    date: "2025-08-04",
    prayer: "Que ma foi brille comme une lumière autour de moi.",
  },
  { date: "2025-08-05", prayer: "Seigneur, renouvelle ma joie aujourd’hui." },
  {
    date: "2025-08-06",
    prayer: "Aide-moi à marcher avec confiance et sérénité.",
  },
  { date: "2025-08-07", prayer: "Que je trouve mon refuge en toi seul." },
  {
    date: "2025-08-08",
    prayer: "Seigneur, garde-moi dans ta paix aujourd’hui.",
  },
  {
    date: "2025-08-09",
    prayer: "Donne-moi la force de persévérer dans la foi.",
  },
  {
    date: "2025-08-10",
    prayer: "Seigneur, remplis mon cœur de ta joie parfaite.",
  },
  {
    date: "2025-08-11",
    prayer: "Aide-moi à être une bénédiction pour mon entourage.",
  },
  {
    date: "2025-08-12",
    prayer: "Que mes actions reflètent ton amour aujourd’hui.",
  },
  {
    date: "2025-08-13",
    prayer: "Seigneur, accorde-moi la patience et l’humilité.",
  },
  { date: "2025-08-14", prayer: "Que mon âme trouve du repos en toi." },
  {
    date: "2025-08-15",
    prayer: "Seigneur, sois mon guide en toute circonstance.",
  },
  { date: "2025-08-16", prayer: "Apprends-moi à toujours garder l’espérance." },
  { date: "2025-08-17", prayer: "Seigneur, fortifie mon cœur et mon esprit." },
  { date: "2025-08-18", prayer: "Aide-moi à semer la paix autour de moi." },
  { date: "2025-08-19", prayer: "Que mon cœur reste attaché à ta vérité." },
  {
    date: "2025-08-20",
    prayer: "Seigneur, garde-moi fidèle à toi en toutes choses.",
  },
  {
    date: "2025-08-21",
    prayer: "Apprends-moi à me réjouir en toi chaque jour.",
  },
  { date: "2025-08-22", prayer: "Que ma foi soit inébranlable en toi." },
  {
    date: "2025-08-23",
    prayer: "Seigneur, remplis mon cœur d’amour et de paix.",
  },
  {
    date: "2025-08-24",
    prayer: "Que ma vie soit un témoignage de ta fidélité.",
  },
  {
    date: "2025-08-25",
    prayer: "Seigneur, accorde-moi ta sagesse en toutes choses.",
  },
  {
    date: "2025-08-26",
    prayer: "Aide-moi à toujours faire confiance à ton plan.",
  },
  {
    date: "2025-08-27",
    prayer: "Seigneur, guide mes pas aujourd’hui et toujours.",
  },
  {
    date: "2025-08-28",
    prayer: "Que ma vie glorifie ton nom en toutes choses.",
  },
  {
    date: "2025-08-29",
    prayer: "Seigneur, remplis-moi de ta force et de ton courage.",
  },
  { date: "2025-08-30", prayer: "Aide-moi à toujours chercher ta présence." },
  {
    date: "2025-08-31",
    prayer: "Seigneur, je termine ce mois avec gratitude et foi.",
  },
  {
    date: "2025-09-01",
    prayer: "Seigneur, renouvelle mes forces pour ce mois qui commence.",
  },
  { date: "2025-09-02", prayer: "Aide-moi à garder un cœur pur et sincère." },
  {
    date: "2025-09-03",
    prayer: "Que ma confiance en toi grandisse chaque jour.",
  },
  {
    date: "2025-09-04",
    prayer: "Donne-moi la sagesse dans toutes mes décisions.",
  },
  {
    date: "2025-09-05",
    prayer: "Seigneur, apprends-moi à aimer sans condition.",
  },
  {
    date: "2025-09-06",
    prayer: "Remplis-moi de paix et de patience aujourd’hui.",
  },
  {
    date: "2025-09-07",
    prayer: "Que ma foi soit ferme face aux défis de la vie.",
  },
  { date: "2025-09-08", prayer: "Seigneur, sois mon refuge et mon guide." },
  {
    date: "2025-09-09",
    prayer: "Apprends-moi à voir le bien en chaque personne.",
  },
  {
    date: "2025-09-10",
    prayer: "Que ma journée soit remplie de gratitude et d’espérance.",
  },
  {
    date: "2025-09-11",
    prayer: "Seigneur, je me remets entre tes mains aujourd’hui.",
  },
  {
    date: "2025-09-12",
    prayer: "Aide-moi à marcher dans la droiture et l’humilité.",
  },
  {
    date: "2025-09-13",
    prayer: "Remplis-moi d’amour pour ceux qui m’entourent.",
  },
  {
    date: "2025-09-14",
    prayer: "Que ma vie témoigne de ta grâce et de ta fidélité.",
  },
  {
    date: "2025-09-15",
    prayer: "Seigneur, fortifie mon cœur face aux épreuves.",
  },
  {
    date: "2025-09-16",
    prayer: "Donne-moi la force de persévérer dans la prière.",
  },
  {
    date: "2025-09-17",
    prayer: "Que ma bouche prononce des paroles de bénédiction.",
  },
  { date: "2025-09-18", prayer: "Seigneur, renouvelle mon âme et mon esprit." },
  {
    date: "2025-09-19",
    prayer: "Aide-moi à être une source de paix et de réconfort.",
  },
  {
    date: "2025-09-20",
    prayer: "Seigneur, éclaire mon chemin et guide mes pas.",
  },
  { date: "2025-09-21", prayer: "Apprends-moi à écouter et à suivre ta voix." },
  {
    date: "2025-09-22",
    prayer: "Que je sois un instrument de ta paix aujourd’hui.",
  },
  { date: "2025-09-23", prayer: "Seigneur, remplis mon cœur de ta présence." },
  {
    date: "2025-09-24",
    prayer: "Aide-moi à toujours choisir la vérité et l’amour.",
  },
  {
    date: "2025-09-25",
    prayer: "Que ma foi ne chancelle pas devant l’adversité.",
  },
  { date: "2025-09-26", prayer: "Seigneur, sois ma force et mon réconfort." },
  {
    date: "2025-09-27",
    prayer: "Aide-moi à vivre selon ta parole chaque jour.",
  },
  { date: "2025-09-28", prayer: "Que ta paix habite mon cœur et mon esprit." },
  {
    date: "2025-09-29",
    prayer: "Seigneur, je te confie toutes mes inquiétudes.",
  },
  { date: "2025-09-30", prayer: "Donne-moi la force de rester fidèle à toi." },
  {
    date: "2025-10-01",
    prayer: "Seigneur, bénis ce mois et guide-moi en tout temps.",
  },
  {
    date: "2025-10-02",
    prayer: "Apprends-moi à être reconnaissant en toute circonstance.",
  },
  {
    date: "2025-10-03",
    prayer: "Que mon cœur soit rempli d’amour et de compassion.",
  },
  { date: "2025-10-04", prayer: "Seigneur, renouvelle mon espoir et ma foi." },
  {
    date: "2025-10-05",
    prayer: "Aide-moi à faire preuve de patience et d’humilité.",
  },
  { date: "2025-10-06", prayer: "Que ma vie reflète ta lumière et ta bonté." },
  {
    date: "2025-10-07",
    prayer: "Seigneur, apprends-moi à marcher selon ta volonté.",
  },
  { date: "2025-10-08", prayer: "Remplis-moi de paix et de joie aujourd’hui." },
  { date: "2025-10-09", prayer: "Que je sois un témoin fidèle de ton amour." },
  {
    date: "2025-10-10",
    prayer: "Seigneur, éclaire mes choix et mes décisions.",
  },
  { date: "2025-10-11", prayer: "Donne-moi un cœur généreux et compatissant." },
  {
    date: "2025-10-12",
    prayer: "Aide-moi à persévérer malgré les difficultés.",
  },
  { date: "2025-10-13", prayer: "Que ma foi se renforce jour après jour." },
  {
    date: "2025-10-14",
    prayer: "Seigneur, sois ma force dans les moments de faiblesse.",
  },
  { date: "2025-10-15", prayer: "Que ton amour soit ma source de réconfort." },
  {
    date: "2025-10-16",
    prayer: "Aide-moi à toujours faire preuve d’humilité.",
  },
  {
    date: "2025-10-17",
    prayer: "Seigneur, apprends-moi à pardonner de tout mon cœur.",
  },
  { date: "2025-10-18", prayer: "Remplis-moi de sagesse et de discernement." },
  {
    date: "2025-10-19",
    prayer: "Que je sois un reflet de ta bonté et de ta miséricorde.",
  },
  {
    date: "2025-10-20",
    prayer: "Seigneur, je mets ma confiance en toi aujourd’hui.",
  },
  {
    date: "2025-10-21",
    prayer: "Aide-moi à témoigner de ta fidélité en tout temps.",
  },
  {
    date: "2025-10-22",
    prayer: "Que mon cœur soit en paix et rempli d’espérance.",
  },
  { date: "2025-10-23", prayer: "Seigneur, sois ma lumière et mon réconfort." },
  {
    date: "2025-10-24",
    prayer: "Donne-moi la force de rester fidèle à tes enseignements.",
  },
  {
    date: "2025-10-25",
    prayer: "Aide-moi à aimer même dans les moments difficiles.",
  },
  {
    date: "2025-10-26",
    prayer: "Que ma journée soit remplie de ta grâce et de ta paix.",
  },
  {
    date: "2025-10-27",
    prayer: "Seigneur, je remets mes projets entre tes mains.",
  },
  { date: "2025-10-28", prayer: "Apprends-moi à écouter et à suivre ta voix." },
  { date: "2025-10-29", prayer: "Que ma foi en toi soit inébranlable." },
  {
    date: "2025-10-30",
    prayer: "Seigneur, renouvelle mon cœur et mon esprit.",
  },
  {
    date: "2025-10-31",
    prayer: "Aide-moi à terminer ce mois avec gratitude et paix.",
  },
  {
    date: "2025-11-01",
    prayer: "Seigneur, remplis mon cœur d’humilité et de paix.",
  },
  {
    date: "2025-11-02",
    prayer: "Aide-moi à toujours rechercher ta présence en toute chose.",
  },
  {
    date: "2025-11-03",
    prayer: "Donne-moi la sagesse pour affronter chaque défi avec foi.",
  },
  {
    date: "2025-11-04",
    prayer: "Que ton amour me guide dans toutes mes décisions.",
  },
  {
    date: "2025-11-05",
    prayer: "Seigneur, enseigne-moi à marcher selon ta volonté.",
  },
  {
    date: "2025-11-06",
    prayer: "Que ma vie soit un témoignage vivant de ta grâce.",
  },
  {
    date: "2025-11-07",
    prayer: "Accorde-moi la patience et la force dans les épreuves.",
  },
  {
    date: "2025-11-08",
    prayer: "Seigneur, remplis mon cœur de compassion pour les autres.",
  },
  {
    date: "2025-11-09",
    prayer: "Donne-moi un esprit de pardon et de réconciliation.",
  },
  {
    date: "2025-11-10",
    prayer: "Que ma foi demeure inébranlable en toi, Seigneur.",
  },
  {
    date: "2025-11-11",
    prayer: "Seigneur, aide-moi à être une lumière pour mon entourage.",
  },
  {
    date: "2025-11-12",
    prayer: "Remplis-moi d’espérance et de confiance en ton plan.",
  },
  {
    date: "2025-11-13",
    prayer: "Seigneur, je dépose mes inquiétudes entre tes mains.",
  },
  {
    date: "2025-11-14",
    prayer: "Que je sois un instrument de paix et d’amour aujourd’hui.",
  },
  {
    date: "2025-11-15",
    prayer: "Apprends-moi à écouter ta voix et à suivre ta direction.",
  },
  {
    date: "2025-11-16",
    prayer: "Seigneur, renouvelle mon esprit et fortifie ma foi.",
  },
  {
    date: "2025-11-17",
    prayer: "Aide-moi à voir tes bénédictions dans chaque situation.",
  },
  {
    date: "2025-11-18",
    prayer: "Seigneur, garde-moi proche de toi en toute circonstance.",
  },
  {
    date: "2025-11-19",
    prayer: "Que ton amour transforme mon cœur chaque jour.",
  },
  {
    date: "2025-11-20",
    prayer: "Seigneur, remplis-moi de paix face aux incertitudes.",
  },
  {
    date: "2025-11-21",
    prayer: "Aide-moi à persévérer malgré les difficultés.",
  },
  {
    date: "2025-11-22",
    prayer: "Que ma vie soit remplie de louanges et de reconnaissance.",
  },
  {
    date: "2025-11-23",
    prayer: "Seigneur, je te fais confiance pour l’avenir.",
  },
  {
    date: "2025-11-24",
    prayer: "Donne-moi la force d’aimer comme tu nous aimes.",
  },
  {
    date: "2025-11-25",
    prayer: "Seigneur, garde-moi dans ta vérité et ta justice.",
  },
  { date: "2025-11-26", prayer: "Aide-moi à cultiver un esprit de gratitude." },
  { date: "2025-11-27", prayer: "Que ton Esprit Saint me guide chaque jour." },
  {
    date: "2025-11-28",
    prayer: "Seigneur, éclaire mon chemin et affermis ma foi.",
  },
  {
    date: "2025-11-29",
    prayer: "Apprends-moi à être patient et à attendre ton timing parfait.",
  },
  {
    date: "2025-11-30",
    prayer: "Seigneur, je te rends grâce pour cette année qui s’achève.",
  },
  {
    date: "2025-12-01",
    prayer: "Seigneur, remplis mon cœur de joie en cette nouvelle saison.",
  },
  {
    date: "2025-12-02",
    prayer: "Que ta paix demeure en moi malgré les défis.",
  },
  {
    date: "2025-12-03",
    prayer: "Seigneur, apprends-moi à toujours te faire confiance.",
  },
  {
    date: "2025-12-04",
    prayer: "Accorde-moi la force d’aimer même lorsque c’est difficile.",
  },
  {
    date: "2025-12-05",
    prayer: "Seigneur, que ta volonté soit faite dans ma vie.",
  },
  {
    date: "2025-12-06",
    prayer: "Remplis-moi de gratitude pour chaque bénédiction reçue.",
  },
  {
    date: "2025-12-07",
    prayer: "Que mon cœur soit tourné vers toi en tout temps.",
  },
  {
    date: "2025-12-08",
    prayer: "Seigneur, je t’élève mon adoration et ma reconnaissance.",
  },
  { date: "2025-12-09", prayer: "Que je sois un témoin fidèle de ton amour." },
  {
    date: "2025-12-10",
    prayer: "Seigneur, accorde-moi la persévérance dans la foi.",
  },
  {
    date: "2025-12-11",
    prayer: "Aide-moi à être patient et bienveillant avec mon prochain.",
  },
  {
    date: "2025-12-12",
    prayer: "Seigneur, renouvelle mon esprit et remplis-moi de ta paix.",
  },
  { date: "2025-12-13", prayer: "Que ma vie reflète ta lumière et ta vérité." },
  {
    date: "2025-12-14",
    prayer: "Seigneur, apprends-moi à aimer sans condition.",
  },
  {
    date: "2025-12-15",
    prayer: "Aide-moi à me souvenir de tes bienfaits chaque jour.",
  },
  {
    date: "2025-12-16",
    prayer: "Seigneur, je remets mon avenir entre tes mains.",
  },
  {
    date: "2025-12-17",
    prayer: "Donne-moi un cœur humble et obéissant à ta voix.",
  },
  {
    date: "2025-12-18",
    prayer: "Seigneur, sois mon guide dans cette fin d’année.",
  },
  { date: "2025-12-19", prayer: "Que ta présence soit ma paix et ma joie." },
  {
    date: "2025-12-20",
    prayer: "Seigneur, fortifie ma foi en cette saison de célébration.",
  },
  {
    date: "2025-12-21",
    prayer: "Accorde-moi la grâce de partager ton amour autour de moi.",
  },
  {
    date: "2025-12-22",
    prayer: "Seigneur, je veux te louer pour tout ce que tu as fait.",
  },
  {
    date: "2025-12-23",
    prayer: "Que ta gloire brille à travers ma vie en cette fin d’année.",
  },
  {
    date: "2025-12-24",
    prayer: "Seigneur, remplis mon foyer de paix et d’amour.",
  },
  {
    date: "2025-12-25",
    prayer: "Merci pour le cadeau précieux de Jésus-Christ !",
  },
  {
    date: "2025-12-26",
    prayer: "Seigneur, je veux commencer cette nouvelle année avec foi.",
  },
  {
    date: "2025-12-27",
    prayer: "Que je sois un messager de ta paix et de ton amour.",
  },
  {
    date: "2025-12-28",
    prayer: "Seigneur, merci pour chaque instant vécu cette année.",
  },
  { date: "2025-12-29", prayer: "Prépare mon cœur pour l’année à venir." },
  {
    date: "2025-12-30",
    prayer: "Seigneur, je t’offre tout ce que je suis et tout ce que j’ai.",
  },
  {
    date: "2025-12-31",
    prayer: "Merci Seigneur pour cette année, que la suivante soit bénie !",
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
      <div className="max-w-xl w-full mx-auto">
        <div
          ref={prayerCardRef}
          className="bg-white rounded-3xl shadow-2xl bg-gradient-to-bl from-amber-500  to-purple-500"
        >
          {/* Contenu à exporter */}
          <div
            ref={prayerContentRef}
            className="p-10  bg-gradient-to-bl via-blue-red from-amber-500  to-purple-500"
          >
            {/* En-tête avec icône et date */}
            <div className="flex flex-col items-center space-y-4 mb-8">
              <Image
                src="/logo.svg"
                alt="Logo Sel du monde"
                height={36}
                width={36}
                className="rounded-full"
              />
              <div className="space-y-2 text-center">
                <h1 className="text-sm font-bold uppercase text-gray-700 ">
                  Prière du Jour
                </h1>
                <p className="text-sm normal-case tracking-wider text-gray-500 ">
                  {new Intl.DateTimeFormat("fr", { dateStyle: "long" }).format(
                    new Date()
                  )}
                </p>
              </div>
            </div>

            {/* Contenu de la prière */}
            <div className="  rounded-2xl md:p-6 mb-10 ">
              <p className=" text-white   leading-relaxed text-center italic">
                {currentPrayer.prayer} Amen!
              </p>
            </div>
          </div>

          {/* Actions - En dehors du contenu à exporter */}
          <div className="flex justify-center gap-8 bg-white border-t border-gray-100 py-6 md:py-10 rounded-b-3xl">
            <button
              onClick={handleShare}
              className="flex-1 text-gray-500 hover:text-gray-800   transition-colors duration-200"
              title="Partager"
            >
              <Share2 className="w-6 h-6 inline-block" />
              {/* Partager */}
            </button>
            <button
              onClick={handleExport}
              className="flex-1 text-gray-500 hover:text-gray-800  transition-colors duration-200"
              title="Exporter en image"
            >
              <Download className="w-6 h-6 inline-block" />
              {/* Télécharger */}
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
