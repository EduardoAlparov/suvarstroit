export function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}

export function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function closestEdge(mouse, elem) {
    var elemBounding = elem.getBoundingClientRect();

    var elementLeftEdge = elemBounding.left;
    var elementRightEdge = elemBounding.right;

    var mouseX = mouse.pageX;
    var mouseY = mouse.pageY;

    var leftEdgeDist = Math.abs(elementLeftEdge - mouseX);
    var rightEdgeDist = Math.abs(elementRightEdge - mouseX);

    var min = Math.min(leftEdgeDist,rightEdgeDist);

    switch (min) {
      case leftEdgeDist:
        return "left";
      case rightEdgeDist:
        return "right";
    }
}

export const IS_MOBILE = window.matchMedia('(max-width: 768px)').matches;
export const IS_TABLET = window.matchMedia('(max-width: 1024px)').matches;
