import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

class UserPane extends Component {
    render() {
        return (
            <>
                <Menu vertical style={{ width: '100%' }}>
                    <Menu.Item name='user'>

                        <Icon name='user cỉcle'></Icon>User
                    </Menu.Item>
                    <Menu.Item name='key'>
                        <Icon name='key'></Icon>Change password
                    </Menu.Item>

                    <Menu.Item name='signout' onClick={this.props.onSignout}>
                        <Icon name='sign out '></Icon>Sign Out
                    </Menu.Item>
                </Menu>
            </>
        );
    }
}

export default UserPane;