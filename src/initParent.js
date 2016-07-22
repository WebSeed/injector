module.exports = function(opts) {

  console.log('Injector: initialising the parent');

  var selector = opts.selector;
  var url = opts.url;
  var width = opts.width || '100%';
  var height = opts.height || '480px';
  var replace = opts.replace || false;

  function clearDom(selector) {
    var node = document.querySelector(selector);
    while (node && node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

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
    console.log('Target event', event);
    if (event.data.type === 'height') {
      iframe.height = event.data.height + 'px';
    }
  }

  function postMessage(data) {
    iframe.contentWindow.postMessage(data, url);
  }

  if (replace) {
    clearDom(selector);
  }

  var iframe = createIframe(url);

  document.querySelector(selector).appendChild(iframe);
  window.addEventListener('message', onMessage, false);
};
