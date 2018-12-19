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
                                        {text: 'Character'},
                                        {text: 'Inventory'},
                                        {text: 'Data'},
                                        {text: 'News'},
                                    ]}>
                                    </Navbar>
                                    <PerfectScrollbar
                                        option={{
                                            wheelPropagation: false
                                        }}
                                    >
                                        <ItemList items={
                                            [
                                                {a: 1},
                                                {a: 2},
                                                {a: 3},
                                                {a: 4},
                                                {a: 5},
                                                {a: 6},
                                                {a: 7},
                                                {a: 8},
                                                {a: 9},
                                                {a: 10},
                                                {a: 11},
                                                {a: 12}
                                            ]
                                        } />
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
