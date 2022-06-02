import React, { Component } from 'react';
import { Button, Form, Header, Icon, Input, Modal, ModalActions, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux'
import firebase from '../../firebase';
import { serefreshWorkDateDataId, setWorkDate, setWorkDateData } from '../../redux/workDate/workDateAction';


class TopHeaferPane extends Component {
    state={
        modal:false,
        workname:'',
        workDateRef: firebase.database().ref('workdates'),//taoj dataa workdates
        workRef: firebase.database().ref('works')//taoj dataa workdates
    }

    handleChange = (event)=>{
        const {name, value} = event.target;
        this.setState({[name]:value})
    }
   
    closeModal = () =>{
        this.setState({modal:false})   
    }
    openModal = () =>{
        this.setState({modal:true})
    }

    hanldeSubmit = ()=>{
        //xử lý khi thông tin workDateData đã tồn tại nếu ko chạy vào else
        const { workname,workRef} = this.state
            
        if(this.props.workDateData){
            this.saveWork(this.props.workDateData.id,workname, workRef)//khi nhiều hơn 2 tập con
        }else{
            this.saveWorkDate();
        }
        
    }

    saveWorkDate(){
        if(this.isFormValid(this.state)){
            const {workDateRef, workname,workRef} = this.state
            const {user,workDate} = this.props
            // console.log(user)
            const key = workDateRef.push().key//taoj ra key tuwf push

            const newWorkDate = {
                id: key,
                date: workDate,
                uid: user.uid
            }
            workDateRef.child(key) //truy caapj ddens key vaf ddayr data in firebase
                .update(newWorkDate)//cập nhật thành phần con
                .then(()=>{
                    console.log('success')
                    this.saveWork(key,workname, workRef)// luu công việc
                    // this.props.serefreshWorkDateDataId(Math.random())
                }).catch(err=>{
                    console.log(err)
                })
        }
    }

    saveWork = (key, workname, worksRef) =>{
        //đẩy data gồm key, name vào workRef
        const newwork = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,//xacs ddinhj thowi gian
            name: workname,
            status: 'TODO'
        }

        worksRef
            .child(key)//push key từ workDates
            .push()//vòng key thứ 2 chưa s=hiểu sao sinh ra
            .set(newwork)//setip data
            .then(()=>{
                console.log('save work')

                this.closeModal()
                this.props.serefreshWorkDateDataId(Math.random())
            }).catch(err =>{
                console.log(err)
            })
    }

    isFormValid = ({workname})=> workname
    render() {
        const {modal} = this.state
        const {workDate} = this.props
        return (
            <>
                <Segment clearning>
                    <Header>
                        <Icon name='calendar'></Icon>
                        <Header.Content><h1>{workDate}</h1></Header.Content>
                    </Header>
                    <Button icon='plus' floated='right' onClick={this.openModal}></Button>
                </Segment>

                <Modal basic open={modal} onClose={this.onClose}>
                    <Modal.Header>Add a work</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.hanldeSubmit}>
                            <Form.Field >
                                <Input fluid label='work Name:'
                                name='workname'
                                onChange={this.handleChange}
                                ></Input>
                            </Form.Field>
                        </Form>

                    </Modal.Content>

                    <ModalActions>
                        <Button color='green' inverted 
                        onClick={this.hanldeSubmit}>
                            <Icon name='checkmark'></Icon>Add
                        </Button>
                        <Button color='red' inverted 
                        onClick={this.closeModal}>
                            <Icon name='remove'></Icon>Cancel
                        </Button>
                    </ModalActions>
                </Modal>
            </>
        );
    }
}





const mapStateToProps = ({workDate: {workDate,workDateData}, users: {user}}) => ({//liên kết đến store workDate : gọi state workDate trong reducer;;
    ///liên kết đến store users : gọi state user trong reducer;;
    workDate: workDate,
    workDateData: workDateData,
    user: user,
    
 })

 const mapDispatchToProps = (dispatch) =>({
    setWorkDate: (workDate) => {dispatch(setWorkDate(workDate))},
    setWorkDateData:(data) => {dispatch(setWorkDateData(data))},
    serefreshWorkDateDataId:(id) => {dispatch(serefreshWorkDateDataId(id))}
  }) 
    

export default connect(mapStateToProps,mapDispatchToProps)(TopHeaferPane)

