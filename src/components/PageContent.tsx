import * as React from 'react';
import { Page } from './VideoOverlay';
import './PageContent.scss';


interface PageContentProps {
    page: Page
}

interface AttributesPageProps {

}

interface SkillsPageProps {

}

interface InventoryPageProps {

}

export const PageContent: React.SFC<PageContentProps> = (props) => {
    let content: JSX.Element;
    switch (props.page) {
        case Page.Attributes:
            content = <Attributes />;
            break;
        case Page.Skills:
            content = <Skills />;
            break;
        case Page.Inventory:
            content = <Inventory />;
            break;
        default:
            content = <div id='page-content-missing'></div>;
    }
    
    return (
        <div id='page-content-container'>
            {content}
        </div>
    );
}


class Attributes extends React.Component<AttributesPageProps> {
    render() {
        return (
            <div id='page-component-attributes'>{'Attributes component'}</div>
        )
    }
}


class Skills extends React.Component<SkillsPageProps> {
    render() {
        return (
            <div id='page-component-skills'>{'Skills component'}</div>
        )
    }
}


class Inventory extends React.Component<InventoryPageProps> {
    render() {
        return (
            <div id='page-component-inventory'>{'Inventory component'}</div>
        )
    }
}
