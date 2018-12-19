import * as React from 'react';
import {Transition, TransitionGroup} from 'react-transition-group';
import './item_list.scss';
import anime from 'animejs';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

type Item = {
    a: number
}

type ItemListProps = {
    readonly items: Array<Item>;
}

type ItemListState = {
    readonly show: boolean;
}

export class ItemList extends React.Component<ItemListProps, ItemListState> {

    constructor(props: ItemListProps) {
        super(props);
        this.state = {
            show: true
        }
    }

    animateIn(itemEl: Node) {
        return (
            anime({
                targets: itemEl,
                opacity: [0, 1],
                duration: 1000,
                easing: 'linear',
                complete: () => {
                    itemEl.dispatchEvent(new Event('animationDone'));
                }
            })
        )
    }

    render() {
        console.log('in ItemList.render');
        return (
            // <div id='item-list-wrapper'>
                // {/* <PerfectScrollbar
                //     option={{
                //         wheelPropagation: false
                //     }}
                // > */}
                    <div id='item-list'>
                        <TransitionGroup component={null}>
                            {this.props.items.map(
                                (item, index) => {
                                    return (
                                            <Transition
                                                appear
                                                addEndListener={(node, done) => {
                                                    node.addEventListener('animationDone', done)
                                                }}
                                                onEnter={this.animateIn}
                                                unmountOnExit
                                            >
                                                {
                                                    (state: string) => {
                                                        return (
                                                            <div className='item-button' key={index}>
                                                                {state}
                                                            </div>
                                                        );
                                                    }
                                                }
                                            </Transition>
                                    );
                                }
                                )}
                        </TransitionGroup>
                    </div>
            //     {/* </PerfectScrollbar> */}
            // {/* </div> */}
        );
    }

}
