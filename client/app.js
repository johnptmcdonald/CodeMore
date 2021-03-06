/* eslint-disable react/display-name */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'
import {me} from './store'
const mapState = ({userReducer}) => ({
  isLoggedIn: !!userReducer.id
})

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me())
})

export default withRouter(
  connect(mapState, mapDispatch)(
    class App extends Component {
      componentDidMount() {
        this.props.loadInitialData()
      }
      render() {
        return (
          <div className={this.props.isLoggedIn ? 'LoggedPage' : 'LandingPage'}>
            <Navbar />
            <Routes />
          </div>
        )
      }
    }
  )
)
