
HTMLElement.prototype.addClass = function (c) {
  this.classList.add(c);
  return this;
};

HTMLElement.prototype.removeClass = function (c) {
  this.classList.remove(c);
  return this;
};

Object.prototype.let = function (func) {
  return func(this);
};

Array.prototype.clear = function () {
  this.length = 0;
};
