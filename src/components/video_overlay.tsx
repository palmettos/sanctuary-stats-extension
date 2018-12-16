import * as React from 'react';
import './Test.scss';

interface TestProps {
    test: string;
}

export class Test extends React.Component<TestProps, {}> {
    render() {
        return (
            <div className='test'>
                {this.props.test}
            </div>
        );
    }
}
