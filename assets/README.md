# blog-index.json

Zentrale Registry aller Blog-Posts. Nur Posts mit `"visible": true` werden
auf der Startseite und im Archiv angezeigt.

## Aufbau

    {
      "categories": [ … ],
      "posts": [ … ]
    }

### categories

Definiert Filter-Buttons und Farbschema pro Kategorie.

- `id` – technischer Schlüssel (wird in `metaPath` und im Post-JSON als `category` verwendet)
- `label` – Anzeigename im Filter-Button
- `color` – Tailwind-Farb-Alias (siehe `_color`-Feld oben in der Datei).
  Gültig: `cyan`, `emerald`, `purple`, `blue`, `orange`, `red`, `green`,
  `yellow`, `pink`, `teal`, `indigo`, `rose`, `amber`, `sky`, `slate`.

### posts

Liste aller bekannten Posts.

- `id` – eindeutige ID, identisch mit dem Dateinamen des Post-JSON
- `visible` – `true` = anzeigen, `false` = ausblenden (Post bleibt in der Datei)
- `metaPath` – Pfad zur Post-JSON, relativ zum Projekt-Root

## Neuen Post aufnehmen

1. Post-Ordner anlegen (siehe `blog/posts/_template_post/README.md`).
2. Objekt in `posts[]` einfügen:

       {
         "id": "mein-neuer-post",
         "visible": true,
         "metaPath": "blog/posts/java/mein-neuer-post/mein-neuer-post.json"
       }

3. Seite neu laden.

## Post ausblenden, ohne ihn zu löschen

`"visible": false` setzen. Der Post verschwindet aus Startseite und Archiv,
bleibt aber direkt per URL (`blog/template.html?post=<id>`) erreichbar.

## Sortierung

Posts werden nach `updated` (Fallback `date`) absteigend sortiert –
neueste Änderung zuerst. Das Sortierdatum steht in der jeweiligen Post-JSON,
nicht in `blog-index.json`.