import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import SidePane from './sidePane/SidePane';
import firebase from '../firebase';
import { clearUser, setUser } from '../redux/user/userAction';
import { connect } from 'react-redux';
import TopHeaferPane from './Toppane/TopHeaferPane';
import ContentPane from './Contentpane/ContentPane';
import EmptyContentMessage from './Contentpane/EmptyContentMessage';
// import { serefreshWorkDateDataId } from '../redux/workDate/workDateAction';

class App extends Component {

  handleSigout = () => {
    firebase.auth().signOut().then(() => {
      this.props.clearUser(); //call tư store
    })
  }

  render() {
    const {workDate, workDateData,serefreshWorkDateDataId} = this.props
    return (
      <>
        <Grid stretched style={{ background: '#eee' }} stackable>
          <Grid.Column width={4}>
            <SidePane onSignout={this.handleSigout}></SidePane>
          </Grid.Column>

          <Grid.Column width={12} >
            <Grid>
              <Grid.Column width={16}>

                <TopHeaferPane />

              </Grid.Column>
                {this.props.workDateData
                  ? <ContentPane 
                  key={`${workDateData.id}${serefreshWorkDateDataId}`} //các con mà contenpan chưa như ToDOPane,DonePane có thể gọi đến key, workdateId
                  workDateId={workDateData.id} workDate={workDate}
                  />
                   : <EmptyContentMessage 
                   workDate={this.props.workDate}
                   key={workDate}
                   />}

            </Grid>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = ({ users: { loading } , workDate:{workDate,workDateData,serefreshWorkDateDataId}}) => ({//user: in root reducer và lấy loading thường là state
  loading: loading,
  workDate : workDate,
  workDateData: workDateData,//ktra line 37
  serefreshWorkDateDataId: serefreshWorkDateDataId
})

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => { dispatch(setUser(user)) },
  clearUser: () => { dispatch(clearUser()) },
})

export default connect(mapStateToProps,mapDispatchToProps)(App)
