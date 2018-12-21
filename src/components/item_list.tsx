import * as React from 'react';
import {Transition, TransitionGroup} from 'react-transition-group';
import './item_list.scss';
import anime from 'animejs';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import SVGInline from 'react-svg-inline';
import svg from '../../public/images/inv.svg';

type ItemDataSchema = {
    readonly properties: Array<String>,
    readonly uniqueName: String,
    readonly baseName: String,
    readonly quality: String,
    readonly location: String
}

type ItemResponseSchema = {
    readonly level: Array<Number>,
    readonly items: Array<Array<ItemDataSchema>>
}

type ItemListState = {
    readonly show: boolean,
    readonly itemState: ItemResponseSchema
    readonly selectedLevel: number
}

type ItemSlotContentProps = {
    readonly itemData: ItemDataSchema
}

const ANIME_END = 'animeEndEvent';

export class ItemList extends React.Component<{}, ItemListState> {

    constructor(props: {}) {
        super({});
        this.state = {
            show: true,
            itemState: {
                level: [],
                items: []
            },
            selectedLevel: -1
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
                    itemEl.dispatchEvent(new Event(ANIME_END));
                }
            })
        );
    }

    componentDidMount() {
        fetch('http://localhost:9000/api/v1/snapshots/items?channel=test_channel&characterName=ewewewwe&characterClass=Assassin')
            .then((response) => {
                return response.json()
            }).then((json) => {
                this.setState({
                    itemState: json
                });
                console.log(json);
            });
    }

    render() {
        console.log('in ItemList.render');
        return (
            <div id='item-list'>
                <TransitionGroup component={null}>
                    {
                        // get the items array for the currently selected level
                        this.state.itemState.items.length > 0 ?
                            this.state.itemState.items.slice(this.state.selectedLevel)[0].map(
                                (item, index) => {
                                    return (
                                        <div className={'item-button'} key={index}>
                                            <SVGInline
                                                svg={svg}
                                                className={'slot-helper ' + item.location}
                                                classSuffix={''}
                                            />

                                            <ItemSlotContent itemData={item}></ItemSlotContent>
                                        </div>
                                    )
                                }
                            )
                        : null
                    }

                    {/* {this.state.itemState.items.map(
                        (item, index) => {
                            return (
                                <Transition
                                    appear
                                    addEndListener={(node, done) => {
                                        node.addEventListener(ANIME_END, done);
                                    }}
                                    onEnter={this.animateIn}
                                    unmountOnExit
                                >
                                    {
                                        (state: string) => {
                                            return (
                                                <div className='item-button' key={index}>
                                                    <SVGInline
                                                        svg={svg}
                                                        className={'slot-helper'}
                                                    />
                                                </div>
                                            );
                                        }
                                    }
                                </Transition>
                            );
                        }
                    )} */}
                </TransitionGroup>
            </div>
        );
    }
}


class ItemSlotContent extends React.Component<ItemSlotContentProps, {}> {
    constructor(props: ItemSlotContentProps) {
        super(props);
    }

    render() {
        return (
            <div className={'item-slot-contents'}>
                <div className={'item-slot-unique-name'}>
                    {this.props.itemData.uniqueName}
                </div>
            </div>
        );
    }
}
