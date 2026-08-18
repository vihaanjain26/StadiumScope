# Team logos

By default the site draws each team's mark itself: a rounded square in the team's
primary colour with its abbreviation on it, using the `brand` field in
`data/stadiums.js`. Nothing to download, nothing to break.

If you'd rather use a real logo image, drop the file in this folder and point the
stadium at it:

```js
{
  id: "lambeau-field",
  // ...
  logo: "assets/logos/packers.svg",   // add this line
}
```

Square-ish SVG or PNG files work best. Only use logos you have the right to use —
team marks are trademarks.
