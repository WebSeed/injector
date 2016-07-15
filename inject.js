(function(window, document) {

  // window.addEventListener('load', function() {
  // });

  var iframe = document.createElement('iframe');
  iframe.frameBorder = 0;
  iframe.width = '640px';
  iframe.height = '480px';
  iframe.id = 'iframe-id';
  iframe.setAttribute('src', 'http://www.bbc.co.uk/news');
  document.getElementById('mount').appendChild(iframe);

}(window, document))
