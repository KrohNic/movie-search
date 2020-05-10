const Utils = require('../src/Utils');

describe('testing createElem()', () => {
  let elem;

  beforeEach(() => {
    elem = Utils.createElem('div', 'class1 class2');
  });

  it('should be defined', () => {
    expect(elem).toBeDefined();
  });

  it('should be HTMLElement', () => {
    expect(elem).toBeInstanceOf(HTMLElement);
  });

  it('should return a div element', () => {
    expect(elem.tagName).toEqual('DIV');
  });

  it('should set 2 css classes to element', () => {
    expect(elem.classList.length).toEqual(2);
  });

  it('should set css class named "class1"', () => {
    expect(elem.classList.contains('class1')).toBeTruthy();
  });

  it('should set css class named "class2"', () => {
    expect(elem.classList.contains('class2')).toBeTruthy();
  });
});

describe('testing createLoadingPlaceholder()', () => {
  let elem;
  let parent;

  beforeEach(() => {
    parent = document.createElement('div');
    Utils.createLoadingPlaceholder(parent);
    elem = parent.firstElementChild;
  });

  it('should be HTMLElement', () => {
    expect(elem).toBeInstanceOf(HTMLElement);
  });

  it('should return an IMG element', () => {
    expect(elem.tagName).toEqual('IMG');
  });

  it('should set "loading..." as alt attribute', () => {
    expect(elem.alt).toEqual('loading...');
  });

  it('should set css class named "load_img"', () => {
    expect(elem.classList.contains('load_img')).toBeTruthy();
  });
});
