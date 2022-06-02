import React, { Component } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import DonePane from './DonePane';
import ToDoPane from './ToDoPane';
import firebase from '../../firebase';
import Spinner from '../UI/Spinner';
import EmptyContentMessage from './EmptyContentMessage';

class ContentPane extends Component {
    state = {
        worksRef : firebase.database().ref('works'),
        workDateId: this.props.workDateId,
        toDoWorks:[],
        loading: true,
        doneWorks:[],
        hasWork:true
    }

    componentDidMount(){
        // console.log('addListenner')
        const {workDateId} = this.state
        if(workDateId) this.addListenner(workDateId) //thực hiện trên 1 dòng
        
    }


    componentWillUnmount(){//componentWillUnmount thực hiện khi thành phần hủy nạp
        this.removeListeners()
    }

    removeListeners = ()=>{
        this.state.worksRef.off();//hủy bỏ lắng nghe sự kiện worksRef
    }

    addListenner = (workDateId) =>{
        let toDoWorks = []; //dsach công việc 
        let doneWorks = [];

        const {worksRef} = this.state;
        // console.log('addListenner')
        worksRef.child(workDateId).on('child_added',(snap)=>{
            // console.log(snap.val());// on là lấy gái trị chi tiết thahf phần con
            // const key = Math.random()
            this.retreveworks(snap.val(), snap.key,toDoWorks,doneWorks);
        })

        worksRef.child(workDateId).once('value',(snap)=>{//kiem tra thành phần tập con còn hay ko
            if(snap.numChildren() === 0){
                this.setState({hasWork: false,loading:false})
            }else{
                this.setState({hasWork:true})
            }
        })
    }

    retreveworks = (work, key,toDoWorks,doneWorks) =>{
            if(work.status ==='TODO'){
                toDoWorks.push({id:key, ...work});
            }else{
                doneWorks.push({id:key, ...work});// đảy công việc hoàn thành vào doneWork
            }

        this.setState({
            toDoWorks:toDoWorks,
            doneWorks:doneWorks,
            loading:false //giữ lại  gia trị 
        })

        // console.log(toDoWorks + '12313')
    }



    render() {
    //    console.log(this.state.toDoWorks)
       
       const {loading, workDateId,toDoWorks, doneWorks,hasWork} = this.state
        return (
            <>
            
            { loading && (<Spinner/>) } 
             {hasWork &&  (<Grid.Row>
                    <GridColumn width={8}>
                        <ToDoPane key={`t${toDoWorks.length}`} toDoWorks={toDoWorks} workDateId={workDateId}/>
                    </GridColumn>

                    <GridColumn width={8}>
                         <DonePane key={`t${doneWorks.length}`} doneWorks={doneWorks} workDateId={workDateId}/>
                    </GridColumn>
                </Grid.Row>)
            }
            {
                !hasWork&& <EmptyContentMessage workDate={this.props.workDate}/>
            }
            </>
        );
    }
}
// { loading && (<Spinner/>) }  nếu true thì 
export default ContentPane;