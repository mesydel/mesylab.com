---
date: 2026-04-11
title: "Analyser l'évolution d'un corpus dans le temps avec les labels de date"
sidebar: auto
author: Martin Erpicum
category: Article
project: corpus
tags:
  - corpus
  - labels
---

Un corpus ne se réduit pas à un ensemble de textes : il rassemble souvent des documents répartis dans le temps. Articles de presse publiés sur dix ans, entretiens menés avant et après une réforme, jugements rendus sur plusieurs décennies — dans chacun de ces cas, la date relève de l'analyse, non de l'administration. Elle fonctionne comme une véritable variable analytique.

Corpus permet d'exploiter cette dimension temporelle grâce aux **labels de type date**.

![Schéma : un label de date ancre chaque texte sur un axe temporel, accessible dans toutes les vues d'analyse*](https://i.imgur.com/mrGFdGb.png)

---

## Comment fonctionne un label de date

Les labels servent de champs de métadonnées attachés à chaque texte d'une collection. Corpus en propose trois types : texte libre, nombre entier, et **date et heure**. Ce dernier stocke une date précise — de publication, d'entretien, de jugement — rattachée à un document.

![](https://i.imgur.com/4pB3NhQ.png)
![](https://i.imgur.com/ccLRwQi.png)


Contrairement aux tags, qui codent des passages à l'intérieur du texte, un label décrit le texte dans son ensemble. Un label de date ancre donc le document sur un axe temporel.

---

## Créer et renseigner un label de date

1. Ouvrez un texte de votre collection
2. Accédez à la section **Labels**
3. Créez un nouveau label en choisissant le type *datetime*
4. Saisissez la valeur et enregistrez

![Schéma : un label de date ancre chaque texte sur un axe temporel, accessible dans toutes les vues d'analyse*](https://i.imgur.com/mrGFdGb.png)


Répétez l'opération pour tous les textes. Une fois chaque document daté, vous disposez d'un axe temporel utilisable dans toutes les vues d'analyse.

![](https://i.imgur.com/lHxP0qA.png)

> **Conseil pratique** : renseignez les labels avant de commencer le codage. Dès qu'un filtre temporel s'active, les textes sans date disparaissent silencieusement des résultats.

---

## Filtrer les analyses par période

Le vrai intérêt des labels de date apparaît quand vous les croisez avec les outils d'analyse.

Dans la **concordance**, vous pouvez restreindre la recherche aux textes publiés après une certaine date — ou comparer les occurrences d'un terme entre deux périodes distinctes. La **fréquence lexicale** et le **TF-IDF** acceptent le même filtre : vous comparez ainsi le vocabulaire dominant de votre corpus sur différentes tranches de temps, sans dupliquer votre collection.


![](https://i.imgur.com/tDgKjpk.png)

---

## Croiser labels de date et tags : suivre l'évolution des thèmes

La combinaison la plus puissante associe les labels de date aux tags. Prenez un corpus d'entretiens menés avant et après une réforme. En filtrant les analyses par période, vous pouvez :

- Repérer les thèmes qui n'émergent qu'après la réforme — ou ceux qui s'effacent
- Comparer la fréquence d'un même tag d'une période à l'autre pour mesurer un déplacement d'accent
- Observer si les termes qui accompagnent un acteur changent selon le contexte institutionnel

![](https://i.imgur.com/28eeERn.png)


Cette lecture diachronique ne réclame pas de créer deux collections séparées. Une seule collection bien labellisée suffit, et vous naviguez entre les périodes grâce aux filtres.

---

## Choisir le bon type de label

| Situation | Type de label recommandé |
|-----------|--------------------------|
| Date précise (jour/mois/année) | Date et heure |
| Année seulement | Nombre entier |
| Période nommée (« avant réforme », « phase 2 ») | Texte libre |

Le label entier convient souvent mieux aux granularités grossières (l'année de publication). Le label texte permet des catégories nommées qui s'affichent lisiblement dans les filtres et les graphiques.

---

L'analyse temporelle ne s'automatise pas — le chercheur reste toujours seul juge du sens d'une évolution. Mais les labels de date éliminent le tri manuel et rendent cette lecture accessible directement depuis les vues d'analyse de Corpus.






