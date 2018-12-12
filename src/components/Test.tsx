import * as React from 'react';

interface TestProps {
    test: string;
}

export class Test extends React.Component<TestProps, {}> {
    render() {
        return <p>{this.props.test}</p>;
    }
}
