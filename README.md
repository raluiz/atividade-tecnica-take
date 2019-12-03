# API to extract data from a GitHub user's repositories

This [API](https://api-github-repo-data-extractor.herokuapp.com) was developed using Heroku's hosting, but can also be used with localhost - beign necessary to install all dependencies presented in package-lock.json.
The service will run in port chosen by the server or 3000 by default, but it's possible to change it by modifying the varible PORT's value (line 4) in index.js file.

---

## Executing in a localhost
  * Use the command `npc ci` in the folder with this API's files.
  * Then use `npm start` or `node index.js` to start runnig the server.
  * Now it's possible to extract all data needed see [using the API](#using) to understand how it works.
  
## Using
  * **Important:** if the desired language is C#, it's necessary to use C_ in the URL.
  * Tha API will return _null_ if a user:
    - doesn't exist,
    - doesn't have a repository with the specified language,
    - doens't have i repositories with the specified language,
    - or j is grater than i;
  
  | URL | Returned data |
  | --- | ------------- |
  | https://api-github-repo-data-extractor.herokuapp.com/repositories/[github_username] | JSON with all user's repositories data |
  | https://api-github-repo-data-extractor.herokuapp.com/repositories/[github_username]/owner | JSON with user's data |
  | https://api-github-repo-data-extractor.herokuapp.com/repositories/[github_username]/[language] | JSON with data about user's repos with the specified language |
  | https://api-github-repo-data-extractor.herokuapp.com/repositories/[github_username]/[language]/[i] | JSON with data about ith oldest user's repos with the specified language |
  | https://api-github-repo-data-extractor.herokuapp.com/repositories/[github_username]/[language]/[i]/[j] | JSON with data about jth repo in ith oldest user's repos with the specified language |

## Example
  It's possible to use the bot17.json file in [BLiP](https://portal.blip.ai/) to see a usage example.
