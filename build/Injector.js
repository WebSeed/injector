(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Injector = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var initChild = require('./initChild');
var initParent = require('./initParent');

module.exports = {
  initChild: initChild,
  initParent: initParent
};

},{"./initChild":2,"./initParent":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}]},{},[1])(1)
});