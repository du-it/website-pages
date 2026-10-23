# Post-Template

Dieser Ordner dient als Vorlage für neue Blog-Posts. **Nicht bearbeiten** – kopieren Sie ihn stattdessen.

## Neuen Post anlegen

1. Kopieren Sie diesen Ordner nach `posts/<kategorie>/<post-id>/`.
2. Benennen Sie die Dateien um:
    - `template.html` → `<post-id>.html`
    - `template.json` → `<post-id>.json`
    - `template.css` → `<post-id>.css` (optional, nur wenn eigene Styles nötig)
3. Passen Sie `<post-id>.json` an (Titel, Kategorie, Datum, etc.).
4. Schreiben Sie den Artikel in `<post-id>.html`.
5. Fügen Sie den Post in `assets/blog-index.json` hinzu und setzen Sie dort `"visible": true`. Ohne diesen Eintrag erscheint der Post nicht auf der Seite. Details: `assets/README.md`.

## Theme-aware Klassen

Der Artikel wird in beiden Modi (Light/Dark) angezeigt. Verwenden Sie diese Klassen, damit der Text lesbar bleibt:

- **Fließtext:** `card-surface-muted`
- **Überschriften:** `text-slate-900 dark:text-white`
- **Code-Blöcke:** `code-block` (siehe `css/components.css` oder eigene Definition)
- **Links:** `text-brand-600 dark:text-brand-400 underline`
- **Hervorhebungen:** `text-brand-600 dark:text-brand-400 font-semibold`

## Eigene Styles

Wenn der Artikel spezifische Styles braucht (z.B. ein besonderes Layout), legen Sie eine `<post-id>.css` an. Diese wird **nur** für diesen Artikel geladen. Sie können darin globale CSS-Variablen (z.B. `var(--text-primary)`) und Klassen (z.B. `.card-surface-muted`) nutzen.

**Wichtig:** Die Post-CSS wird in den Layer `post` geladen (siehe `main.css`). Dadurch kann sie globale Styles überschreiben, ohne sie zu zerstören.