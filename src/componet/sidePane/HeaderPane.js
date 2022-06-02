import React, { Component } from 'react';
import { Header, Icon } from 'semantic-ui-react';

class HeaderPane extends Component {
    render() {
        return (
            <div>
                <Header >
                    <Icon name='task' />worklist
                </Header>
            </div>
        );
    }
}

export default HeaderPane;