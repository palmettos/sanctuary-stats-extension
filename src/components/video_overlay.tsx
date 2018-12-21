import * as React from 'react';
import './video_overlay.scss';
import {Transition} from 'react-transition-group';
import {ItemList} from './item_list';
import {Navbar} from './navbar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

type TestProps = {
    readonly testProp: string;
}

type VideoOverlayState = {
    readonly show: boolean,
    readonly entered: boolean
}

export class VideoOverlay extends React.Component<TestProps, VideoOverlayState> {

    constructor(props: TestProps) {
        super(props);
        this.state = {
            show: true,
            entered: false
        }
    }

    render() {
        console.log('in VideoOverlay.render');

        return (
            <div id='wrapper'>
                <div id='vertical-spacer-top' />
                <Transition appear in={this.state.show} timeout={1000} unmountOnExit>
                    {
                        (state: string) => {
                            return (
                                <div id='extension-frame'>
                                    <Navbar links={[
                                        {text: 'Attributes'},
                                        {text: 'Skills'},
                                        {text: 'Inventory'},
                                        {text: 'Other'},
                                        {text: 'News'},
                                    ]}>
                                    </Navbar>
                                    <PerfectScrollbar
                                        option={{
                                            wheelPropagation: false
                                        }}
                                    >
                                        <ItemList />
                                    </PerfectScrollbar>
                                </div>
                            );
                        }
                    }
                </Transition>
                <div id='vertical-spacer-bottom' />
            </div>
        );
    }
}
