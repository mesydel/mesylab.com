---
date: 2026-09-16
title: "Bibli : une petite application pour la bibliothèque d'une école"
sidebar: auto
author: Martin Erpicum
category: Article
lang: fr
project: bibli
description: "Un binaire, un fichier SQLite, six écrans. Notes sur une application écrite pour la bibliothèque d'une école primaire."
image: assets/bibli/hero.png
tags:
  - bibli
  - go
  - sqlite
---

**Bibli** est une petite application écrite pour la bibliothèque de l'école de Lincé. L'objectif est de gérer environ deux mille livres, deux cents élèves, quelques dizaines de prêts par semaine. Tenue uniquement par des enseignants et des bénévoles, l'objectif est de rester simple et accessible.

C'est cette dernière phrase qui a décidé de tout le reste. J'ai essayé de m'en tenir à une question : qu'est-ce qui casse dans cinq ans si plus personne n'y touche ? Un binaire Go, un fichier SQLite, la bibliothèque standard, HTMX pour l'interactivité — le tout versionné dans le dépôt, aucun CDN, une seule dépendance de production. Rien d'original, et c'est un peu l'idée : sauvegarder, c'est copier un fichier.

![Les prêts en cours](assets/bibli/hero.png)

## Au comptoir

Un prêt se fait avec une douchette USB à 30 €, qui se comporte comme un clavier. On scanne la carte de l'élève, puis les livres. L'écran rappelle ce que l'enfant a déjà emprunté, et signale ses retards avant qu'on lui en confie un de plus. Le retour ne demande que le code-barres du livre.

![L'écran d'emprunt](assets/bibli/01.png)

Une caméra de tablette fonctionne aussi, mais la douchette reste plus rapide qu'un téléphone tenu par un enfant de huit ans.

## L'ISBN, et sa deuxième forme

C'est l'endroit où je me suis trompé en premier. Le code-barres au dos d'un livre est toujours un EAN-13, mais les ouvrages d'avant 2007 ont été catalogués sous ISBN-10, et beaucoup de notices ne sont indexées que sous cette forme-là. Interroger un catalogue avec la seule valeur scannée laisse de côté une partie du fonds — la partie ancienne, c'est-à-dire l'essentiel d'une bibliothèque d'école.

Bibli calcule donc les deux formes et interroge avec les deux : la BnF d'abord, puis UniCat pour les éditions belges, Google Books et Open Library ensuite. La fiche arrive pré-remplie, on la corrige, on indique le nombre d'exemplaires.

![La fiche après le scan d'un ISBN](assets/bibli/02.png)

Il reste 10 à 15 % d'introuvables — albums pour tout-petits, petits éditeurs, livres anciens. La saisie manuelle est donc à un clic, et ce n'est pas un chemin de secours : c'est un chemin normal.

Les étiquettes s'impriment par quatre dans la largeur d'une A4, avec la cote tirée du titre. Les cartes d'élèves, par classe.

![Les étiquettes d'exemplaires](assets/bibli/03.png)

![Les cartes d'emprunteurs](assets/bibli/04.png)

## Le moins de données possible

Ce sont des données de mineurs, donc l'application enregistre le prénom, l'initiale du nom et la classe. Rien d'autre : pas de date de naissance, pas d'adresse, pas d'e-mail, pas de photo. « Durant » devient « D. ». Si la base fuite un jour, elle reste à peine identifiante.

L'historique de prêts, lui, en dit long sur un enfant : au-delà d'un délai réglable — trois ans par défaut — les prêts rendus sont réattribués à un emprunteur anonyme. Le lien entre l'enfant et ses lectures disparaît, le livre garde son compteur.

Les parents n'ont pas de compte : un lien secret par élève, distribué à la main, montre ce que l'enfant a en cours. Rien n'est envoyé, aucune adresse n'est stockée.

![Le lien de suivi, sur un téléphone](assets/bibli/05.png)

Et seul un ISBN quitte l'école : les couvertures sont cherchées par le serveur, jamais par le navigateur d'un élève.

## Ce que je n'ai pas fait

Pas de réservations, pas de catalogue public, pas de notifications automatiques aux parents, pas de comptes élèves, pas d'amendes. Moins par principe que par prudence : chaque écran en plus est un écran à expliquer à quelqu'un qui ne l'a pas demandé, et à réparer quand je ne serai plus là.

L'application n'a pas encore vécu. Les vraies questions — quelle durée de prêt, combien de livres à la fois, ce qu'on fait d'un livre perdu — attendent quelques semaines d'usage réel, et se régleront sans doute autrement que ce que j'ai prévu.

C'est du logiciel libre, sous AGPL-3.0 ; le dépôt sera ouvert prochainement.

Si une autre école voulait l'essayer, ou si vous avez une remarque sur la façon dont c'est fait, écrivez-moi. Ça m'intéresse surtout de savoir ce qui manque une fois devant de vrais élèves.
