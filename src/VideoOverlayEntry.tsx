import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {VideoOverlay} from './components/VideoOverlay';
import './root.scss';
import './normalize.css';


interface ExtendedWindow extends Window {
    Twitch: any;
}

let localWindow: ExtendedWindow = window as ExtendedWindow;
let ext: any = localWindow.Twitch.ext;

ext.onAuthorized(
    (auth: any) => {console.log(auth.clientId)}
);

ext.onContext(
    (context: any, changed: string[]) => {
        console.log(context);
        console.log(changed);
    }
);

ext.listen(
    'broadcast',
    (target: string, contentType: string, message: string) => {
        console.log(message);
    }
)

ReactDOM.render(
    <VideoOverlay />,
    document.getElementById('root')
);
