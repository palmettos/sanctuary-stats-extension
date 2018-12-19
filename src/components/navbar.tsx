import * as React from 'react';
import {Transition, TransitionGroup} from 'react-transition-group';
import anime from 'animejs';
import './navbar.scss';

type Link = {
    text: string
}

type LinkProps = {
    links: Link[]
    //callback: Function
}

export class Navbar extends React.Component<LinkProps, {}> {

    constructor(props: LinkProps) {
        super(props);
    }

    render() {
        return (
            <div id='navbar'>
                {this.props.links.map((link) => {
                    return <span className='navbar-item'>{link.text}</span>;
                })}
            </div>
        );
    }
}
