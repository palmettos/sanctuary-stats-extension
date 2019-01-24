import * as React from 'react';
import './Navigation.scss';


export interface INavigationLink {
    active: boolean,
    text: string,
    onClick(e: React.MouseEvent<HTMLElement>): void 
}

interface NavigationProps {
    links: INavigationLink[]
}

export const Navigation: React.SFC<NavigationProps> = (props: NavigationProps) => (
    <div id='navigation-container'>
    {
        props.links.map(
            (link: INavigationLink) => {
                let className: string = link.active? 'nav-active' : 'nav-inactive';
                return (
                    <button
                        className={'nav-link ' + className}
                        key={link.text}
                        onClick={link.onClick}
                    >
                        {link.text}
                    </button>
                );
            }
        )
    }
    </div>
);
