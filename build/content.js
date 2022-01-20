console.log('StackedNaks loaded');

let cache = [];
let active_racename = '';
//let race_stats = {};
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
	{ id: '1000', text: '1000', elo: {"10": 2438.5, "20": 2552, "30": 2609, "40": 2666, "50": 2727, "60": 2787, "70": 2843, "80": 2904, "90": 3054, "91": 3093.9000000000015, "92": 3126, "93": 3147, "94": 3170, "95": 3190, "96": 3214, "97": 3239, "98": 3263, "99": 3309.0999999999985} },
	{ id: '1200', text: '1200', elo: {"10": 2754, "20": 2896, "30": 2950, "40": 2995, "50": 3035, "60": 3101, "70": 3219, "80": 3321, "90": 3503, "91": 3534, "92": 3552, "93": 3569, "94": 3585, "95": 3600, "96": 3615, "97": 3632, "98": 3655, "99": 3698}},
	{ id: '1400', text: '1400', elo: {"10": 3412, "20": 3594, "30": 3660, "40": 3733, "50": 3893, "60": 4046, "70": 4181, "80": 4307, "90": 4490, "91": 4530, "92": 4579, "93": 4626, "94": 4680, "95": 4721, "96": 4751, "97": 4771, "98": 4796, "99": 4832.989999999998} },
	{ id: '1600', text: '1600', elo: {"10": 3584, "20": 3801, "30": 3867, "40": 3954, "50": 4101, "60": 4286, "70": 4457, "80": 4585, "90": 4804, "91": 4821, "92": 4837, "93": 4851, "94": 4871, "95": 4901, "96": 4943, "97": 4973, "98": 5011.300000000003, "99": 5056}},
	{ id: '1800', text: '1800', elo: {"10": 2356, "20": 2464, "30": 2537, "40": 2593, "50": 2673, "60": 2798, "70": 2916, "80": 3010, "90": 3131, "91": 3142, "92": 3152, "93": 3165, "94": 3181, "95": 3196, "96": 3216, "97": 3248.0699999999997, "98": 3292, "99": 3343}},
	{ id: '2000', text: '2000', elo: {"10": 2882, "20": 3108, "30": 3211, "40": 3278, "50": 3379, "60": 3503, "70": 3628, "80": 3747, "90": 3888, "91": 3916, "92": 3944, "93": 3963.5800000000017, "94": 3984, "95": 4012, "96": 4043, "97": 4077, "98": 4102, "99": 4130}},
	{ id: '2200', text: '2200', elo: {"10": 2771, "20": 3010, "30": 3111, "40": 3162, "50": 3200, "60": 3238, "70": 3283, "80": 3368, "90": 3473, "91": 3494, "92": 3517, "93": 3545, "94": 3580, "95": 3629, "96": 3666, "97": 3693, "98": 3716, "99": 3742.59}},
	{ id: '2400', text: '2400', elo: {"10": 2388.7000000000003, "20": 2550, "30": 2651, "40": 2722.300000000001, "50": 2765, "60": 2802, "70": 2847, "80": 2923, "90": 3085, "91": 3102, "92": 3124, "93": 3149, "94": 3173, "95": 3191, "96": 3217.0200000000004, "97": 3257.6399999999994, "98": 3289.2599999999984, "99": 3327.880000000001}},
	{ id: '2600', text: '2600', elo: {}}
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

		nodes[1].childNodes[1].innerHTML = "";

		nodes[1].childNodes[2].className = '';

		nodes[2].remove();
		nodes[3].remove();
		nodes[2].innerHTML += ('XXXXX</br>' + data.name + '(' + data.details.rating + ')');

		let stats = data.stats;
		if (!stats) return;

		if (global_class && global_class != 'all' && data.classes) {
			stats = data.classes[global_class];

			let total = stats[distance].firsts + stats[distance].seconds + stats[distance].thirds + stats[distance].fourths + stats[distance].other;
			if (total < 9) {
				stats = data.stats;
			}
		}

		let mh = my_horses.find(d => d.id == data.id);

		let dis_record = document.createElement("span");
		dis_record.className = 'racing-tag naks_stats';

		let distance_total = (stats[distance].firsts + stats[distance].seconds + stats[distance].thirds + stats[distance].fourths + stats[distance].other);
		let fire_rate = stats[distance].fires ? (stats[distance].fires / (stats[distance].firsts + stats[distance].seconds + stats[distance].thirds + stats[distance].fourths + stats[distance].other) * 100) : 0;
		let win_rate = stats[distance].firsts ? (stats[distance].firsts / (stats[distance].firsts + stats[distance].seconds + stats[distance].thirds + stats[distance].fourths + stats[distance].other) * 100) : 0;
		let place_rate = ((stats[distance].firsts + stats[distance].seconds + stats[distance].thirds) / (stats[distance].firsts + stats[distance].seconds + stats[distance].thirds + stats[distance].fourths + stats[distance].other) * 100);

		dis_record.innerHTML += '<span class="naks_mr_2">' + (win_rate).toFixed(0) + '% - </span>';

		dis_record.innerHTML += ('<span class="naks_mr_2">' + (distance_total) + ' - </span>');

		dis_record.innerHTML += ('<span class="naks_mr_2">' + fire_rate.toFixed(0) + '%' + '</span>');

		let color = '';


		if ((win_rate >= 15 || fire_rate > 60) && distance_total > 9) {
			dis_record.className += ' naks_alert_color';
			color = 'naks_alert_color';
		} else if ((win_rate >= 10 || fire_rate > 60)) {
			dis_record.className += ' naks_warn_color';
			color = 'naks_warn_color';
		}
		if (!mh) distance_stats.total++;


		if (data.ranks[distance] > 1350) distance_stats.reds++;

		if (place_rate > 50) {
			if (!mh) distance_stats.placers++;
		}

		let profit = 0;

		for (var i = 6 - 1; i >= 1; i--) {


			if (i != global_class-1 && i != global_class && i != global_class+1) continue;

			let stat = (data.classes[i] || {})[distance];
			if (stat) {
				let class_record = document.createElement("span");
				class_record.className = 'racing-tag naks_stats';

				let distance_total = (stat.firsts + stat.seconds + stat.thirds + stat.fourths + stat.other);
				let fire_rate = stat.fires ? (stat.fires / (stat.firsts + stat.seconds + stat.thirds + stat.fourths + stat.other) * 100) : 0;
				let win_rate = stat.firsts ? (stat.firsts / (stat.firsts + stat.seconds + stat.thirds + stat.fourths + stat.other) * 100) : 0;
				let place_rate = ((stat.firsts + stat.seconds + stat.thirds) / (stat.firsts + stat.seconds + stat.thirds + stat.fourths + stat.other) * 100);


				class_record.innerHTML += ('<span class="naks_mr_2">' + (distance_total) + ' - </span>');

				class_record.innerHTML += '<span class="naks_mr_2">' + (win_rate).toFixed(0) + '% - </span>';


				class_record.innerHTML += ('<span class="naks_mr_2">' + fire_rate.toFixed(0) + '%' + '</span>');


				if ((win_rate >= 15 || fire_rate > 60) && distance_total > 9) {
					class_record.className += ' naks_alert_color';
				} else if ((win_rate >= 10 || fire_rate > 60)) {
					class_record.className += ' naks_warn_color';
				}

				if (i == global_class) class_record.className += ' naks_selected_alert';

				profit += (stat.prizes - stat.fees)

				nodes[1].childNodes[2].appendChild(class_record);

			}
		}

		profit = profit.toFixed(4);

		let profit_div = document.createElement("span");
		profit_div.className = 'racing-tag naks_stats';

		if (profit > 0) profit_div.className += ' naks_alert_color';

		profit_div.innerHTML += '<span class="naks_mr_2"> ' + profit + '</span>';
		nodes[1].childNodes[2].appendChild(profit_div);


		let nine_twelve = 0;
		let history_total = 0;
		(data.stats[distance].positions || [])
			.forEach((a) => {
				if (a.position >= 7) nine_twelve += a.count;
				history_total += a.count;
			});


		let down_classer = document.createElement("span");
		down_classer.className = 'racing-tag naks_stats ';

		if (nine_twelve / history_total > .50) {
			down_classer.className += ' naks_bg_success ';
			if (!mh) distance_stats.downers++;
		}

		let down_rate = (history_total > 0 && nine_twelve > 0) ? (nine_twelve / history_total * 100).toFixed(0) : 0;

		down_classer.innerHTML += down_icons + '<span class="naks_mr_2"> ' + down_rate + '%</span>';
		nodes[1].childNodes[2].appendChild(down_classer);

		let ranks_div = document.createElement("span");
		ranks_div.className = 'racing-tag naks_stats ';
		if (data.ranks[distance]) {
			ranks_div.innerHTML += '<span class="naks_mr_2"> ' + data.ranks[distance].toFixed(0) + '</span>';

			if (data.ranks[distance] > 1350) {
				ranks_div.className += ' naks_alert_color ';
			}
		} else {
			ranks_div.innerHTML += '<span class="naks_mr_2"> NaN </span>';
		}
		nodes[1].childNodes[2].appendChild(ranks_div);


		let danger = 0;
		let equal_fire = 0;
		let equal_nofire = 0;
		let beat = 0;
		//check history
		my_horses.forEach(h => {
			if (h.race_history && h.options.tags.find(t => t.id == selected_distance) && h.details.class == global_class && h.id != data.id) {
				console.log('checking', data.name, 'against', h.name);

				h.race_history.forEach(r => {

					if (r.details.length == distance) {
						let exists = r.horses.find(d => d.horse_id == data.id);
						if (exists) {

							let me_is_fire = r.fire.rpi[h.id] == 1;
							let opp_is_fire = r.fire.rpi[data.id] == 1;

							if (me_is_fire && !opp_is_fire) {
								console.log('CAN BEAT')
								beat++;
							} else if (!me_is_fire && opp_is_fire) {
								console.log('DANGER');
								danger++;
							} else if (me_is_fire && opp_is_fire) {
								console.log('EQUAL FIRE')
								equal_fire++;
							} else {
								console.log('EQUAL NO FIRE')
								equal_nofire++;
							}
						}
					}
				})
			}
		})

		if (danger || equal_fire || equal_nofire || beat) {
			let histroy_div = document.createElement("span");
			histroy_div.className = 'racing-tag naks_stats ';
			histroy_div.innerHTML += '<span class="naks_mr_2"> ';
			if (danger) {
				histroy_div.innerHTML = histroy_div.innerHTML + ' ' + danger.toString() + 'x Danger';
			}

			if (equal_fire) {
				histroy_div.innerHTML = histroy_div.innerHTML + ' ' + equal_fire.toString() + 'x Both';
			}

			if (equal_nofire) {
				histroy_div.innerHTML = histroy_div.innerHTML + ' ' + equal_nofire.toString() + 'x None';
			}

			if (beat) {
				histroy_div.innerHTML = histroy_div.innerHTML + ' ' + beat.toString() + 'x Beat';
			}

			histroy_div.innerHTML += '</span>'
			nodes[1].childNodes[2].appendChild(histroy_div);
		}

	}
}

const run = () => {

	selected_distance = 'all';

	var race_name = document.getElementsByClassName("race-description");

	if (race_name.length == 0) {
		active_racename = '';
		/*
		race_stats = {
			reds: 0,
			yellows: 0,
			total: 0,
		};
		*/

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
		/*
		race_stats = {
			reds: 0,
			yellows: 0,
			total: 0,
		};
		*/
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
							.then(data => {
								return getRank(data)
							})
							.then(data => {
								return updateHorse(data, horse_data, selected_distance);
							})
							.catch(data => console.log(data));
					}

				}
			}
		}
	}

}

const getRank = (data) => {
	return fetch("https://paintedponies.racing/showvilles/" + data.id + ".json")
		.then(response => response.json())
		.then(response => {
			data.ranks = response;
			return data;
		})
		.catch(err => {
			//	console.log('could not load ranks', err);
			return data;
		});
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

	let has_tag_match = false;
	if (!data.is_racing) {
		tags.forEach(element => {
			if (element) {
				if (!has_tag_match) {
					has_tag_match = (element.text == selected_distance)
				}

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
				if (a.position >= 7) nine_twelve += a.count;
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

			//is horse top 5
			if ((max_list.length + 1) <= 4) {
				//make_green = true;
			}

			if (stats[distance].max_speed != undefined) {
				//	horse_div.innerHTML += ('<span class="naks_mr_2"> ' + speed_max_icon + (max_list.length + 1) + ' @ ' + data.stats[distance].max_speed.toFixed(2) + '</span>');
			}

			let med_list = opponents.filter(o => o.name != data.name && o.stats[distance] && o.stats[distance].median_speed >= data.stats[distance].median_speed);

			if (stats[distance].median_speed != undefined) {
				//	horse_div.innerHTML += ('<span class="naks_mr_2"> ' + speed_med_icon + (med_list.length + 1) + '</span>');
			}



			let rank_list = opponents.filter(o => o.name != data.name && o.ranks && o.ranks[distance] >= data.ranks[distance]);

			if (data.ranks) {
				horse_div.innerHTML += ('<span class="naks_mr_2"> ' + hash_icon + (rank_list.length + 1) + ' @ ' + data.ranks[distance] + '</span>');
			}

			if ((rank_list.length + 1) <= 3) {
				make_green = true;
			}

			//console.log(data.name,make_green);

			//only 1 threat
			if (make_green && distance_stats.reds > 2) {
				//make_green = false;
			}

			if (data.options && data.options.enemies) {
				let enemies = data.options.enemies.filter((e) => {
					return opponent_list.find(o => o.id == e);
				});

				if (enemies.length > 0) {
					horse_div.innerHTML += ('<span class="naks_mr_2"> ' + warning_icon + enemies.length + '</span>');
					make_green = false;
					console.log(data.name, 'enemies', enemies);
				}

			}

		}

		if (make_green) {
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

					if (selected_distance != 'all') {
						to_display = to_display.sort((a, b) => {
							return (b.ranks || {})[selected_distance] - (a.ranks || {})[selected_distance];
						});
					}

					naks.innerHTML += 'StackedNaks - ZedRun Racer<hr style="border-top: 1px solid white;"/><span>' + class_name + ' - ' + display_distance + '</span><hr style="border-top: 1px solid white;"/>';
					to_display.forEach(d => addHorseList(d, naks));


					if (distance_stats.total > 0) {


						let distance_summary_div = document.createElement("div");
						distance_summary_div.className = 'nak_list_item ';
						distance_summary_div.innerHTML = '<hr style="border-top: 1px solid white;"/>RACE DISTANCE SUMMARY<br/>';

						if (distance_stats.reds > 0) {
							distance_summary_div.innerHTML += '<span class="racing-tag naks_stats naks_alert_color naks_mr naks_mt">' + distance_stats.reds + ' Threats</span>';
						}

						if (distance_stats.yellows > 0) {
							distance_summary_div.innerHTML += '<span class="racing-tag naks_stats naks_warn_color naks_mr naks_mt">' + distance_stats.yellows + ' Alerts</span>';
						}


						if (distance_stats.downers > 0) {
							distance_summary_div.innerHTML += '<span class="racing-tag naks_stats naks_success_color naks_mr naks_mt">' + distance_stats.downers + ' Downers</span>';
						}

						naks.appendChild(distance_summary_div);
					}



					let distance_summary_div = document.createElement("div");
					distance_summary_div.className = 'nak_list_item ';
					distance_summary_div.innerHTML = '';


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
						headers: new Headers({ 'x-api-key': api_key }),
					};

					fetch(host_url + '/horses?stable_id=' + api_key + '&classes=&sort=win_rate&distance=all', options)
						.then(response => response.json())
						.then(data => {
							data.results.forEach(d => my_horses.push(d));
							return loadMyHorseRanks();
						})
						.then(data => {
							return loadMyHorseHistory();
						})
						.catch(data => {
							my_horses.push({ name: 'Could not load account. Please contact hello@stackednaks.com', details: { class: '' } })
						});
				}
			}
		}
	}
}


const loadMyHorseHistory = async () => {
	for (let i = 0; i < my_horses.length; i++) {
		let horse = my_horses[i];
		if (horse.options && horse.options.tags && !horse.options.tags.find(t => t.id == 'HIDE')) {
			
			const options = {
				headers: new Headers({ 'x-api-key': api_key }),
			};


			await fetch(host_url + '/races?per_page=500&horse_id=' + horse.id.toString(), options)
				.then(response => response.json())
				.then(data => {
					console.log(horse.name, 'races', data.results.length)
					horse.race_history = data.results;
				});
		}
	}
}

const loadMyHorseRanks = async () => {

	for (let i = 0; i < my_horses.length; i++) {
		await getRank(my_horses[i]);
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
			if (links[i].href.indexOf('https://explorer-mainnet.maticvigil.com/address/') > -1) {
				api_key = links[i].href.split('/')[4];
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

			if (stamina) {
				mh.fatigue = stamina.current_stamina;
				mh.time_to_full_recovery = stamina.time_to_full_recovery;
			}

		});

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


const checkStackedNaks = async () => {
	if (window.location.origin == 'https://www.stackednaks.com' && window.location.pathname.indexOf('race') > 0) {


		let headers = document.querySelectorAll("h2");
		let length = headers[0].innerHTML.split(' ').pop();

		var links = document.getElementsByTagName("a");
		for (var i = 0, max = links.length; i < max; i++) {
			if (links[i].href.indexOf('/horse/') > -1 && links[i].innerHTML.indexOf('<i') < 0) {
				let horse_id = links[i].href.split('/').pop()


				await getRank({ id: horse_id }).then((r) => {
					if (r.ranks) {
						if (r.ranks[length] > 1100) {
							links[i].innerHTML +=
								(' <span class="badge bg-success">' + (r.ranks[length] || 'NAN') + ' </span>')
						} else if (r.ranks[length] < 1000) {
							links[i].innerHTML +=
								(' <span class="badge bg-danger">' + (r.ranks[length] || 'NAN') + ' </span>')
						} else {
							links[i].innerHTML +=
								(' <span class="badge bg-warning">' + (r.ranks[length] || 'NAN') + ' </span>')
						}
					}
				})
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


setTimeout(() => {
	checkStackedNaks();
}, 5000);