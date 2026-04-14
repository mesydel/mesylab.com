---
date: 2026-04-10
title: "Concordance, matrice et TF-IDF : aller au-delà du comptage"
sidebar: auto
author: Martin Erpicum
category: Article
project: corpus
tags:
  - corpus
  - tfidf
---

Une fois un corpus codé, la tentation guette : s'arrêter là, compter les tags, noter les plus fréquents, en tirer des conclusions. Mais cette lecture reste en surface. Trois outils d'analyse de Corpus permettent de poser des questions plus précises — et souvent plus intéressantes.

---

## La concordance : lire les mots en contexte

La concordance (ou KWIC, *keyword in context*) cherche un mot ou une expression dans l'ensemble de la collection et affiche chaque occurrence avec son contexte immédiat.

Ce qui rend cet outil précieux tient à un détail : il ne compte pas, il **montre**. Cinquante occurrences du mot *risque* alignées dans un tableau révèlent immédiatement si le terme circule sur un registre technique, émotionnel ou rhétorique — ou sur plusieurs à la fois. Une information que le comptage seul ne livrera jamais.

![Schéma : la matrice de co-occurrence révèle les associations entre tags, au-delà de leur simple fréquence*](https://i.imgur.com/wytkYRS.png)

La concordance se révèle particulièrement utile pour :

- **Vérifier la cohérence du codage** : les segments portant un tag donné utilisent-ils vraiment le terme de la même manière ?
- **Explorer avant de coder** : repérer comment un terme circule dans le corpus avant de décider s'il mérite un tag propre
- **Comparer des sous-corpus** : filtrer par label (par exemple par période ou par profil d'interviewé) pour voir si l'usage d'un terme varie selon les groupes

---

## La matrice de co-occurrence : découvrir les associations entre tags

La matrice montre combien de textes partagent deux tags à la fois. Plus la cellule fonce, plus les deux tags apparaissent ensemble dans les mêmes textes.

La matrice révèle la **structure des associations dans le corpus** : quels thèmes se lient intimement, quels acteurs apparaissent systématiquement dans les mêmes contextes, quelles dimensions de l'analyse se chevauchent dans les textes réels.

![Schéma : matrice de co-occurrence filtrée sur une facette](https://i.imgur.com/X8t4bDJ.png)


Cliquer sur une cellule ouvre directement la liste des textes concernés et les passages codés correspondants. Ce raccourci mène du motif statistique vers la matière première du corpus — et pose un garde-fou utile : une co-occurrence marque un point de départ, jamais une conclusion.

Le filtre par **facette** gagne ici toute son efficacité. Restreindre la matrice à une seule dimension analytique — les acteurs, les dispositifs, les émotions — permet de lire les associations sans se laisser distraire par les autres familles de tags.

---

## Le TF-IDF : identifier ce qui rend chaque texte singulier

Les fréquences lexicales disent ce qui revient partout dans un corpus. Le TF-IDF dit ce qui caractérise chaque texte.

Le principe tient en une ligne : un terme très fréquent dans un seul texte mais rare ailleurs obtient un score élevé. Un terme qui revient partout obtient un score faible, même quand il abonde. Ce calcul met en évidence ce qui distingue un document des autres.

![Schéma : le TF-IDF identifie les termes qui caractérisent chaque texte, au-delà de leur simple fréquence*](https://i.imgur.com/DcWqVXi.png)

En pratique, le TF-IDF permet de répondre à des questions comme :

- *En quoi ce jugement se distingue-t-il des autres affaires du corpus ?*
- *Quel vocabulaire appartient en propre à cet interviewé et ne se retrouve pas ailleurs ?*
- *Quels textes se démarquent fortement du reste de la collection ?*

Chaque terme identifié s'ouvre directement dans la concordance pour en inspecter le contexte et décider s'il mérite un tag.

---

## Utiliser les trois outils ensemble

Ces vues ne restent pas cloisonnées : elles s'alimentent mutuellement.

**Deux enchaînements typiques :**

*De la lexicologie au codage :*
le TF-IDF signale un terme saillant dans un texte → la concordance montre comment ce terme circule dans l'ensemble du corpus → vous décidez si ce terme justifie un nouveau tag ou s'il vient enrichir un tag existant.

*De la statistique à la lecture :*
la matrice révèle une co-occurrence forte entre deux tags → vous cliquez sur la cellule pour ouvrir les textes concernés → vous lisez les passages pour voir si cette association porte un sens analytique ou ne traduit qu'un effet du codage.

Ces allers-retours entre vues quantitatives et lecture des textes nourrissent toute analyse qualitative rigoureuse. Concordance, matrice et TF-IDF accélèrent la navigation dans un grand corpus, mais ils ne remplacent ni la lecture ni l'interprétation : ils guident le regard vers les endroits qui méritent qu'on s'y arrête.
