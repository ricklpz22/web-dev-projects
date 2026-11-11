RUNETERRA DEX — League of Legends Champion API Website

Files:
- index.html: champion listing, search, class filter, pagination
- view.html: individual champion profile, stats, abilities, lore, and skins

How to run:
1. Extract the ZIP.
2. Open the folder in VS Code.
3. Run index.html with the Live Server extension (recommended).
   You can also open index.html directly in a modern browser.
4. Click any champion card to open its profile.

API:
Riot Games Data Dragon (public static game data):
https://developer.riotgames.com/docs/lol#data-dragon

The website fetches the newest published Data Dragon version from versions.json,
then requests the champion list and individual champion JSON files.
