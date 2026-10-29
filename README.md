# KELOU ARCHIVE · 可楼

A fan-made, responsive photo archive for Clou (可楼), built with plain HTML, CSS and JavaScript. Designed to publish on GitHub Pages.

## Files

- `index.html` — page content and gallery cards
- `style.css` — visual design and responsive layout
- `script.js` — category filters, search and lightbox controls
- `images/` — local placeholder images; replace these with images you have permission to share

## Publish with GitHub Pages

1. Upload all files and the `images` folder to the root of the `Clou-archive` repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose branch `main` and folder `/(root)`, then click **Save**.
5. Wait a few minutes. The expected URL is `https://fanclouvn.github.io/Clou-archive/`.

All site assets use relative paths such as `./style.css` and `./images/memory-01.svg`, so they work under the `/Clou-archive/` project path.

## Replace the placeholder images

The included SVGs are abstract design placeholders, not real photos of Clou. You can replace them with your own JPG/PNG/WebP files:

1. Copy your photo into `images/`, e.g. `clou-stage-01.jpg`.
2. In `index.html`, find the relevant card and change both the image `src` and `data-image` to `./images/clou-stage-01.jpg`.
3. Change the `alt`, `data-title`, `data-description`, and visible title to match the photo.
4. Commit the changes to GitHub. Pages will update automatically.

Keep filenames simple (letters, numbers and hyphens); match uppercase/lowercase exactly.

## Notes

- This is an independent fan-made website, not an official site.
- The repository and website are public. Do not upload private information.
- Use images you own or have permission to repost, and credit the creator when required.
