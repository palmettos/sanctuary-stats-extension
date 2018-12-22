import * as React from 'react';
import {Transition, TransitionGroup} from 'react-transition-group';
import './item_list.scss';
import anime from 'animejs';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import SVGInline from 'react-svg-inline';
import svg from '../../public/images/inv.svg';
import normalItems from '../../public/data/normal.json';


type ItemDataSchema = {
    readonly properties: Array<string>,
    readonly uniqueName: string,
    readonly baseName: string,
    readonly quality: string,
    readonly location: string
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

type NormalItemDbObject = {
    readonly id: number,
    readonly type: string,
    readonly uniqueVersion: string,
    readonly setVersion: string,
    readonly itemName: string,
    readonly srcIcon: string,
    readonly requirements: string
}

const ANIME_END = 'animeEndEvent';

const normalItemDb: {[key: string]: NormalItemDbObject} = {};
for (let obj of normalItems) {
    normalItemDb[obj.itemName] = obj;
}

const ITEM_ORDER = [
    'Head',
    'Amulet',
    'PrimaryLeft',
    'SecondaryLeft',
    'BodyArmor',
    'PrimaryRight',
    'SecondaryRight',
    'Gloves',
    'RingLeft',
    'Belt',
    'RingRight',
    'Boots'
]

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
        fetch('http://localhost:9000/api/v1/snapshots/items?channel=test_channel&characterName=test_character&characterClass=Assassin')
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
                                                        <div className={'item-button'} key={index}>
                                                            <SVGInline
                                                                svg={svg}
                                                                className={'slot-helper ' + item.location}
                                                                classSuffix={''}
                                                                />

                                                            <ItemSlotContent itemData={item}></ItemSlotContent>
                                                        </div>
                                                    );
                                                }
                                            }
                                        </Transition>
                                    )
                                }
                            )
                        : null
                    }
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
        console.log(JSON.stringify(this.props.itemData));
        let requirements;
        let iconPath;
        let baseStatSuffix = '';

        try {
            requirements = normalItemDb[this.props.itemData.baseName].requirements;
            requirements = requirements.split('\n');
            iconPath = '../../data/' + normalItemDb[this.props.itemData.baseName].srcIcon;
        } catch (error) {
            requirements = ['No base stats.'];
            baseStatSuffix = '-empty';
            console.log(this.props.itemData.baseName);
            console.log(error);
        }

        let properties: JSX.Element[] = [];
        for (let property of this.props.itemData.properties) {
            properties.push(
                <li className={'item-slot-property'}>
                    {property}
                </li>
            )
        }

        requirements = requirements.map(
            (stat, index) => {
                return (
                    <div className={'item-slot-base-stat' + baseStatSuffix}>
                        {stat}
                    </div>
                )
            }
        );

        return (
            <div className={'item-slot-contents'}>
                <div className={'item-slot-subcontents'}>
                    <div className={'item-slot-subcontents-base-container'}>
                        <div className={'item-slot-icon'}>
                            <img className={'item-slot-icon-img'} src={iconPath}>
                            </img>
                        </div>
                        <div className={'item-slot-base-stat-container-wrapper'}>
                            <div className={'item-slot-unique-name ' + this.props.itemData.quality}>
                                {this.props.itemData.uniqueName}
                            </div>
                            <div className={'item-slot-base-stat-container'}>
                                {requirements}
                            </div>
                            <div className={'item-slot-properties-container'}>
                                {
                                    properties.length > 0 ?
                                        <ul className='item-slot-properties-list'>
                                            {properties}
                                        </ul>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
