import * as React from 'react';
import {Transition} from 'react-transition-group';
import './item_list.scss';

type Item = {
    a: number
}

type ItemListProps = {
    readonly items: Array<Item>;
}

export class ItemList extends React.Component<ItemListProps, {}> {

    constructor(props: ItemListProps) {
        super(props);
    }

    render() {
        console.log('rendering ItemList');
        let items = this.props.items.map(
            (item, index) => {
                return (
                    <div className='item-button' key={index}>
                        {'item' + item.a}
                    </div>
                );
            }
        )
        return items;
    }

}
