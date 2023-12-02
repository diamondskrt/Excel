import { dom } from '@/core';

export const useResize = (resizer, dataset) => new Promise((resolve) => {
  const isCol = dataset.resize === 'col';
  const parent = dom(resizer.el.closest('[data-type="resizable"]'));
  const coords = parent.getCoords();
  let size;

  document.onmousemove = (mouseMoveEvent) => {
    if (isCol) {
      const delta = Math.floor(mouseMoveEvent.pageX - (coords.right + window.scrollX));
      size = `${coords.width + delta}px`;
      resizer.css({
        right: `${-delta}px`,
        height: '100vh',
      });
    } else {
      const delta = Math.floor(mouseMoveEvent.pageY - (coords.bottom + window.scrollY));
      size = `${coords.height + delta}px`;
      resizer.css({
        bottom: `${-delta}px`,
        width: '100vw',
      });
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    parent.css(isCol ? { width: size } : { height: size });
    resizer.el.removeAttribute('style');

    resolve({
      id: parent.el.textContent.trim(),
      size,
    });
  };
});
