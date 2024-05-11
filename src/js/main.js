import './lazyload';
import detectTouch from './detectTouch';
import masks from './masks';
import validation from './validation';
import anchorLinks from './anchorLinks';
import accordions from './accordions';
import modals from './modals';
import tabs from './tabs';
import menu from './menu';

import setScrollbarWidth from './setScrollbarWidth';
import setHeaderPadding from './setHeaderPadding';
import customSelects from './customSelects';
import rangeSlidersDouble from './rangeSlidersDouble';
import selectChoicesTextCollaps from './selectChoicesTextCollaps';
import homeSwiper from './homeSwiper';
import navbarSwitch from './navbarSwitch';
import projectCardSwiper from './projectCardSwiper';
import calcInputRange from './calcInputRange';
import carouselsSwiper from './carouselsSwiper';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {
    // detectTouch();
    // setScrollbarWidth();
    masks();
    validation();
    // anchorLinks();
    // accordions();
    // modals();
    // tabs();
    // menu();
    setHeaderPadding();
    customSelects();
    rangeSlidersDouble();
    selectChoicesTextCollaps();
    homeSwiper();
    navbarSwitch();
    projectCardSwiper();
    calcInputRange();
    carouselsSwiper();
});

document.addEventListener('lazyloaded', () => {
    ScrollTrigger.refresh();
});

window.addEventListener('load', function () {
    document.body.classList.add('loaded');
    ScrollTrigger.refresh();
    setTimeout(() => document.body.classList.add('animatable'), 300);
});
