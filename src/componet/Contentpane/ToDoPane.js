import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Divider, Header, HeaderContent, Icon, Segment } from 'semantic-ui-react';
import { serefreshWorkDateDataId } from '../../redux/workDate/workDateAction';
import firebase from '../../firebase'

export class ToDoPane extends Component {

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

    handleUpdateStaus = (work)=>{
        const {workRef}  =this.state;
        const {workDateId,serefreshWorkDateDataId} =this.props;

        workRef.child(workDateId)//rtry vấn vào works vs 2 mã id ngoài
            .child(work.id)
            .update({
                name: work.name,
                status: 'DONE',
                timestamp: firebase.database.ServerValue.TIMESTAMP

            }).then((updateWork)=>{
                console.log(updateWork);
                serefreshWorkDateDataId(Math.random())
            }).catch(err=> {console.log(err)
        })
    }

    render() {
        
        // console.log(this.props.toDoWorks.lenght) undefined khi trỏ đến lennght
        console.log(this.props.key)
        return (
            <>
                <Segment stackable>
                    <Header>
                        <Icon name='bell' color='red'></Icon>
                        <HeaderContent>TO_DO</HeaderContent>
                    </Header>
                    <Divider></Divider>

                {this.props.toDoWorks 
                && this.props.toDoWorks.map((item) => 
                    (<Segment attached clearing key= {item.id}>
                    {item.name}
                    <Button
                        icon='trash alternate' inverted
                        color='red' floated='right' size='tiny'
                        onClick={()=> this.handleDeleteWork(item)}
                    ></Button>
                    <Button
                        icon='checkmark' inverted
                        color='green' floated='right' size='tiny'
                        onClick={()=> this.handleUpdateStaus(item)}
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

  export default connect(mapStateToProps, mapDispatchToProps)(ToDoPane)
