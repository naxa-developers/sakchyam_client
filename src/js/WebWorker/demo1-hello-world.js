postMessage('Worker running');
onmessage = evt => {
  postMessage(`Worker received data: ${JSON.stringify(evt.data)}`);
};
