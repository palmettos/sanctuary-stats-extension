import * as React from 'react';


export interface IInventory {

}

interface InventoryState {
    level: number
}

export class Inventory extends React.Component<IInventory, InventoryState> {
    render() {
        return (
            <div className='placeholder'>{'LevelSelector placeholder'}</div>
        );
    }
}
