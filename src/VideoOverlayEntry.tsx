import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TwitchInterface } from './components/TwitchInterface';
import './root.scss';
import './normalize.css';


export interface ExtensionHelper {
    onAuthorized(callback: Function): void,
    onContext(callback: Function): void,
    onError(callback: Function): void,
    onHighlightChanged(callback: Function): void,
    onPositionChanged(callback: Function): void,
    onVisibilityChanged(callback: Function): void,
    send(target: string, contentType: string, message: Object): void,
    send(target: string, contentType: string, message: string): void,
    listen(target: string, callback: Function): void,
    unlisten(target: string, callback: Function): void
}

interface ExtendedWindow extends Window {
    Twitch: {
        ext: ExtensionHelper
    };
}

let localWindow: ExtendedWindow = window as ExtendedWindow;
let ext: any = localWindow.Twitch.ext;

ReactDOM.render(
    <TwitchInterface ext={ext} />,
    document.getElementById('root')
);
