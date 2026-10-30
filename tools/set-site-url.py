#!/usr/bin/env python3
"""Replace the placeholder site URL everywhere (canonical, Open Graph, sitemap, robots, 404).

Usage (run from the project folder):
    python tools/set-site-url.py https://yourname.github.io/Web_Portfolio
Use your real public address with NO trailing slash. Safe to run again later
(pass the old address as a second argument to change it):
    python tools/set-site-url.py https://new.example.com https://yourname.github.io/Web_Portfolio
"""
import pathlib, sys

PLACEHOLDER = "https://YOUR-USERNAME.github.io/Web_Portfolio"
if len(sys.argv) < 2 or not sys.argv[1].startswith("http"):
    sys.exit(__doc__)
new = sys.argv[1].rstrip("/")
old = (sys.argv[2] if len(sys.argv) > 2 else PLACEHOLDER).rstrip("/")
root = pathlib.Path(__file__).resolve().parent.parent
changed = 0
for f in root.rglob("*"):
    if f.suffix in {".html", ".xml", ".txt", ".js", ".md"} and "tools" not in f.parts:
        text = f.read_text(encoding="utf-8")
        if old in text:
            f.write_text(text.replace(old, new), encoding="utf-8")
            changed += 1
print(f"Updated {changed} files: {old} -> {new}")
