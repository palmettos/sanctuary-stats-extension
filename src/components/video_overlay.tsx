import * as React from 'react';
import './video_overlay.scss';
import {Transition} from 'react-transition-group';
import {ItemList} from './item_list';

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
        console.log('in render');

        let innerContent = (
            <div id='content'>

            </div>
        );

        return (
            <div id='container'>
                <Transition appear in={this.state.show} timeout={1000} unmountOnExit>
                    {
                        (state: string) => {
                            return (
                                <div id='content'>
                                    <ItemList items={[{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5},]} />
                                </div>
                            );
                        }
                    }
                </Transition>
            </div>
        );
    }
}
