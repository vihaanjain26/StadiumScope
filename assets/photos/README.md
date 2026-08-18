# Photos

## The home page portrait

The home page hero expects one file here:

```
assets/photos/vihaan-footprint-center.jpg
```

That's the photo outside Footprint Center. Drop it in with exactly that name and
it appears beside the headline on desktop and under it on a phone.

**Until the file exists, nothing breaks.** The `<img>` has an `onerror` handler
that removes the whole figure, so the hero just falls back to the headline alone
rather than showing a broken-image icon.

### How to add it

Easiest route, no terminal needed:

1. Go to the repo on github.com and open the `assets/photos/` folder.
2. **Add file → Upload files**, drag the photo in.
3. Rename it to `vihaan-footprint-center.jpg` before committing.

Or from your own machine:

```bash
cp /path/to/your/photo.jpg assets/photos/vihaan-footprint-center.jpg
git add assets/photos/vihaan-footprint-center.jpg
git commit -m "Add home page photo"
git push
```

### Sizing

The hero crops the image to 3:2 on a phone and 4:5 beside the headline on
desktop, biased toward the top of the frame so a standing subject keeps their
head in shot. Anything from about 1200px wide upward looks sharp. If you want a
different crop, change `object-position` on `.hero-photo img` in `styles.css`.

### Using a different filename

Change the `src` on the `<figure class="hero-photo">` in `index.html`. That's the
only place it's referenced.
