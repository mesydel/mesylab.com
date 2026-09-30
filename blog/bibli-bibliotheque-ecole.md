---
date: 2026-09-16
title: "Bibli : une petite application pour la bibliothèque d'une école"
sidebar: auto
author: Martin Erpicum
category: Article
lang: fr
project: bibli
description: "Prêter à la douchette, cataloguer par ISBN, imprimer les étiquettes : une application libre pour la bibliothèque d'une école, tenue par des bénévoles."
image: assets/bibli/scan-smartphone.jpg
tags:
  - bibli
  - go
  - sqlite
---

**Bibli** est une application pour la bibliothèque d'une école. Je l'ai écrite pour celle de l'école de Lincé, en Belgique francophone : environ deux mille livres, deux cents élèves et quelques dizaines de prêts par semaine. Ce sont des enseignants et des bénévoles qui la font vivre, sans informaticien sur place.

On y prête et on rend des livres à la douchette, on catalogue un livre en scannant son ISBN, on imprime les étiquettes et les cartes d'élèves, on suit les retards. L'interface existe en français, en néerlandais et en anglais.

![L'accueil de Bibli : emprunter, rendre, et les livres en rayon, en prêt et en retard](assets/bibli/home.png)

Une démonstration de deux minutes, sur des données fictives :

[![Démonstration de Bibli en vidéo](assets/bibli/video.jpg)](https://www.youtube.com/watch?v=Yo_IYGwo8sM)

Il y a aussi une [instance de démonstration](https://bibli.tintamarre.be) (mot de passe `demo`) : une école fictive, où l'on peut tout essayer et qui est remise à zéro régulièrement.

## Au comptoir

Le comptoir, ce sont deux écrans : *Emprunter* et *Rendre*. Pour un prêt, on scanne la carte de l'élève, puis ses livres, et on confirme une fois pour tout le panier. L'écran rappelle ce que l'enfant a déjà emprunté. Pour un retour, il suffit de scanner le livre.

![L'écran de prêt : l'emprunteur, puis les livres scannés](assets/bibli/borrow.png)

Une douchette USB d'entrée de gamme, autour de 30 €, fait l'affaire : elle se comporte comme un clavier et ne demande aucun réglage. La caméra d'un téléphone ou d'une tablette peut aussi servir. Un élève a oublié sa carte ? On tape sa classe et le début de son prénom (« P3 lé »). Une étiquette est illisible ? Quelques mots du titre suffisent.

## Cataloguer

On scanne l'ISBN au dos du livre, et Bibli interroge les catalogues : la [BnF](https://www.bnf.fr), [UniCat](https://www.unicat.be) pour les éditions belges, puis Google Books et Open Library. La fiche arrive pré-remplie, avec le titre, les auteurs, l'éditeur et la couverture. On vérifie, on indique le nombre d'exemplaires et, si on le souhaite, un emplacement (« Albums 3/5 », « classe P3 »).

![La fiche remplie depuis l'ISBN, avec sa couverture](assets/bibli/catalogue.png)

Le code-barres d'un livre est un ISBN-13, mais beaucoup de livres parus avant 2007 ne sont connus des catalogues que sous leur ancien ISBN-10. Bibli calcule donc les deux formes et cherche avec les deux, ce qui fait une vraie différence pour le fonds ancien.

Environ un livre sur dix n'est trouvé nulle part : albums pour tout-petits, petits éditeurs, livres anciens. La saisie à la main est prévue pour ça, et seul le titre est obligatoire. Un livre inconnu scanné au comptoir peut aussi être catalogué sur-le-champ, puis prêté dans la foulée.

## Étiquettes et cartes

On peut se passer d'étiquettes et prêter directement à l'ISBN. Elles deviennent utiles pour les livres sans code-barres et pour les titres en plusieurs exemplaires. Elles s'impriment sur des planches A4 autocollantes de 44 étiquettes, avec un code-barres, le titre et la cote. La cote, ce sont les trois premières lettres du nom de l'auteur, comme dans les bibliothèques publiques : SAI pour Saint-Exupéry.

![Une planche d'étiquettes : titre, code-barres et cote](assets/bibli/labels.png)

Les cartes d'élèves s'impriment par classe, sur les mêmes planches. Imprimée sur papier ordinaire, la page d'une classe devient une feuille à garder au comptoir pour les cartes oubliées.

![Les cartes d'une classe : prénom, initiale et code-barres](assets/bibli/cards.png)

## Au fil de l'année

L'écran *Prêts* liste ce qui est sorti, classe par classe. Les retards s'impriment en une liste groupée par classe, à déposer dans chaque classe.

![Les prêts en cours, groupés par classe puis par élève](assets/bibli/loans.png)

L'inventaire liste tous les exemplaires, avec leur emplacement et leur état (abîmé, perdu, retiré du fonds). Trié par cote, il suit l'ordre des rayons. Les statistiques montrent les livres les plus empruntés et ceux qui ne sont jamais sortis. À la rentrée, un seul écran fait passer les classes à l'année suivante, et la liste des nouveaux élèves s'importe depuis un tableur.

![L'inventaire, avec l'emplacement et l'état de chaque exemplaire](assets/bibli/inventory.png)

## Les données des enfants

Pour un élève, Bibli enregistre un prénom, l'initiale du nom et une classe, rien de plus : si on tape « Durant », seul « D. » est gardé. Au bout de trois ans par défaut (c'est réglable), les prêts passés ne sont plus rattachés à l'enfant. Les livres, eux, gardent leur nombre d'emprunts.

Si l'école le souhaite, chaque famille peut recevoir un lien personnel qui montre les livres en cours de l'enfant et leur date de retour. Les parents n'ont pas besoin de compte, et Bibli n'envoie aucun message.

![Le lien de suivi d'une famille, sur un téléphone](assets/bibli/family.png)

Pour retrouver une fiche, seul l'ISBN du livre quitte le serveur. Les couvertures sont récupérées par Bibli lui-même, pas par le navigateur des élèves.

## Installer

Il y a deux façons de l'installer. Pour une bibliothèque qui n'a qu'un ordinateur, une application de bureau pour Mac, Windows ou Linux se télécharge et s'ouvre d'un double-clic. Pour plusieurs postes ou des tablettes, Bibli peut tourner comme serveur sur le réseau de l'école ou sur Internet. Un vieux PC ou un Raspberry Pi suffit.

Sous le capot, c'est un binaire Go et un fichier SQLite, avec HTMX pour l'interactivité. Tout est servi par l'application : pas de CDN, pas de compte à créer. Prêter et rendre fonctionnent même sans Internet. Une sauvegarde est faite chaque jour, et on la télécharge depuis les réglages.

Bibli est un logiciel libre sous licence AGPL-3.0. Le code et la documentation sont sur [github.com/tintamarre/bibli](https://github.com/tintamarre/bibli).

L'école commence tout juste à l'utiliser. Si une autre école voulait l'essayer, ou si vous avez une remarque, écrivez-moi.
