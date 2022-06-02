import React, { Component } from 'react';
import { DateInput } from 'semantic-ui-calendar-react';
import { Button, Divider, Grid, GridColumn, GridRow, Header, HeaderContent, Icon, Menu, Segment } from 'semantic-ui-react';

class Home extends Component {
    state={
        date:''
    }

    handleWorkDateChange = (event,{name, value}) =>{
        console.log(value)
    }
    render() {
        return (
            <>
                <Grid stretched style={{ background: '#eee' }} stackable>
                    <Grid.Column width={4}>
                        <Segment>
                            <Header >
                                <Icon name='task' />worklist
                            </Header>
                            <Divider></Divider>

                            <Menu vertical style={{ width: '100%' }}>
                                <Menu.Item name='user'>

                                    <Icon name='user cỉcle'></Icon>User
                                </Menu.Item>
                                <Menu.Item name='key'>
                                    <Icon name='key'></Icon>Change password
                                </Menu.Item>

                                <Menu.Item name='signout'>
                                    <Icon name='sign out '></Icon>Sign Out
                                </Menu.Item>
                                <Divider></Divider>

                                <DateInput
                                name='date' inline placeholder='Date'
                                value={this.state.date}
                                onChange={this.handleWorkDateChange}
                                ></DateInput>


                            </Menu>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column width={12}>
                        <Grid>
                            <Grid.Column width={16}>
                                <Grid.Row>
                                    <Segment clearning>
                                        <Header>
                                            <Icon name='calendar'></Icon>
                                            <Header.Content><h1>date:12/07/2022</h1></Header.Content>
                                        </Header>
                                        <Button icon='plus' floated='right'></Button>
                                    </Segment>
                                </Grid.Row>
                                    <Divider></Divider>


                                <GridRow>
                                    <Grid>
                                        <GridColumn width={8}>
                                            <Segment stackable>
                                                <Header>
                                                    <Icon name='bell' color='red'></Icon>
                                                    <HeaderContent>TO_DO</HeaderContent>
                                                </Header>
                                                <Divider></Divider>
                                                <Segment attached clearing>
                                                    Do Home Work
                                                    <Button
                                                    icon='trash alternate' inverted
                                                    color='red' floated='right' size='tiny'
                                                    ></Button>
                                                    <Button
                                                    icon='checkmark' inverted
                                                    color='green' floated='right' size='tiny'
                                                    ></Button>
                                                </Segment>
                                                <Segment attached clearing>
                                                    Do Home Work
                                                    <Button
                                                    icon='trash alternate' inverted
                                                    color='red' floated='right' size='tiny'
                                                    ></Button>
                                                    <Button
                                                    icon='checkmark' inverted
                                                    color='green' floated='right' size='tiny'
                                                    ></Button>
                                                </Segment>
                                                <Segment attached clearing>
                                                    Do Home Work
                                                    <Button
                                                    icon='trash alternate' inverted
                                                    color='red' floated='right' size='tiny'
                                                    ></Button>
                                                    <Button
                                                    icon='checkmark' inverted
                                                    color='green' floated='right' size='tiny'
                                                    ></Button>
                                                </Segment>
                                                <Segment attached clearing>
                                                    Do Home Work
                                                    <Button
                                                    icon='trash alternate' inverted
                                                    color='red' floated='right' size='tiny'
                                                    ></Button>
                                                    <Button
                                                    icon='checkmark' inverted
                                                    color='green' floated='right' size='tiny'
                                                    ></Button>
                                                </Segment>

                                            </Segment>
                                        </GridColumn>

                                        <GridColumn width={8}>
                                            <Segment stackable>
                                                <Header>
                                                    <Icon name='calendar check outline' color='green'></Icon>
                                                    <HeaderContent>DONE</HeaderContent>
                                                </Header>
                                                <Divider></Divider>
                                                <Segment attached clearing>
                                                    Do Home Work
                                                    <Button
                                                    icon='trash alternate' inverted
                                                    color='red' floated='right' size='tiny'
                                                    ></Button>
                                                    <Button
                                                    icon='checkmark' inverted
                                                    color='green' floated='right' size='tiny'
                                                    ></Button>
                                                </Segment>
                                                <Segment attached clearing>
                                                    Do Home Work
                                                    <Button
                                                    icon='trash alternate' inverted
                                                    color='red' floated='right' size='tiny'
                                                    ></Button>
                                                    <Button
                                                    icon='checkmark' inverted
                                                    color='green' floated='right' size='tiny'
                                                    ></Button>
                                                </Segment>
                                                <Segment attached clearing>
                                                    Do Home Work
                                                    <Button
                                                    icon='trash alternate' inverted
                                                    color='red' floated='right' size='tiny'
                                                    ></Button>
                                                    <Button
                                                    icon='checkmark' inverted
                                                    color='green' floated='right' size='tiny'
                                                    ></Button>
                                                </Segment>
                                                <Segment attached clearing>
                                                    Do Home Work
                                                    <Button
                                                    icon='trash alternate' inverted
                                                    color='red' floated='right' size='tiny'
                                                    ></Button>
                                                    <Button
                                                    icon='checkmark' inverted
                                                    color='green' floated='right' size='tiny'
                                                    ></Button>
                                                </Segment>

                                            </Segment>
                                        </GridColumn>
                                    </Grid>
                                </GridRow>
                                

                            </Grid.Column>
                        </Grid>
                    </Grid.Column>

                    

                </Grid>


            </>
        );
    }
}

export default Home;