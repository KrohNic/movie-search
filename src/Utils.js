class Utils {
  static createElem(elem, classes, parent, child) {
    const el = document.createElement(elem);

    if (classes instanceof Array) el.classList.add(...classes);
    else if (typeof classes === 'string') {
      const classesArray = classes.split(' ');

      classesArray.forEach((className) => {
        el.classList.add(className);
      });
    }

    if (child instanceof Array) el.append(...child);
    else if (child) el.append(child);

    if (parent) parent.append(el);

    return el;
  }

  static createLoadingPlaceholder(parent) {
    const loadImg = Utils.createElem('img', 'load_img', parent);
    loadImg.alt = 'loading...';
    loadImg.title = 'loading...';
    loadImg.src = './assets/ico/load.gif';
    parent.append(loadImg);
  }
}

module.exports = Utils;
