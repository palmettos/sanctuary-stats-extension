import * as React from 'react';
import './VideoOverlay.scss';
import {Transition} from 'react-transition-group';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { INavigation, Navigation } from './Navigation';
import { Inventory } from './Inventory';


export enum Page {
    Attributes = 'Attributes',
    Skills = 'Skills',
    Inventory = 'Inventory'
}

export enum Endpoint {
    Attributes = '/attributes',
    Skills = '/skills',
    Items = '/items'
}

interface APIEndpointState {
    updateRequired: boolean,
    updating: boolean
}

interface VideoOverlayState {
    page: Page,
    endpoints: {[index: string]: APIEndpointState}
}

interface IAPIDataStore {
    store: object,
    getDataFromEndpoint(endpoint: string): void
}

export class VideoOverlay
    extends React.Component<{}, VideoOverlayState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            page: Page.Inventory,
            endpoints: {
                [Endpoint.Attributes]: {
                    updateRequired: true,
                    updating: false
                },
                [Endpoint.Skills]: {
                    updateRequired: true,
                    updating: false
                },
                [Endpoint.Items]: {
                    updateRequired: true,
                    updating: false
                },
            }
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

        let pageComponent: JSX.Element;
        switch (this.state.page) {
            case Page.Inventory:
                pageComponent = <Inventory />;
                break;
            default:
                pageComponent = <div className='placeholder'>{'some other component'}</div>;
        }

        return (
            <div id='wrapper'>
                <div id='vertical-spacer-top' />
                <div id='overlay'>
                    <Navigation {...navProps} />
                    <div id='page-content-container'>
                        {pageComponent}
                    </div>
                </div>
                <div id='vertical-spacer-bottom' />
            </div>
        );
    }
}
