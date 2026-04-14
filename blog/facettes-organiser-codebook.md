---
date: 2026-04-09
title: "Organiser son codebook avec les facettes"
sidebar: auto
author: Martin Erpicum
category: Article
project: corpus
tags:
  - corpus
  - codebook
---

Un codebook qui grandit signale une analyse qui avance. Mais passé une cinquantaine de tags, la liste devient difficile à lire, à expliquer à de nouveaux collaborateurs, et à utiliser efficacement dans les vues d'analyse. Il faut structurer.

Corpus propose deux outils pour cela : la **hiérarchie parent/enfant** et les **facettes**. Les deux se complètent, mais ils répondent à des besoins différents.

---

## La hiérarchie parent/enfant : affiner un thème

La relation parent/enfant permet de spécifier un tag. À partir d'un tag *Émotions*, vous pouvez rattacher *Peur*, *Colère* ou *Soulagement* comme enfants. Cette structure reflète une progression du général au particulier, à l'intérieur d'un même thème.

Elle trouve sa place quand des tags partagent le même référent et que leur distinction tient à un niveau de granularité plus fin.

---

## Les facettes : regrouper par dimension analytique

Les facettes fonctionnent différemment. Elles ne placent pas un tag sous un autre — elles signalent qu'un groupe de tags appartient à la même **dimension de lecture**, indépendamment de leur niveau hiérarchique.

Quelques exemples typiques :

| Facette | Tags inclus |
|---------|-------------|
| **Acteurs** | `juge`, `avocat`, `témoin`, `expert`, `plaignant` |
| **Émotions** | `peur`, `colère`, `soulagement`, `confusion` |
| **Temporalité** | `avant les faits`, `pendant la procédure`, `après le jugement` |
| **Dispositifs** | `législation`, `jurisprudence`, `pratique institutionnelle` |

Ces tags ne relèvent pas d'une hiérarchie commune. Ils partagent une seule chose : la question analytique à laquelle ils répondent — *qui parle ?*, *quelles émotions s'expriment ?*, *à quel moment ?*, *par quels moyens ?*

![Schéma : les facettes regroupent des tags qui répondent à la même question analytique, sans hiérarchie entre eux](https://i.imgur.com/bDVHe6s.png)

---

## Ce que les facettes permettent concrètement

**Dans le codebook**, les facettes structurent l'affichage et facilitent la transmission : un nouveau membre de l'équipe comprend immédiatement les grandes dimensions de l'analyse sans lire chaque tag un par un.

**Dans la matrice de co-occurrence**, vous pouvez filtrer l'affichage sur une seule facette. Restreindre la matrice aux tags de la facette *Acteurs* permet de voir quels acteurs apparaissent ensemble dans les mêmes textes, sans vous noyer dans les autres dimensions.

![Schéma : matrice de co-occurrence filtrée sur une facette](https://i.imgur.com/X8t4bDJ.png)

**Dans la concordance**, les facettes servent de filtre : vous pouvez chercher un terme en limitant les résultats aux segments déjà porteurs d'un tag d'une facette donnée.

**À travers la couleur**, enfin, une facette devient immédiatement reconnaissable : assigner une teinte à la dimension *Acteurs* fait ressortir d'un coup d'œil tous les tags qui en relèvent, dans toutes les vues de la collection.

---

## Quand créer les facettes ?

Pas dès le début. Les facettes prennent sens une fois que vous disposez d'une première vue d'ensemble du codebook — typiquement après une première passe de codage complète.

Quelques questions pour guider la réflexion :

- Certains tags répondent-ils à *qui* (acteurs), d'autres à *comment* (dispositifs), d'autres à *quand* (temporalité) ?
- Identifiez-vous des groupes de tags que vous voudrez filtrer ensemble dans la matrice de co-occurrence ?
- Souhaitez-vous que les exports du codebook restent lisibles pour des personnes extérieures au projet ?

Si oui à l'une de ces questions, les facettes s'imposent comme l'outil adapté.

---

## Ce que les facettes ne font pas

Une facette ne remplace pas la définition des tags. Elle ne résout pas les problèmes d'un codebook incohérent : des tags trop proches, des définitions floues, des chevauchements non assumés. Ces questions relèvent de la révision du codebook lui-même.

Les facettes font une chose précise : rendre visible la logique d'un codebook déjà pensé — et faciliter la navigation dans les analyses une fois cette logique posée.
