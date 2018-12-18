import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {VideoOverlay} from './components/video_overlay';
import './root.scss';
import './normalize.css';

ReactDOM.render(
    <VideoOverlay testProp='video overlay' />,
    document.getElementById('root')
);
