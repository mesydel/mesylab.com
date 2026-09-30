---
date: 2026-09-16
title: "Bibli: a small app for a school library"
sidebar: auto
author: Martin Erpicum
category: Article
lang: en
project: bibli
description: "I wrote a small application for the library of the school in Lincé. Here is what it does, and how."
image: assets/bibli/scan-smartphone.jpg
tags:
  - bibli
  - go
  - sqlite
---

**Bibli** is a small application I wrote for the library of the school in Lincé, in French-speaking Belgium. It has about three thousand books, two hundred pupils and a few dozen loans a week. Teachers and volunteers look after it, and there's nobody at the school who does IT.

I made a two-minute video on made-up data. If you'd rather try it yourself, there's a [live demo](https://bibli.tintamarre.be) (the password is `demo`).

[![Bibli — video demonstration](assets/bibli/video.jpg)](https://www.youtube.com/watch?v=Yo_IYGwo8sM)

## Lending and returning

At the desk, you scan the pupil's card, then their books, and confirm. To return a book you just scan it, without needing to know who had it. A USB barcode scanner for about thirty euros is enough, because it pretends to be a keyboard. A tablet camera works too. When a child has forgotten their card, you type their class and the start of their first name.

![The lending screen](assets/bibli/borrow.png)

## Cataloguing

When you scan a book's ISBN, Bibli looks for the record at the [BnF](https://www.bnf.fr), then at [UniCat](https://www.unicat.be) for Belgian editions, and finally at Google Books and Open Library. Most of the time the record comes back complete with a cover, and all that's left is to say how many copies you have.

This is also where I first got things wrong. The barcode on a book is an ISBN-13, but for books from before 2007 the catalogues often only know the old ISBN-10. A school library has plenty of those. So Bibli now tries both. There's still roughly one book in ten that can't be found anywhere, mostly picture books for small children, and those get typed in by hand.

![A book's record after scanning its ISBN](assets/bibli/catalogue.png)

You don't have to stick labels on anything, because you can lend with the ISBN printed on the book. Labels are mainly for books without a barcode and for the ones the library has several copies of. Bibli prints them on sticker sheets with a barcode and the shelf mark, which is the first three letters of the author's name (SAI for Saint-Exupéry). Pupil cards print the same way, one class at a time.

![A sheet of labels](assets/bibli/labels.png)

For the rest of the year, there's an overdue list to print for each class, an inventory, statistics on the books nobody borrows, and a screen that moves everyone up a class in September.

## Children's data

I wanted to keep as little as possible about the pupils. Bibli only knows a first name, a surname initial and a class. After three years, old loans are detached from the child, and only the book keeps its count. If the school wants it, parents can get a link that shows what their child has borrowed, with no account and no email address. When Bibli looks up a record, the only thing it sends is the ISBN.

![The link sent to parents, on a phone](assets/bibli/family.png)

## The technical side

It's a Go binary with a SQLite database and a bit of HTMX. There's no CDN and no outside service, and lending still works when the Internet is down. Backing up means copying a file, and Bibli makes a copy every day. You can install it as an app on the library computer, or as a server if the school wants to use it from several computers or tablets. The interface is in French, Dutch and English.

The code is free software under the AGPL-3.0, and it's on [GitHub](https://github.com/tintamarre/bibli).

The school is only just starting to use it, and I expect to change quite a few things once pupils have actually been through the desk. If you work in a school and this sounds useful, get in touch.
