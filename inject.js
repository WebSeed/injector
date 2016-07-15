(function(window, document) {

  var mountSelector = '#mount';

  var iframeSrc = window.location.protocol + '//' + window.location.host + '/target.html';

  var iframe = document.createElement('iframe');
  iframe.frameBorder = 0;
  iframe.width = '640px';
  iframe.height = '480px';
  iframe.id = 'the-id';
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
