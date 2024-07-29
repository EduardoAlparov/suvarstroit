import './lazyload';
// import detectTouch from './detectTouch';
import masks from './masks';
import validation from './validation';
import modals from './modals';
import anchorLinks from './anchorLinks';
import accordions from './accordions';
import tabs from './tabs';
import menu from './menu';


import animationsTriggers from './animationsTriggers';

import setScrollbarWidth from './setScrollbarWidth';
import setHeaderPadding from './setHeaderPadding';
import setBreadcrumbsPadding from './setBreadcrumbsPadding';
import setFixedHeader from './setFixedHeader';

import customSelects from './customSelects';
import rangeSlidersDouble from './rangeSlidersDouble';
import selectChoicesTextCollaps from './selectChoicesTextCollaps';

import customCursor from './customCursor';
import homeSwiper from './homeSwiper';

import linkBlockSwiper from './linkBlockSwiper';
import navbarSwitch from './navbarSwitch';
import projectCardSwiper from './projectCardSwiper';
import calcInputRange from './calcInputRange';
import carouselsSwiper from './carouselsSwiper';
import footerMap from './footerMap';
import projectsMap from './projectsMap';
import locationMapsControl from './locationMapsControl';
import dropdownMenuFade from './dropdownMenuFade';
import similarCarousels from './similarCarousels';
import tourWindowToggle from './tourWindowToggle';
import advantagesSwipersControl from './advantagesSwipersControl';
import planBlockControl from './planBlockControl';
import gallerySwiper from './gallerySwiper';
import addingToFavorites from './addingToFavorites';
import youtubeVideoControl from './youtubeVideoControl';

import cardsDropdownToggle from './cardsDropdownToggle';
import sortingSelect from './sortingSelect';
import searchListSwitching from './searchListSwitching';
import fixedFooterSlide from './fixedFooterSlide';
import scrollToTop from './scrollToTop';
import expandLinkControl from './expandLinkControl';
import programsSwiper from './programsSwiper';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {
    // detectTouch();
    setScrollbarWidth();
    masks();
    validation();
    // anchorLinks();
    // accordions();
    modals();
    // tabs();
    // menu();
    setHeaderPadding();
    animationsTriggers();
    setBreadcrumbsPadding();
    setFixedHeader();
    customSelects();
    rangeSlidersDouble();
    selectChoicesTextCollaps();
    homeSwiper();
    linkBlockSwiper();
    navbarSwitch();
    projectCardSwiper();
    calcInputRange();
    carouselsSwiper();
    footerMap();
    projectsMap();
    locationMapsControl();
    dropdownMenuFade();
    customCursor();
    similarCarousels();
    tourWindowToggle();
    advantagesSwipersControl();
    planBlockControl();
    gallerySwiper();
    addingToFavorites();
    // youtubeVideoControl();

    cardsDropdownToggle();
    sortingSelect();
    searchListSwitching();
    fixedFooterSlide();
    scrollToTop();
    expandLinkControl();
    programsSwiper();
});

document.addEventListener('lazyloaded', () => {
    ScrollTrigger.refresh();
});

window.addEventListener('load', function () {
    document.body.classList.add('loaded');
    ScrollTrigger.refresh();
    setTimeout(() => document.body.classList.add('animatable'), 300);
});
