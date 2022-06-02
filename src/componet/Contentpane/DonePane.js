import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Divider, Header, HeaderContent, Icon, Segment } from 'semantic-ui-react';
import firebase from '../../firebase'
import { serefreshWorkDateDataId } from '../../redux/workDate/workDateAction';

class DonePane extends Component {
    state ={
        workRef: firebase.database().ref('works')
    }

    handleDeleteWork = (work)=>{
        const {workRef} = this.state
        const {workDateId}  = this.props

        workRef
            .child(workDateId)//id ngoài
            .child(work.id)//id trong
            .remove()
            .then(()=>{
                this.props.serefreshWorkDateDataId(Math.random())
            }).catch(err=>{console.log(err)})

    }

    render() {
        return (
            <>
                <Segment stackable>
                    <Header>
                        <Icon name='calendar check outline' color='green'></Icon>
                        <HeaderContent>DONE</HeaderContent>
                    </Header>
                    <Divider></Divider>

                    {this.props.doneWorks 
                && this.props.doneWorks.map((item) => 
                    
                    (<Segment attached clearing key={item.id}>
                    {item.name}
                    <Button
                        icon='trash alternate' inverted
                        color='red' floated='right' size='tiny'
                        onClick={()=> this.handleDeleteWork(item)}
                    ></Button>
                    
                </Segment>)
                )
                }
                </Segment>
            </>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) =>({
    serefreshWorkDateDataId:(id) => {dispatch(serefreshWorkDateDataId(id))}
  }) 

export default connect(mapStateToProps, mapDispatchToProps)(DonePane)
