/* eslint-disable @typescript-eslint/no-explicit-any */
// declare const tfvis: typeof import('@tensorflow/tfjs-vis');
import './index.css';

console.log('Inside VIS');
const api = acquireVsCodeApi();
window.addEventListener('message', (e) => onMessage(e.data));
api.postMessage({ type: 'loaded' });

function onMessage(data?: { _type?: 'helloWorld' } | any) {
    if (!data || !data.type) {
        return;
    }
}


