zedextension

Readme to be completed

Building, if I want to minify the contents
https://javascript-minifier.com/


1. Open Chrome
2. Open URL chrome://extensions/
3. Ensure Developer Mode is enabled (top right)
4. Select Load unpacked and choose this directory
5. Open zedrun and make sure your logged in
6. Open events page and horses should load (may need to reload page)

Any changes to content.js will not be hotloaded
Refresh the extension chrome://extensions/
Relaod the zed.run page

# Deployment
1. Move contents.js to build folder
2. Open manifest,json and increment version number
3. Zip all build files
4. Open dev console for google and open packages directory
5. Upload zip and deploy (can take 0-3 days)