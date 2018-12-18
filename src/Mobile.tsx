import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {VideoOverlay} from './components/video_overlay';
import './root.scss';

ReactDOM.render(
    <VideoOverlay testProp='mobile' />,
    document.getElementById('root')
);
