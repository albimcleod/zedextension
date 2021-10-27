console.log('StackedNaks loaded');

let cache = [];
let active_racename = '';
let race_stats = {};
let distance_stats = {};
let range_stats = {};
let api_key = '';
let my_horses = [];
let my_fatigue = [];
let selected_distance = 'all';
let global_class = 'all';
let extension_mode = 'race';
let stable = {};

let opponent_list = [];

let race_summary = {};

let free_races = [];

let trophy_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy" viewBox="0 0 16 16"><path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/></svg>';

let fire_icon = '<img class="hot-horse hot-horse-portrait" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOS45NTQ5NSA2LjgzMzUzQzkuNzc0MjcgNi41ODM1MiA5LjU1NDMxIDYuMzY2ODUgOS4zNTAwNiA2LjE1MDE4QzguODIzNzMgNS42NTAxNiA4LjIyNjcgNS4yOTE4MiA3LjcyMzkzIDQuNzY2OEM2LjU1MzQzIDMuNTUwMSA2LjI5NDE5IDEuNTQxNzEgNy4wNDA0OCAwQzYuMjk0MTkgMC4xOTE2NzIgNS42NDIxNyAwLjYyNTAxOCA1LjA4NDQxIDEuMTAwMDNDMy4wNDk3OSAyLjgzMzQxIDIuMjQ4NSA1Ljg5MTgzIDMuMjA2OSA4LjUxNjkxQzMuMjM4MzIgOC42MDAyNSAzLjI2OTc1IDguNjgzNTggMy4yNjk3NSA4Ljc5MTkyQzMuMjY5NzUgOC45NzUyNiAzLjE1MTkxIDkuMTQxOTMgMi45OTQ4IDkuMjA4NkMyLjgxNDEyIDkuMjkxOTMgMi42MjU1OCA5LjI0MTkzIDIuNDc2MzIgOS4xMDg1OUMyLjQyOTE5IDkuMDY2OTMgMi4zOTc3NiA5LjAyNTI2IDIuMzY2MzQgOC45NjY5MkMxLjQ3ODY1IDcuNzc1MjIgMS4zMzcyNCA2LjA2Njg0IDEuOTM0MjggNC43MDAxM0MwLjYyMjM3MyA1LjgzMzUgLTAuMDkyNDk1NiA3Ljc1MDIyIDAuMDA5NjI4NTMgOS41NTg2MUMwLjA1Njc2MjggOS45NzUyOCAwLjEwMzg5NyAxMC4zOTIgMC4yMzc0NDQgMTAuODA4NkMwLjM0NzQyNCAxMS4zMDg3IDAuNTU5NTI4IDExLjgwODcgMC43OTUxOTkgMTIuMjUwM0MxLjY0MzYyIDEzLjY5MjEgMy4xMTI2MyAxNC43MjU0IDQuNjkxNjMgMTQuOTMzOEM2LjM3Mjc1IDE1LjE1ODggOC4xNzE3MSAxNC44MzM4IDkuNDYwMDQgMTMuNjAwNEMxMC44OTc2IDEyLjIxNyAxMS40MDA0IDEwLjAwMDMgMTAuNjYyIDguMTAwMjNMMTAuNTU5OCA3Ljg4MzU2QzEwLjM5NDkgNy41MDAyMSA5Ljk1NDk1IDYuODMzNTMgOS45NTQ5NSA2LjgzMzUzWk03LjQ3MjU1IDEyLjA4MzdDNy4yNTI1OSAxMi4yODM3IDYuODkxMjMgMTIuNTAwNCA2LjYwODQyIDEyLjU4MzdDNS43Mjg1OCAxMi45MTcgNC44NDg3NCAxMi40NTA0IDQuMzMwMjcgMTEuOTAwM0M1LjI2NTA5IDExLjY2NyA1LjgyMjg1IDEwLjkzMzYgNS45ODc4MiAxMC4xOTJDNi4xMjEzNyA5LjUyNTI3IDUuODY5OTggOC45NzUyNiA1Ljc2Nzg2IDguMzMzNTdDNS42NzM1OSA3LjcxNjg5IDUuNjg5MyA3LjE5MTg3IDUuOTAxNDEgNi42MTY4NkM2LjA1MDY2IDYuOTMzNTMgNi4yMDc3OCA3LjI1MDIxIDYuMzk2MzIgNy41MDAyMUM3LjAwMTIxIDguMzMzNTcgNy45NTE3NSA4LjcwMDI1IDguMTU1OTkgOS44MzM2MUM4LjE4NzQyIDkuOTUwMjggOC4yMDMxMyAxMC4wNjcgOC4yMDMxMyAxMC4xOTJDOC4yMjY3IDEwLjg3NTMgNy45NDM4OSAxMS42MjUzIDcuNDcyNTUgMTIuMDgzN1oiIGZpbGw9InVybCgjcGFpbnQwX3JhZGlhbCkiLz48cGF0aCBkPSJNOS45NTQ5NSA2LjgzMzUzQzkuNzc0MjcgNi41ODM1MiA5LjU1NDMxIDYuMzY2ODUgOS4zNTAwNiA2LjE1MDE4QzguODIzNzMgNS42NTAxNiA4LjIyNjcgNS4yOTE4MiA3LjcyMzkzIDQuNzY2OEM2LjU1MzQzIDMuNTUwMSA2LjI5NDE5IDEuNTQxNzEgNy4wNDA0OCAwQzYuMjk0MTkgMC4xOTE2NzIgNS42NDIxNyAwLjYyNTAxOCA1LjA4NDQxIDEuMTAwMDNDMy4wNDk3OSAyLjgzMzQxIDIuMjQ4NSA1Ljg5MTgzIDMuMjA2OSA4LjUxNjkxQzMuMjM4MzIgOC42MDAyNSAzLjI2OTc1IDguNjgzNTggMy4yNjk3NSA4Ljc5MTkyQzMuMjY5NzUgOC45NzUyNiAzLjE1MTkxIDkuMTQxOTMgMi45OTQ4IDkuMjA4NkMyLjgxNDEyIDkuMjkxOTMgMi42MjU1OCA5LjI0MTkzIDIuNDc2MzIgOS4xMDg1OUMyLjQyOTE5IDkuMDY2OTMgMi4zOTc3NiA5LjAyNTI2IDIuMzY2MzQgOC45NjY5MkMxLjQ3ODY1IDcuNzc1MjIgMS4zMzcyNCA2LjA2Njg0IDEuOTM0MjggNC43MDAxM0MwLjYyMjM3MyA1LjgzMzUgLTAuMDkyNDk1NiA3Ljc1MDIyIDAuMDA5NjI4NTMgOS41NTg2MUMwLjA1Njc2MjggOS45NzUyOCAwLjEwMzg5NyAxMC4zOTIgMC4yMzc0NDQgMTAuODA4NkMwLjM0NzQyNCAxMS4zMDg3IDAuNTU5NTI4IDExLjgwODcgMC43OTUxOTkgMTIuMjUwM0MxLjY0MzYyIDEzLjY5MjEgMy4xMTI2MyAxNC43MjU0IDQuNjkxNjMgMTQuOTMzOEM2LjM3Mjc1IDE1LjE1ODggOC4xNzE3MSAxNC44MzM4IDkuNDYwMDQgMTMuNjAwNEMxMC44OTc2IDEyLjIxNyAxMS40MDA0IDEwLjAwMDMgMTAuNjYyIDguMTAwMjNMMTAuNTU5OCA3Ljg4MzU2QzEwLjM5NDkgNy41MDAyMSA5Ljk1NDk1IDYuODMzNTMgOS45NTQ5NSA2LjgzMzUzWk03LjQ3MjU1IDEyLjA4MzdDNy4yNTI1OSAxMi4yODM3IDYuODkxMjMgMTIuNTAwNCA2LjYwODQyIDEyLjU4MzdDNS43Mjg1OCAxMi45MTcgNC44NDg3NCAxMi40NTA0IDQuMzMwMjcgMTEuOTAwM0M1LjI2NTA5IDExLjY2NyA1LjgyMjg1IDEwLjkzMzYgNS45ODc4MiAxMC4xOTJDNi4xMjEzNyA5LjUyNTI3IDUuODY5OTggOC45NzUyNiA1Ljc2Nzg2IDguMzMzNTdDNS42NzM1OSA3LjcxNjg5IDUuNjg5MyA3LjE5MTg3IDUuOTAxNDEgNi42MTY4NkM2LjA1MDY2IDYuOTMzNTMgNi4yMDc3OCA3LjI1MDIxIDYuMzk2MzIgNy41MDAyMUM3LjAwMTIxIDguMzMzNTcgNy45NTE3NSA4LjcwMDI1IDguMTU1OTkgOS44MzM2MUM4LjE4NzQyIDkuOTUwMjggOC4yMDMxMyAxMC4wNjcgOC4yMDMxMyAxMC4xOTJDOC4yMjY3IDEwLjg3NTMgNy45NDM4OSAxMS42MjUzIDcuNDcyNTUgMTIuMDgzN1oiIGZpbGw9InVybCgjcGFpbnQxX3JhZGlhbCkiLz48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9yYWRpYWwiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEgMTUpIHJvdGF0ZSgtMTI2LjI1NCkgc2NhbGUoMTguNjAxMSAxNy43NDA5KSI+PHN0b3Agc3RvcC1jb2xvcj0iI0Q1OEE0NyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0JCN0IwMCIvPjwvcmFkaWFsR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDFfcmFkaWFsIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMzUxNTYgMi4yMjY1Nikgcm90YXRlKDYwLjkxMTkpIHNjYWxlKDcuNzc3ODggNi45MDA5KSI+PHN0b3Agc3RvcC1jb2xvcj0iI0UyRTYxRCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0id2hpdGUiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPgo=" alt="">';

let flag_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16"><path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"/></svg>';

let speed_max_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-speedometer" viewBox="0 0 16 16"><path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z"/><path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"/></svg>';

let speed_med_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-speedometer2" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/><path fill-rule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"/></svg>';

let stddev_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-center" viewBox="0 0 16 16"><path d="M8 1a.5.5 0 0 1 .5.5V6h-1V1.5A.5.5 0 0 1 8 1zm0 14a.5.5 0 0 1-.5-.5V10h1v4.5a.5.5 0 0 1-.5.5zM2 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7z"/></svg>';

let warning_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16"><path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/><path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/></svg>';

let hash_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hash" viewBox="0 0 16 16"><path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z"/></svg>';

let open_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>`;

let down_icons = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/></svg>`

const host_url = 'https://api.stackednaks.com';
//const host_url = 'http://localhost:3001'

const distances = [
	{ id: 'all', text: 'All' },
	{ id: '1000', text: '1000' },
	{ id: '1200', text: '1200' },
	{ id: '1400', text: '1400' },
	{ id: '1600', text: '1600' },
	{ id: '1800', text: '1800' },
	{ id: '2000', text: '2000' },
	{ id: '2200', text: '2200' },
	{ id: '2400', text: '2400' }
];

(function () {
	/**
	 * Decimal adjustment of a number.
	 *
	 * @param {String}  type  The type of adjustment.
	 * @param {Number}  value The number.
	 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
	 * @returns {Number} The adjusted value.
	 */
	function decimalAdjust(type, value, exp) {
		// If the exp is undefined or zero...
		if (typeof exp === 'undefined' || +exp === 0) {
			return Math[type](value);
		}
		value = +value;
		exp = +exp;
		// If the value is not a number or the exp is not an integer...
		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
			return NaN;
		}
		// Shift
		value = value.toString().split('e');
		value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		// Shift back
		value = value.toString().split('e');
		return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	}

	// Decimal round
	if (!Math.round10) {
		Math.round10 = function (value, exp) {
			return decimalAdjust('round', value, exp);
		};
	}
	// Decimal floor
	if (!Math.floor10) {
		Math.floor10 = function (value, exp) {
			return decimalAdjust('floor', value, exp);
		};
	}
	// Decimal ceil
	if (!Math.ceil10) {
		Math.ceil10 = function (value, exp) {
			return decimalAdjust('ceil', value, exp);
		};
	}
})();


const clickMode = () => {
	extension_mode = extension_mode == 'race' ? 'tournament' : 'race';
	console.log('clickMode', extension_mode)
}


document.addEventListener('DOMContentLoaded', function () {
	console.log('DOMContentLoaded');
	document.getElementById("extension-mode").addEventListener("click", clickMode);
});

const updateHorse = (data, nodes, distance) => {

	cache.push(data);

	if (nodes[1].childNodes[2].className != '') {


		let e = opponent_list.find(d => d.id == data.id);
		if (!e) opponent_list.push(data);

		nodes[1].childNodes[2].className = '';

		let stats = data.stats;
		if (!stats) return;

		let class_stats = false;

		if (global_class && global_class != 'all' && data.classes) {
			stats = data.classes[global_class];

			let total = stats[distance].firsts + stats[distance].seconds + stats[distance].thirds + stats[distance].fourths + stats[distance].other;
			if (total < 9) {
				stats = data.stats;
			} else {
				class_stats = true;
			}
		}

		let count_races = document.createElement("span");
		count_races.className = 'racing-tag naks_stats';

		if (data.races_results.length >= 5) {
			count_races.className += ' naks_warn_color';
		} else if (data.races_results.length >= 10) {
			count_races.className += ' naks_success_color';
		}

		count_races.innerHTML += hash_icon + '<span class="naks_mr_2">' + (data.races_results.length) + ' 12hrs</span>';
		nodes[1].childNodes[2].appendChild(count_races);

		let fire_rate = stats['all'] && stats['all'].fires ? (stats['all'].fires / (stats['all'].firsts + stats['all'].seconds + stats['all'].thirds + stats['all'].fourths + stats['all'].other) * 100) : 0;
		let win_rate = stats['all'] && stats['all'].firsts ? (stats['all'].firsts / (stats['all'].firsts + stats['all'].seconds + stats['all'].thirds + stats['all'].fourths + stats['all'].other) * 100) : 0;
		let place_rate = stats['all'] ? ((stats['all'].firsts + stats['all'].seconds + stats['all'].thirds) / (stats['all'].firsts + stats['all'].seconds + stats['all'].thirds + stats['all'].fourths + stats['all'].other) * 100) : 0;

		let all_record = document.createElement("span");
		all_record.className = 'racing-tag naks_stats';

		all_record.innerHTML += '<span class="naks_mr_2">' + trophy_icon + (win_rate).toFixed(0) + '%</span>';

		all_record.innerHTML += ('<span class="naks_mr_2">' + flag_icon + (stats['all'].firsts + stats['all'].seconds + stats['all'].thirds + stats['all'].fourths + stats['all'].other) + '</span>');

		all_record.innerHTML += ('<span>' + fire_icon + fire_rate.toFixed(0) + '%' + '</span>');

		let mh = my_horses.find(d => d.id == data.id);

		let all_total = (stats['all'].firsts + stats['all'].seconds + stats['all'].thirds + stats['all'].fourths + stats['all'].other);

		if ((win_rate > 15 || fire_rate > 60) && all_total > 9) {
			all_record.className += ' naks_alert_color';
			if (!mh) race_stats.reds++;
		} else if ((win_rate >= 10 || fire_rate > 60)) {
			all_record.className += ' naks_warn_color';
			if (!mh) race_stats.yellows++;
		}


		nodes[1].childNodes[2].appendChild(all_record);

		let dis_record = document.createElement("span");
		dis_record.className = 'racing-tag naks_stats';

		fire_rate = stats[distance].fires ? (stats[distance].fires / (stats[distance].firsts + stats[distance].seconds + stats[distance].thirds + stats[distance].fourths + stats[distance].other) * 100) : 0;
		win_rate = stats[distance].firsts ? (stats[distance].firsts / (stats[distance].firsts + stats[distance].seconds + stats[distance].thirds + stats[distance].fourths + stats[distance].other) * 100) : 0;
		place_rate = ((stats[distance].firsts + stats[distance].seconds + stats[distance].thirds) / (stats[distance].firsts + stats[distance].seconds + stats[distance].thirds + stats[distance].fourths + stats[distance].other) * 100);

		dis_record.innerHTML += '<span class="naks_mr_2">' + trophy_icon + (win_rate).toFixed(0) + '%</span>';

		dis_record.innerHTML += ('<span class="naks_mr_2">' + flag_icon + (stats[distance].firsts + stats[distance].seconds + stats[distance].thirds + stats[distance].fourths + stats[distance].other) + '</span>');

		dis_record.innerHTML += ('<span class="naks_mr_2">' + fire_icon + fire_rate.toFixed(0) + '%' + '</span>');

		if (data.stats[distance].max_speed) {
			dis_record.innerHTML += ('<span>' + speed_max_icon + data.stats[distance].max_speed.toFixed(0) + '</span>');
		}

		let color = '';

		let distance_total = (stats[distance].firsts + stats[distance].seconds + stats[distance].thirds + stats[distance].fourths + stats[distance].other);

		if ((win_rate >= 15 || fire_rate > 60) && distance_total > 9) {
			dis_record.className += ' naks_alert_color';
			color = 'naks_alert_color';
			if (!mh) distance_stats.reds++;
		} else if ((win_rate >= 10 || fire_rate > 60)) {
			dis_record.className += ' naks_warn_color';
			color = 'naks_warn_color';
			if (!mh) distance_stats.yellows++;
		}
		if (!mh) race_stats.total++;
		if (!mh) distance_stats.total++;

		if (place_rate > 50) {
			if (!mh) distance_stats.placers++;
		}

		nodes[1].childNodes[2].appendChild(dis_record);

		if (!mh) {
			let ranges = [1000, 1200, 1400];
			if (distance == '1600' || distance == '1800' || distance == '2000') {
				ranges = [1600, 1800, 2000];
			} else if (distance == '2200' || distance == '2400' || distance == '2600') {
				ranges = [2200, 2400, 2600];
			}

			let firsts = 0;
			let seconds = 0;
			let thirds = 0;
			let fourths = 0;
			let other = 0;
			let fires = 0;
			ranges.forEach(r => {
				firsts += stats[r].firsts;
				seconds += stats[r].seconds;
				thirds += stats[r].thirds;
				fourths += stats[r].fourths;
				other += stats[r].other;
				fires += stats[r].fires;
			});

			fire_rate = fires ? (fires / (firsts + seconds + thirds + fourths + other) * 100) : 0;
			win_rate = firsts ? (firsts / (firsts + seconds + thirds + fourths + other) * 100) : 0;
			place_rate = ((firsts + seconds + thirds) / (firsts + seconds + thirds + fourths + other) * 100);

			if ((win_rate >= 15 || fire_rate > 60) && distance_total > 9) {
				if (!mh) range_stats.reds++;
			} else if ((win_rate >= 10 || fire_rate > 60)) {
				if (!mh) range_stats.yellows++;
			}
			if (!mh) range_stats.total++;

			if (place_rate > 50) {
				if (!mh) range_stats.placers++;
			}
		}


		let nine_twelve = 0;
		let history_total = 0;
		(data.stats[distance].positions || [])
			.forEach((a) => {
				if (a.position >= 9) nine_twelve += a.count;
				history_total += a.count;
			});

		if (history_total > 0 && nine_twelve > 0 && nine_twelve / history_total > .50 && history_total > 8) {
			let down_classer = document.createElement("span");
			down_classer.className = 'racing-tag naks_stats naks_bg_success';

			let down_rate = (nine_twelve / history_total * 100).toFixed(0);

			down_classer.innerHTML += down_icons + '<span class="naks_mr_2"> ' + down_rate + '%</span>';
			nodes[1].childNodes[2].appendChild(down_classer);

			if (!mh) distance_stats.downers++;
		}

	}
}

const run = () => {

	selected_distance = 'all';

	var race_name = document.getElementsByClassName("race-description");

	if (race_name.length == 0) {
		active_racename = '';
		race_stats = {
			reds: 0,
			yellows: 0,
			total: 0,
		};

		distance_stats = {
			reds: 0,
			yellows: 0,
			downers: 0,
			placers: 0,
			total: 0,
		};

		range_stats = {
			reds: 0,
			yellows: 0,
			downers: 0,
			placers: 0,
			total: 0,
		};

		opponent_list = [];

	} else if (race_name[0].innerHTML != active_racename) {
		active_racename = race_name[0].innerHTML;
		race_stats = {
			reds: 0,
			yellows: 0,
			total: 0,
		};

		distance_stats = {
			reds: 0,
			yellows: 0,
			total: 0,
			downers: 0,
			placers: 0,
		};

		range_stats = {
			reds: 0,
			yellows: 0,
			downers: 0,
			placers: 0,
			total: 0,
		};

		opponent_list = [];
	}

	var race_detail = document.getElementsByClassName("race-detail");


	if (race_detail && race_detail.length > 0) {
		selected_distance = race_detail[1].childNodes[0].childNodes[1].innerText.replace('m', '');
	}


	var horsesList = document.getElementsByClassName("race-horse-list");

	if (horsesList && horsesList.length > 0) {

		for (var i = 0; i < horsesList[0].childNodes.length; i++) {

			if (horsesList[0].childNodes[i].className == 'list-content') {
				let horse_rows = horsesList[0].childNodes[i].childNodes;

				for (var h = 0; h < horse_rows.length; h++) {
					let horse_data = horse_rows[h].childNodes;

					let horse_name = horse_data[1].childNodes[1].innerText;

					if (!horse_name) continue;

					if (window.location.href.indexOf('https://zed.run/racing/events') > -1) {
						if (horse_data[1].childNodes[0].className.indexOf('d-none') == -1) {
							horse_data[1].childNodes[0].className += ' d-none';
						}
					}

					if (horse_data[1].childNodes.length > 2 && horse_data[1].childNodes[2].className.length > 0) {

						let name = encodeURIComponent(horse_name.trim());

						let existing = cache.find(h => h.name == name);
						if (existing) {
							updateHorse(existing, horse_data, selected_distance)
							break;
						}

						const options = {
							headers: new Headers({ 'x-api-key': api_key }),
						};

						fetch(host_url + '/horses/' + name, options)
							.then(response => response.json())
							.then(data => updateHorse(data, horse_data, selected_distance))
							.catch(data => console.log(data));
					}

				}
			}
		}
	}

}

const addHorseList = (data, list) => {

	let horse_div = document.createElement("div");
	horse_div.className = 'nak_list_item ';

	let tags = ((data.options || {}).tags || []);

	let hide = tags.find(t => t.text == 'HIDE');
	if (hide) return;


	horse_div.innerHTML = data.name + ' (' + data.details.rating + ')';

	if (data.fatigue > 0) {
		horse_div.innerHTML += (' (' + Number(data.fatigue) + ') ');
	}

	if (!data.is_racing) {
		tags.forEach(element => {
			if (element) {
				horse_div.innerHTML += ("<span class='naks_badge naks_bg_info naks_mr_2'>" + element.text + "</span>")
			}
		});
	} else {
		horse_div.innerHTML += ("<span class='naks_badge naks_bg_success naks_mr_2'>IN RACE</span>")
	}


	horse_div.innerHTML += '<br/>'

	let distance = selected_distance ? selected_distance : 'all';

	if (data.stats) {


		let stats = data.stats;

		let total = stats[distance].firsts + stats[distance].seconds + stats[distance].thirds + stats[distance].fourths + stats[distance].other;

		if (global_class && global_class != 'all') {
			stats = data.classes[global_class];

			total = stats[distance].firsts + stats[distance].seconds + stats[distance].thirds + stats[distance].fourths + stats[distance].other;
			if (total < 9) {
				stats = data.stats;
				total = stats[distance].firsts + stats[distance].seconds + stats[distance].thirds + stats[distance].fourths + stats[distance].other;
			}

		}

		let fire_rate = stats[distance] && stats[distance].fires ? (stats[distance].fires / total * 100) : 0;
		let win_rate = stats[distance] && stats[distance].firsts ? (stats[distance].firsts / total * 100) : 0;

		horse_div.innerHTML += '<span class="naks_mr_2">' + trophy_icon + (win_rate).toFixed(2) + '%</span>';

		horse_div.innerHTML += ('<span class="naks_mr_2">' + flag_icon + total + '</span>');

		horse_div.innerHTML += ('<span class="naks_mr_2">' + fire_icon + fire_rate.toFixed(2) + '%' + '</span>');

		let make_red = false;

		let nine_twelve = 0;
		let history_total = 0;
		(data.stats[distance].positions || [])
			.forEach((a) => {
				if (a.position >= 9) nine_twelve += a.count;
				history_total += a.count;
			});

		if (history_total > 0 && nine_twelve > 0 && nine_twelve / history_total > .50 && history_total > 8) {
			let down_rate = (nine_twelve / history_total * 100).toFixed(0);

			horse_div.innerHTML += ('<span class="naks_bg_danger">' + down_icons + '<span class="naks_mr_2"> ' + down_rate + '%</span>');
			make_red = true;
		}


		let make_green = false;


		if (opponent_list.length > 0) {

			let opponents = opponent_list.filter(o => o.stats && o.stats[distance] && o.stats[distance].max_speed > 0);

			horse_div.innerHTML += '<br />';

			let max_list = opponents.filter(o => o.name != data.name && o.stats[distance] && o.stats[distance].max_speed >= data.stats[distance].max_speed);

			//is horse top 3
			if ((max_list.length + 1) <= 3 && stats[distance].stdev != undefined) {
				make_green = true;
			}

			if (stats[distance].max_speed != undefined) {
				horse_div.innerHTML += ('<span class="naks_mr_2"> ' + speed_max_icon + (max_list.length + 1) + ' @ ' + data.stats[distance].max_speed.toFixed(2) + '</span>');
			}

			let med_list = opponents.filter(o => o.name != data.name && o.stats[distance] && o.stats[distance].median_speed >= data.stats[distance].median_speed);

			if (stats[distance].median_speed != undefined) {
				horse_div.innerHTML += ('<span class="naks_mr_2"> ' + speed_med_icon + (med_list.length + 1) + '</span>');
			}

			//only 1 threat
			if (make_green && distance_stats.reds > 1) {
				make_green = false;
			}

			if (data.options && data.options.enemies) {
				let enemies = data.options.enemies.filter((e) => {
					return opponent_list.find(o => o.id == e);
				});

				if (enemies.length > 0) {
					horse_div.innerHTML += ('<span class="naks_mr_2"> ' + warning_icon + enemies.length + '</span>');
					make_green = false;
				}

			}

		}

		if (make_red) {
			horse_div.className += ' naks_alert_color';
		} else if (make_green) {
			horse_div.className += ' naks_success_color';
		}
	}
	list.appendChild(horse_div);
}

const loadHorses = () => {

	var page_content = document.getElementsByClassName("page-content");
	if (page_content && page_content.length > 0) {
		if (page_content[0].className.indexOf('buy-in') > -1) {
			if (api_key) {
				var naks = document.getElementById("naks_list");
				if (naks) {
					var round_buttons = document.getElementsByClassName("primary-btn");

					let to_display = my_horses;
					global_class = undefined;;
					let class_name = 'All Classes';
					for (var i = 0, max = round_buttons.length; i < max; i++) {
						let button = round_buttons[i];

						if (button.className.indexOf('btn-outline-secondary') > -1) {
							if (button.className.indexOf('horse-class-5') > -1) {
								global_class = 5;
								class_name = 'Class 5';
							} else if (button.className.indexOf('horse-class-4') > -1) {
								global_class = 4;
								class_name = 'Class 4';
							} else if (button.className.indexOf('horse-class-3') > -1) {
								global_class = 3;
								class_name = 'Class 3';
							} else if (button.className.indexOf('horse-class-2') > -1) {
								global_class = 2;
								class_name = 'Class 2';
							} else if (button.className.indexOf('horse-class-1') > -1) {
								global_class = 1;
								class_name = 'Class 1';
							} else if (button.className.indexOf('horse-class-0') > -1) {
								global_class = 0;
								class_name = 'Class G';
							}
						}
						if (global_class != undefined) to_display = my_horses.filter(d => d.details.class == global_class);
					}
					while (naks.firstChild) {
						naks.removeChild(naks.lastChild);
					}

					naks.className = 'nak_list';

					caches = global_class ? global_class : 'all';
					let display_distance = selected_distance == 'all' ? 'All Distances' : selected_distance;


					let head_text = "SN-Don't ZED Blind-Blood Tool-contact danshan11"
					// let head_text = "StackedNaks - ZedRun Racer"
					
					naks.innerHTML += `${head_text}<hr style="border-top: 1px solid white;"/><span>` + class_name + ' - ' + display_distance + '</span><hr style="border-top: 1px solid white;"/>';
					to_display.forEach(d => addHorseList(d, naks));

					if (race_stats.total > 0) {

						let overall_sumamry_div = document.createElement("div");
						overall_sumamry_div.className = 'nak_list_item ';
						overall_sumamry_div.innerHTML = '<hr style="border-top: 1px solid white;"/>RACE RECORD SUMMARY<br/>';

						if (race_stats.reds > 0) {
							overall_sumamry_div.innerHTML += '<span class="racing-tag naks_stats naks_alert_color naks_mr naks_mt">' + race_stats.reds + ' Threats</span>';
						}

						if (race_stats.yellows > 0) {
							overall_sumamry_div.innerHTML += '<span class="racing-tag naks_stats naks_warn_color naks_mr naks_mt">' + race_stats.yellows + ' Alerts</span>';
						}

						naks.appendChild(overall_sumamry_div);

					}

					if (distance_stats.total > 0) {

						//let distance_type = 'Sprint';
						//if (selected_distance == '1600')

						//1000/1200/1400, Medium distance is 1600/1800/2000, Marathoner is 2200/2400/2600.

						let distance_summary_div = document.createElement("div");
						distance_summary_div.className = 'nak_list_item ';
						distance_summary_div.innerHTML = '<hr style="border-top: 1px solid white;"/>RACE DISTANCE SUMMARY<br/>';

						if (distance_stats.reds > 0) {
							distance_summary_div.innerHTML += '<span class="racing-tag naks_stats naks_alert_color naks_mr naks_mt">' + distance_stats.reds + ' Threats</span>';
						}

						if (distance_stats.yellows > 0) {
							distance_summary_div.innerHTML += '<span class="racing-tag naks_stats naks_warn_color naks_mr naks_mt">' + distance_stats.yellows + ' Alerts</span>';
						}

						if (distance_stats.placers > 0) {
							distance_summary_div.innerHTML += '<span class="racing-tag naks_stats naks_warn_color naks_mr naks_mt">' + distance_stats.placers + ' Placers</span>';
						}

						if (distance_stats.downers > 0) {
							distance_summary_div.innerHTML += '<span class="racing-tag naks_stats naks_success_color naks_mr naks_mt">' + distance_stats.downers + ' Downers</span>';
						}

						naks.appendChild(distance_summary_div);
					}

					/*
					if (range_stats.total > 0) {

						let distance_type = 'SPRINT';
						if (selected_distance == '1600' || selected_distance == '1800' || selected_distance == '2000') {
							distance_type = 'MID'
						} else if (selected_distance == '2200' || selected_distance == '2400' || selected_distance == '2600') {
							distance_type = 'MARATHON'
						}

						let range_summary_div = document.createElement("div");
						range_summary_div.className = 'nak_list_item ';
						range_summary_div.innerHTML = '<hr style="border-top: 1px solid white;"/>' + distance_type + ' FUNNEL SUMMARY<br/>';
						range_summary_div.innerHTML += '<span style="font-style: italic;">Accumulative stats for all ' + distance_type.toLocaleLowerCase() + ' distances </span><br/>';

						if (range_stats.reds > 0) {
							range_summary_div.innerHTML += '<span class="racing-tag naks_stats naks_alert_color naks_mr naks_mt">' + range_stats.reds + ' Threats</span>';
						}

						if (range_stats.yellows > 0) {
							range_summary_div.innerHTML += '<span class="racing-tag naks_stats naks_warn_color naks_mr naks_mt">' + range_stats.yellows + ' Alerts</span>';
						}

						if (range_stats.placers > 0) {
							range_summary_div.innerHTML += '<span class="racing-tag naks_stats naks_warn_color naks_mr naks_mt">' + range_stats.placers + ' Placers</span>';
						}

						if (range_stats.downers > 0) {
							range_summary_div.innerHTML += '<span class="racing-tag naks_stats naks_success_color naks_mr naks_mt">' + range_stats.downers + ' Downers</span>';
						}

						naks.appendChild(range_summary_div);
					}
					*/

					let distance_summary_div = document.createElement("div");
					distance_summary_div.className = 'nak_list_item ';
					distance_summary_div.innerHTML = '';

					if (free_races.length > 0 && !(stable.options || {}).hide_upcoming_free) {
						distance_summary_div.innerHTML = '<hr class="naks_mb" style="border-top: 1px solid white;"/>FREE RACES SCHEDULED<br/>';

						free_races.forEach((r) => {

							let mins = Math.abs(Math.trunc(r.count_down / 60));
							let secs = Math.abs(r.count_down) - (mins * 60);

							let class_display = '<span class="racing-tag racing-tag--' + r.details.class + ' naks_pill naks_mb">';

							if (r.details.class == 5) class_display += 'V';
							if (r.details.class == 4) class_display += 'IV';
							if (r.details.class == 3) class_display += 'III';
							if (r.details.class == 2) class_display += 'II';
							if (r.details.class == 1) class_display += 'I';
							if (r.details.class == 0) class_display += 'G';

							class_display += '</span>';
						
							if (r.count_down < 0) {
								let max_mins = 1;
								let max_secs = 1;

								if (r.details.length == '1000') {
									if (r.count_down < -62) return;
									max_mins = 1;
									max_secs = 2;
								}
								if (r.details.length == '1200') {
									if (r.count_down < -79) return;
									max_mins = 1;
									max_secs = 19;
								}
								if (r.details.length == '1400') {
									if (r.count_down < -91) return;
									max_mins = 1;
									max_secs = 31;
								}
								if (r.details.length == '1600') {
									if (r.count_down < -106) return;
									max_mins = 1;
									max_secs = 46;
								}
								if (r.details.length == '1800') {
									if (r.count_down < -118) return;
									max_mins = 1;
									max_secs = 58;
								}
								if (r.details.length == '2000') {
									if (r.count_down < -131) return;
									max_mins = 2;
									max_secs = 11;
								}
								if (r.details.length == '2200') {
									if (r.count_down < -144) return;
									max_mins = 2;
									max_secs = 22;
								}
								if (r.details.length == '2400') {
									if (r.count_down < -156) return;
									max_mins = 2;
									max_secs = 36;
								}
								if (r.details.length == '2600') {
									if (r.count_down < -170) return;
									max_mins = 2;
									max_secs = 50;
								}

								
								if (r.count_down > -120) {
									if (mins > 0) {
										distance_summary_div.innerHTML += (class_display + ' @ ' + r.details.length + 'm running for ' + mins + 'm ' + secs + 's (max ' + max_mins + 'm ' + max_secs + 's)<br/>')
									} else {
										distance_summary_div.innerHTML += (class_display + ' @ ' + r.details.length + 'm running for ' + secs + 's (max ' + max_mins + 'm ' + max_secs + 's)<br/>')
									}

								}
							} else {

								if (mins > 0) {
									distance_summary_div.innerHTML += (class_display + ' @ ' + r.details.length + 'm starts in ' + mins + 'm ' + secs + 's<br/>')
								} else {
									distance_summary_div.innerHTML += (class_display + ' @ ' + r.details.length + 'm starts in ' + secs + 's<br/>')
								}

							}

							
						})
					}

					// distance_summary_div.innerHTML += '<br/>Have you donated recently?<br/>ETH: 0xc3422b8D7aa4be58C2BA7F07342620D5e13C2cD3<br/>Support: <a href="mailto:hello@stackednaks.com" target="_">hello@stackednaks.com</a>';
					distance_summary_div.innerHTML += '<br/>Support: <a href="mailto:hello@stackednaks.com" target="_">hello@stackednaks.com</a>';

					naks.appendChild(distance_summary_div);


					return;
				}

				var accordian = document.getElementsByClassName("accordion-container");

				if (accordian && accordian.length > 0) {
					accordian[0].className += ' naks_w_85';
				}

				var open_races = document.getElementsByClassName("open-races");
				if (open_races.length > 0) {
					let horse_list = document.createElement("div");
					horse_list.setAttribute("id", "naks_list");
					horse_list.className = 'nak_list';
					horse_list.innerHTML = 'Stats by stackednaks.com <hr style="border-top: 1px solid white;"/>';

					open_races[0].insertBefore(horse_list, open_races[0].firstChild);
				}


				//if horses are no loaded, then load and cache them
				if (my_horses.length == 0) {
					const options = {
						// headers: new Headers({ 'x-api-key': api_key }),
					};

					fetch(host_url + '/horses?stable_id=' + api_key + '&classes=&sort=win_rate&distance=all', options)
						.then(response => response.json())
						.then(data => {
							data.results.forEach(d => my_horses.push(d));
						})
						.catch(data => {
							my_horses.push({ name: 'Could not load account. Please contact hello@stackednaks.com', details: { class: '' } })
						});
				}
			}
		}
	}
}

const loadStable = () => {
	const options = {
		headers: new Headers({ 'x-api-key': api_key }),
	};

	fetch(host_url + '/stables/' + api_key, options).then(response => response.json())
		.then(data => {
			stable = data;
		});
}

//find the public key of from within the webpage
const initHeader = () => {

	var naks = document.getElementById("naks_header");

	if (!naks) {
		var page_content = document.getElementsByClassName("open-races");

		if (page_content.length > 0) {
			let element = document.createElement("div");
			element.setAttribute("id", "naks_header");

			page_content[0].appendChild(element);
		}

		var links = document.getElementsByTagName("a");
		for (var i = 0, max = links.length; i < max; i++) {
			if (links[i].href.indexOf('https://etherscan.io') > -1) {
				api_key = links[i].href.split('/').pop();
				loadStable();
				fatigue();
			}
		}
	}
}

//load free races from stackednaks
const freeRaces = () => {

	
	if (api_key && !(stable.options || {}).hide_upcoming_free) {

		const options = {
			headers: new Headers({ 'x-api-key': api_key }),
		};

		fetch(host_url + '/races?fee=0', options)
			.then(response => response.json())
			.then(data => {
				free_races = [];
				data.results.forEach((r) => {
					free_races.push(r);
				});
			})
			.catch(data => {
				my_horses.push({ name: 'Could not load account', details: { class: '' } })
			});
	}
}

//refresh fatigue, using jwt (frowned upon by me but people want it)
const fatigue = async () => {
	if (api_key) {

		let jwt = localStorage.getItem('jwt');
		let token = JSON.parse(jwt)[api_key];

		const options = {
			headers: new Headers({ 'authorization': 'Bearer ' + token }),
		};

		my_horses.forEach(async mh => {

			let stamina = await fetch('https://api.zed.run/api/v1/horses/stamina/' + mh.id, options).then(response => response.json())
				.catch(err => console.log(err));

			//console.log(mh, stamina)

			if (stamina) {
				mh.fatigue = stamina.current_stamina;
				mh.time_to_full_recovery = stamina.time_to_full_recovery;
			}

		});

		let class_1 = await fetch('https://api.zed.run/api/v1/races/paid/available_race_horses?public_address=' + api_key + '&offset=0&horse_name=&race_class=1', options).then(response => response.json());
		let class_2 = await fetch('https://api.zed.run/api/v1/races/paid/available_race_horses?public_address=' + api_key + '&offset=0&horse_name=&race_class=2', options).then(response => response.json());
		let class_3 = await fetch('https://api.zed.run/api/v1/races/paid/available_race_horses?public_address=' + api_key + '&offset=0&horse_name=&race_class=3', options).then(response => response.json());
		let class_4 = await fetch('https://api.zed.run/api/v1/races/paid/available_race_horses?public_address=' + api_key + '&offset=0&horse_name=&race_class=4', options).then(response => response.json());
		let class_5 = await fetch('https://api.zed.run/api/v1/races/paid/available_race_horses?public_address=' + api_key + '&offset=0&horse_name=&race_class=5', options).then(response => response.json());
		let class_0 = await fetch('https://api.zed.run/api/v1/races/paid/available_race_horses?public_address=' + api_key + '&offset=0&horse_name=&race_class=0', options).then(response => response.json());

		let data = class_0.concat(class_1).concat(class_2).concat(class_3).concat(class_4).concat(class_5);

		data.forEach(h => {
			let mh = my_horses.find(m => m.id == h.horse_id);
			if (mh) {
				mh.details.class = h.class;
				mh.details.rating = h.rating;
			} else {
				//console.log(h);
			}
		});


		my_horses.forEach(h => {
			h.is_racing = data.find(m => h.id == m.horse_id) == undefined;
		});

		//my_horses.sort((a, b) => {
		//	return b.fatigue - a.fatigue;
		//})				
	}
}

//*************************************** */
// Displays horse detailed infor on the horse card
//*************************************** */
const horseDetails = () => {
	var find_hcc = document.getElementsByClassName("horse-card-content");

	if (find_hcc && find_hcc.length > 0) {
		let horse_card_content = find_hcc[0];

		if (horse_card_content.className.indexOf('naks_found') == -1) {

			let find_hn = document.getElementsByClassName("name");

			if (find_hn && find_hn.length > 0) {

				let existing = cache.find(h => h.name == find_hn[0].innerHTML);

				if (existing) {
					horse_card_content.className += ' naks_found';

					let find_bg = document.getElementsByClassName("btns-group");

					if (find_bg && find_bg.length > 0) {

						find_bg[0].innerHTML += '<a href="https://www.stackednaks.com/horse/' + existing.id + '" target="_" style="margin-left:10px" class="outline-btn bold md details"><img class="icon" src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im0xNCAzdjJoMy41OWwtOS44MyA5LjgzIDEuNDEgMS40MSA5LjgzLTkuODN2My41OWgydi03em01IDE2aC0xNHYtMTRoN3YtMmgtN2MtMS4xMSAwLTIgLjktMiAydjE0YzAgMS4xMDQ1Njk1Ljg5NTQzMDUgMiAyIDJoMTRjMS4xMDQ1Njk1IDAgMi0uODk1NDMwNSAyLTJ2LTdoLTJ6IiBmaWxsPSIjZjBmOGZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PC9zdmc+">StackedNaks</a>';

						let next_div = '<div class="naks_mt naks_distance_stats primary-text bold">';

						next_div += '<div class="w_25"><span>Stats @  ' + selected_distance + '</span></div>';

						next_div += '<div  class="w_25"><span>Record</span></div>';

						next_div += '<div  class="w_25"><span>Win Rate</span></div>';

						next_div += '<div class="w_25"><span>Place Rate</span></div>';

						next_div += '<div class="w_25"><span>Fire Rate</span></div>';

						next_div += '</div>';


						find_bg[0].innerHTML += next_div;

						['all', 1, 2, 3, 4, 5].forEach((d) => {

							let stats = d == 'all' ? existing.stats : existing.classes[d.toString()]

							let stat = stats[selected_distance.toString()];

							let total = stat.firsts + stat.seconds + stat.thirds + stat.fourths + stat.other;

							let win_rate = stat.firsts ? Math.round10(stat.firsts / (stat.firsts + stat.seconds + stat.thirds + stat.fourths + stat.other) * 100, -1) : 0;

							let place_rate = Math.round10((stat.firsts + stat.seconds + stat.thirds) ? (stat.firsts + stat.seconds + stat.thirds) / (stat.firsts + stat.seconds + stat.thirds + stat.fourths + stat.other) * 100 : 0, -2);

							let fire_rate = Math.round10(stat.fires ? stat.fires / (stat.firsts + stat.seconds + stat.thirds + stat.fourths + stat.other) * 100 : 0, -2);


							let next_div = '<div class="naks_stats naks_mt naks_distance_stats ' + (global_class == d.toString() ? ' naks_highlight_row ' : '') + '">';

							if (d == 'all') {
								next_div += '<div class="w_25">All</div>';
							} else {
								next_div += '<div class="w_25">Class ' + d.toString() + ' </div>';
							}

							next_div += '<div class="w_25"><span>' + total + ' - ' + stat.firsts + '/' + stat.seconds + '/' + stat.thirds + '</span></div>';

							next_div += '<div class="w_25"><span> ' + win_rate.toFixed(2) + '%</span></div>';

							next_div += '<div class="w_25"><span> ' + place_rate.toFixed(2) + '%</span></div>';

							next_div += '<div class="w_25"><span> ' + fire_rate.toFixed(2) + '%</span></div>';

							next_div += '</div>';

							find_bg[0].innerHTML += next_div;

						});
						/*
												distances.forEach( (d) => {
													
													let stats = existing.stats;
													if (global_class && global_class != 'all') {
														stats = existing.classes[global_class];
													}
						
													let stat = stats[d.id.toString()];
						
													let total = stat.firsts + stat.seconds + stat.thirds + stat.fourths + stat.other;
													
													let win_rate = stat.firsts ? Math.round10(stat.firsts / (stat.firsts + stat.seconds + stat.thirds + stat.fourths + stat.other) * 100, -1) : 0;
						
													let place_rate = Math.round10((stat.firsts + stat.seconds + stat.thirds) ?(stat.firsts + stat.seconds + stat.thirds) / (stat.firsts + stat.seconds + stat.thirds + stat.fourths + stat.other) * 100 : 0, -2);
						
													let fire_rate = Math.round10(stat.fires ? stat.fires / (stat.firsts + stat.seconds + stat.thirds + stat.fourths + stat.other) * 100 : 0, -2);
						
																
													let next_div = '<div class="naks_stats naks_mt naks_distance_stats ' + (selected_distance == d.id.toString() ? ' naks_highlight_row ' : '') + '">';
													next_div += '<div class="w_25">' + d.text + ' </div>';
						
						
													next_div += '<div class="w_25"><span>' + total + ' - ' + stat.firsts + '/' + stat.seconds + '/' + stat.thirds + '</span></div>';
						
													next_div += '<div class="w_25"><span> ' + win_rate.toFixed(2) + '%</span></div>';
						
													next_div += '<div class="w_25"><span> ' + place_rate.toFixed(2) + '%</span></div>';
						
													next_div += '<div class="w_25"><span> ' + fire_rate.toFixed(2) + '%</span></div>';
						
													next_div += '</div>';
						
													find_bg[0].innerHTML+= next_div;
						
												});
						*/
						find_bg[0].className = 'naks_header';

					}

				}
			}

		}
	}
}


setInterval(() => {
	initHeader();
	loadHorses();
	run();
	horseDetails();

	free_races.forEach(r => {
		r.count_down--;
	});

}, 1000);

setInterval(() => {
	fatigue();
}, 60000);

setInterval(() => {
	freeRaces();
}, 30000);