import React, { Component } from 'react';
import { DateInput } from 'semantic-ui-calendar-react';
import { connect } from 'react-redux'
import { setWorkDate, setWorkDateData } from '../../redux/workDate/workDateAction';
import firebase from '../../firebase';


class WorkDatePane extends Component {
    state = {
        workDataref: firebase.database().ref('workdates')
    }

    componentDidMount(){
        const now = new Date();

        const day = ('' + (now.getDate() + 100)).substr(1,2)
        const mounth = ('' +((now.getMonth() + 1 ) + 100)).substr(1,2)
        const st = ('' + day + '-' + mounth  + '-' + now.getFullYear())
        console.log(st + 'phatle')

        this.handleWorkDateChange(null, {name:'', value:st})
    }

    handleWorkDateChange = (event, { name, value }) => {
        this.props.setWorkDate(value) //gán lại ngày mới 

        this.state.workDataref ///tìm kiếm ngày trong firebase workdates
            .orderByChild('date')//tìm kiếm theo trường data là date
            .equalTo(value) //so sanhs value được truyền vào
            .once('value') //lắng nghe giá trị vogf lặp for
            .then((snapshot)=>{
                if(snapshot.val()){
                    const data = snapshot.val();
                    const key = Object.keys(data)[0];// lấy phần tử đầu tiên
                    // console.log(key)
                    this.props.setWorkDateData(data[key])
                    // console.log(data )
                }else {
                    console.log('workDateData unconnect')
                    this.props.setWorkDateData(null)
                }
            })

        // console.log(value)  
    }
    render() {
        return (
            <>
                <DateInput
                    name='date' inline placeholder='Date'
                    value={this.props.workDate}//lấy ngày hiện tại
                    onChange={this.handleWorkDateChange}
                ></DateInput>
            </>
        );
    }
}



const mapStateToProps = ({workDate: {workDate,workDateData}}) => ({//liên kết đến store workDate : gọi state workDate trong reducer
   workDate: workDate,
   workDateData:workDateData
})

const mapDispatchToProps = (dispatch) =>({
  setWorkDate: (workDate) => {dispatch(setWorkDate(workDate))},
  setWorkDateData:(data) => {dispatch(setWorkDateData(data))}
}) 
  

export default connect(mapStateToProps, mapDispatchToProps)(WorkDatePane)

