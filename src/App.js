import React, { Component } from 'react';
// import BurgerBuilder from '../../../14.1 burger-basics--02-after-ingredients/burger-basics--02-after-ingredients/src/containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
/* import ContactData from './containers/Checkout/ContactData/ContactData';
 */
class App extends Component {
  state = {
    show: true
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ show: false }) }, 3000)
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
            <Switch>
              {/* <Route path='/Checkout/contact-data' component={ContactData} /> */}

              <Route path='/Checkout'  component={Checkout} />
              <Route path='/Orders' component={Orders} />
              <Route path='/' component={BurgerBuilder} />
              {/* <Route exact path='/' /> */}
              {/* <Redirect from='/' to='/BurgerBuilder' /> */}
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
/*  this.state.show ? : null  */