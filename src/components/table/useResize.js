import { dom } from '@/core';

export const useResize = (event) => {
  const resizer = dom(event.target);
  const { dataset } = resizer.el;
  if (!dataset?.resize) return;

  const isCol = dataset.resize === 'col';
  const parent = dom(resizer.el.closest('[data-type="resizable"]'));
  const coords = parent.getCoords();
  let position;

  document.onmousemove = (mouseMoveEvent) => {
    if (isCol) {
      const delta = Math.floor(mouseMoveEvent.pageX - (coords.right + window.scrollX));
      position = `${coords.width + delta}px`;
      resizer.css({
        right: `${-delta}px`,
        height: '100vh',
      });
    } else {
      const delta = Math.floor(mouseMoveEvent.pageY - (coords.bottom + window.scrollY));
      position = `${coords.height + delta}px`;
      resizer.css({
        bottom: `${-delta}px`,
        width: '100vw',
      });
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    parent.css(isCol ? { width: position } : { height: position });
    resizer.el.removeAttribute('style');
  };
};
