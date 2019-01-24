import * as React from 'react';
import './VideoOverlay.scss';
import {Transition} from 'react-transition-group';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {INavigationLink, Navigation} from './Navigation';
import { PageContent } from './PageContent';


export enum Page {
    Inventory,
    Attributes,
    Skills
}

interface VideoOverlayState {
    page: Page
}

interface IVideoOverlay {
    navData: {[index: string]: Page},
    navLinks: INavigationLink[]
}

export class VideoOverlay
    extends React.Component<{}, VideoOverlayState>
    implements IVideoOverlay {

    navLinks: INavigationLink[];
    navData: {[index: string]: Page};

    constructor(props: {}) {
        super(props);
        this.state = {
            page: Page.Inventory
        };

        this.navLinks = [];
        this.navData = {
            Inventory: Page.Inventory,
            Attributes: Page.Attributes,
            Skills: Page.Skills
        };
    }

    render() {
        console.log('in VideoOverlay.render');
        let currentPage: string = Page[this.state.page];
        console.log('state.page = ' + currentPage);

        this.navLinks = [];
        for (let text in this.navData) {
            let page = this.navData[text];
            let cb = (e: React.MouseEvent<HTMLElement>): void => {this.setState({page})};
            let props: INavigationLink = {
                active: this.state.page === this.navData[text] ? true: false, 
                text,
                onClick: cb
            }
            this.navLinks.push(props);
        }

        return (
            <div id='wrapper'>
                <div id='vertical-spacer-top' />
                <div id='overlay'>
                    <Navigation links = {this.navLinks} />
                    <PageContent page={this.state.page}></PageContent>
                </div>
                <div id='vertical-spacer-bottom' />
            </div>
        );
    }
}
