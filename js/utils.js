function $_ (selector, node = document) {
  return node.querySelector(selector);
}

function $$_ (selector, node = document) {
  return node.querySelectorAll(selector);
}

function isInputEmpty (inputValue) {
  if (inputValue === '') {
    return true;
  } else {
    return false;
  }
}

function createElement (tagName, className, text) {
  var element = document.createElement(tagName);
  element.setAttribute('class', className);

  if (text) {
    element.textContent = text;
  }

  return element;
};