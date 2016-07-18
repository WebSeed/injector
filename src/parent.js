(function(window, document) {

  var mountSelector = '#mount';

  var iframeSrc = window.location.protocol + '//' + window.location.host + '/target.html';
  var DEFAULT_WIDTH = '100%';
  var DEFAULT_HEIGHT = '480px';

  var iframe = document.createElement('iframe');
  iframe.frameBorder = 0;
  iframe.width = DEFAULT_WIDTH;
  iframe.height = DEFAULT_HEIGHT;
  iframe.addEventListener('load', function(event) {
    postMessage({ type: 'ready' });
  });
  iframe.setAttribute('src', iframeSrc);
  document.querySelector(mountSelector).appendChild(iframe);

  function onMessage(event) {
    console.log('message event from target', event);
    if (event.data.type === 'height') {
      iframe.height = event.data.height + 'px';
    }
  }

  function postMessage(data) {
    iframe.contentWindow.postMessage(data, iframeSrc);
  }

  window.addEventListener('message', onMessage, false);

}(window, document))
