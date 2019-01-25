import * as React from 'react';
import './VideoOverlay.scss';
import {Transition} from 'react-transition-group';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { INavigation, Navigation } from './Navigation';
import { PageContent } from './PageContent';


export enum Page {
    Inventory = 'Inventory',
    Attributes = 'Attributes',
    Skills = 'Skills'
}

interface VideoOverlayState {
    page: Page
}

export class VideoOverlay
    extends React.Component<{}, VideoOverlayState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            page: Page.Inventory
        };
    }

    render() {
        console.log('in VideoOverlay.render');
        let currentPage: string = Page[this.state.page];
        console.log('state.page = ' + currentPage);

        let navProps: INavigation = {
            activePage: this.state.page,
            pages: {
                [Page.Attributes]: (e: React.MouseEvent<HTMLElement>) => {
                    this.setState({page: Page.Attributes})
                },
                [Page.Skills]: (e: React.MouseEvent<HTMLElement>) => {
                    this.setState({page: Page.Skills})
                },
                [Page.Inventory]: (e: React.MouseEvent<HTMLElement>) => {
                    this.setState({page: Page.Inventory})
                }
            }
        };

        return (
            <div id='wrapper'>
                <div id='vertical-spacer-top' />
                <div id='overlay'>
                    <Navigation {...navProps} />
                    <PageContent page={this.state.page}></PageContent>
                </div>
                <div id='vertical-spacer-bottom' />
            </div>
        );
    }
}
