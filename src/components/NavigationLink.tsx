import * as React from 'react';


export interface INavigationLink {
    active: boolean,
    text: string,
    onClick(e: React.MouseEvent<HTMLElement>): void
}

export const NavigationLink: React.SFC<INavigationLink> = (props: INavigationLink) => {
    let activeClass = props.active ? 'nav-active' : 'nav-inactive';
    return (
        <button
            className={'nav-link ' + activeClass}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
}
