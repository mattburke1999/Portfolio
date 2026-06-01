import type { Component } from 'svelte';

export type ModalFadeStates = 'fadeInModal' | 'fadeOutModal' | undefined;
export type StackItemFadeStates = 'fadeIn' | 'fadeOut' | undefined;

export type Modal = {
    name: string;
    title: string;
    img: string;
    fadeDir: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
    color: string;
    modal: Component<any>;
    props?: Record<string, unknown>;
}