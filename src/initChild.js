module.exports = function() {

  console.log('Injector: initialising the child');

  var resizeTimer;
  var parentUrl;
  var ready = false;

  // http://stackoverflow.com/a/1147768/186965
  function getHeight() {
    var body = document.body;
    var html = document.documentElement;

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
    return html.offsetHeight;
  }

  function postMessage(data) {
    if (ready) {
      parent.postMessage(data, parentUrl);
    }
  }

  function onMessage(event) {
    console.log('message from parent', event);
    if (event.data.type === 'ready') {
      parentUrl = event.origin;
      ready = true;
      // TODO: validate parent URL
      postHeight();
    }
  }

  function onResize(event) {
    /* debounce */
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(postHeight, 100);
  }

  function postHeight() {
    var height = getHeight();
    console.log('Sending ' + height);
    postMessage({ type: 'height', height: height });
  }

  window.addEventListener('resize', onResize, false);
  window.addEventListener('message', onMessage, false);
};
