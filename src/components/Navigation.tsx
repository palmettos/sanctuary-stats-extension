import * as React from 'react';
import './Navigation.scss';
import { Page } from './VideoOverlay';
import { INavigationLink, NavigationLink } from './NavigationLink'


export interface INavigation {
    activePage: Page,
    pages: {[index: string]: (e: React.MouseEvent<HTMLElement>) => void}
}

export const Navigation: React.SFC<INavigation> = (props: INavigation) => {
    let links: INavigationLink[] = [];
    for (let page in props.pages) {
        let link: INavigationLink = {
            active: page === props.activePage,
            text: page,
            onClick: props.pages[page]
        }
        links.push(link);
    }

    return (
        <div id='navigation-container'>
        {
            links.map((link) => <NavigationLink key={link.text} {...link} />)
        }
        </div>
    );
};
