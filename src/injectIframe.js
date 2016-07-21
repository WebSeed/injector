var injectIframe = function(opts) {

  var selector = opts.selector;
  var url = opts.url;
  var width = opts.width || '100%';
  var height = opts.height || '480px';
  var iframe = createIframe(url);

  function createIframe(src) {
    var iframe = document.createElement('iframe');
    iframe.frameBorder = 0;
    iframe.width = width;
    iframe.height = height;
    iframe.addEventListener('load', function(event) {
      postMessage({ type: 'ready' });
    });
    iframe.setAttribute('src', src);
    return iframe;
  }

  function onMessage(event) {
    console.log('message event from target', event);
    if (event.data.type === 'height') {
      iframe.height = event.data.height + 'px';
    }
  }

  function postMessage(data) {
    iframe.contentWindow.postMessage(data, url);
  }

  document.querySelector(selector).appendChild(iframe);
  window.addEventListener('message', onMessage, false);
};

window.injectIframe = injectIframe;
