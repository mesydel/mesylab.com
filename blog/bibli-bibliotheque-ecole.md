---
date: 2026-09-16
title: "Bibli : une petite application pour la bibliothèque d'une école"
sidebar: auto
author: Martin Erpicum
category: Article
lang: fr
project: bibli
description: "J'ai écrit une petite application pour la bibliothèque de l'école de Lincé. Voici ce qu'elle fait, et comment."
image: assets/bibli/scan-smartphone.jpg
tags:
  - bibli
  - go
  - sqlite
---

**Bibli** est une petite application que j'ai écrite pour la bibliothèque de l'école de Lincé. Environ trois mille livres, deux cents élèves et quelques dizaines de prêts par semaine. Ce sont des enseignants et des bénévoles qui s'en occupent, et il n'y a pas d'informaticien à l'école.

J'ai fait une vidéo de deux minutes sur des données fictives. Si vous préférez essayer vous-même, il y a une [instance de démonstration](https://bibli.tintamarre.be) (mot de passe `demo`).

[![Démonstration de Bibli en vidéo](assets/bibli/video.jpg)](https://www.youtube.com/watch?v=Yo_IYGwo8sM)

## Prêter et rendre

Au comptoir, on scanne la carte de l'élève puis ses livres, et on valide. Pour un retour, on scanne simplement le livre, sans avoir besoin de savoir qui l'avait. Une douchette USB à une trentaine d'euros suffit, puisqu'elle se fait passer pour un clavier. La caméra d'une tablette marche aussi. Quand un enfant a oublié sa carte, on tape sa classe et le début de son prénom.

![L'écran de prêt](assets/bibli/borrow.png)

## Cataloguer

Quand on scanne l'ISBN d'un livre, Bibli va chercher la notice à la [BnF](https://www.bnf.fr), puis sur [UniCat](https://www.unicat.be) pour les éditions belges, et enfin chez Google Books et Open Library. La plupart du temps, la fiche arrive complète avec la couverture, et il n'y a plus qu'à dire combien d'exemplaires on a.

C'est aussi là que je me suis trompé en premier. Le code-barres d'un livre est un ISBN-13, mais pour les livres d'avant 2007, les catalogues ne connaissent souvent que l'ancien ISBN-10. Dans une bibliothèque d'école, ces livres-là sont nombreux. Bibli essaie donc maintenant les deux formes. Il reste à peu près un livre sur dix qu'on ne trouve nulle part, surtout des albums pour les petits, et ceux-là s'encodent à la main.

![La fiche d'un livre après le scan de son ISBN](assets/bibli/catalogue.png)

On n'est pas obligé de coller des étiquettes, parce qu'on peut prêter avec l'ISBN imprimé sur le livre. Elles servent surtout pour les livres sans code-barres, et pour ceux qu'on a en plusieurs exemplaires. Bibli les imprime sur des planches d'autocollants, avec un code-barres et la cote, c'est-à-dire les trois premières lettres de l'auteur (SAI pour Saint-Exupéry). Les cartes des élèves s'impriment de la même manière, classe par classe.

![Une planche d'étiquettes](assets/bibli/labels.png)

Pour le reste de l'année, il y a une liste des retards à imprimer pour chaque classe, un inventaire, des statistiques sur les livres qui ne sortent jamais, et un écran pour faire passer tout le monde dans la classe suivante en septembre.

## Les données des enfants

Je voulais garder le moins d'informations possible sur les élèves. Bibli ne connaît que le prénom, l'initiale du nom et la classe. Après trois ans, les anciens prêts sont détachés de l'enfant, et seul le livre garde son compteur. Si l'école le veut, les parents peuvent recevoir un lien qui montre ce que leur enfant a emprunté, sans créer de compte et sans donner d'adresse e-mail. Quand Bibli cherche une notice, il n'envoie que l'ISBN.

![Le lien envoyé aux parents, sur un téléphone](assets/bibli/family.png)

## Côté technique

C'est un binaire Go avec une base SQLite et un peu de HTMX. Il n'y a ni CDN ni service extérieur, et on peut prêter même si Internet est coupé. Sauvegarder, c'est copier un fichier, et Bibli en fait une copie tous les jours. On peut l'installer comme une application sur l'ordinateur de la bibliothèque, ou comme serveur si l'école veut l'utiliser sur plusieurs postes ou sur des tablettes. L'interface existe en français, en néerlandais et en anglais.

Le code est libre, sous licence AGPL-3.0, et il se trouve sur [GitHub](https://github.com/tintamarre/bibli).

L'école commence à peine à s'en servir, et je m'attends à devoir changer pas mal de choses une fois que les élèves seront passés au comptoir. Si vous travaillez dans une école et que ça vous intéresse, écrivez-moi.
