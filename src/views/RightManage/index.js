import React, { Component } from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import { Tabs } from 'antd';
import Roles from './Roles'
import Rights from './Rights'
const { TabPane } = Tabs;

class Manage extends Component {
  callback=(key) => {
    this.props.history.push(key)
    this.props.sendPath(key)
  }
  
  
  render() {
    console.log(this.props.path);
    
    return (
      <div>
        <Tabs activeKey={'/'+this.props.path} 
          onChange={this.callback}
        >
          <TabPane tab="角色列表"  key="/right-manage/roles" />
          <TabPane tab="权限列表"  key="/right-manage/rights" />
        </Tabs>
        <Switch>
            <Route path="/right-manage/roles" component= {Roles}/>
            <Route path="/right-manage/rights" component= {Rights}/>
            <Redirect from="/right-manage" to="/right-manage/roles"/>
        </Switch>           
      </div>
    )
  }
}
const mapStateToProps = (state) =>{
  return state
}

const mapDispatchToProps = (dispathch) =>{
  return {
    sendPath:(val) =>{
      dispathch({
        type:'path_switch',
        path:val
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Manage))
