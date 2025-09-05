import 'zone.js';
import { NgZone } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

// Force Zone.js usage
console.log(NgZone);

const bootstrap = () => bootstrapApplication(App, config);

export default bootstrap;