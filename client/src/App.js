import { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css';
import axios  from 'axios';
import  Header  from './components/Header'
import {
  Footer,
  Home,
  LoginSignUp,
  Profile,
  UpdateProfile,
  About,
  Contact,
  Search,
  Products,
  ProductDetails,
  Dashboard,
  NewProduct,
  ProductList,
  UpdateProduct,
  Cart,
  Shipping,
  ConfirmOrder,
  Payment,
  OrderSuccess,
  MyOrders,
  OrderDetails,
  OrderList,
  UserList,
  ProcessOrder,
  UpdatePassword,
  UpdateUser,
  ProductReview,
} from './components'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from "react-redux";
import {loadUser} from './redux/actions/user.action'
import UserOptions from './components/Header/UserOptions';
import store from './redux/store'

const baseUrl = "http://localhost:5001";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const config = {
        headers: { 
            "Content-Type": "application/json"
            ,"crossDomain": true
        },
        "withCredentials": true,
      };
      const { data } = await axios.get(baseUrl + "/api/v1/stripeapikey", config);
  
      setStripeApiKey(data.stripeApiKey);
    } catch {
      setStripeApiKey("");
    }
  }

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, [])


  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginSignUp} />
        <Route exact path="/account" component={Profile} />
        <Route exact path="/me/update" component={UpdateProfile} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/Cart" component={Cart} />

        <ProtectedRoute path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/success" component={OrderSuccess} />
        <ProtectedRoute path="/order/confirm" component={ConfirmOrder} />

        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
        <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
        
        <ProtectedRoute 
          isAdmin={true}
          path="/admin/dashboard"
          component={Dashboard}
          exact
        />

        <ProtectedRoute 
          // isAdmin={true}
          path="/admin/product"
          component={NewProduct}
          exact
        />
        <ProtectedRoute
          isAdmin={true}
          path="/admin/products"
          component={ProductList}
        />

        <ProtectedRoute
          isAdmin={true}
          path="/admin/product/:id"
          component={UpdateProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          path="/admin/orders"
          component={OrderList}
        />
        <ProtectedRoute
          isAdmin={true}
          path="/admin/order/:id"
          component={ProcessOrder}
        />
        <ProtectedRoute
          isAdmin={true}
          path="/admin/users"
          component={UserList}
        />
        <ProtectedRoute
          isAdmin={true}
          path="/admin/user/:id"
          component={UpdateUser}
        />
        <ProtectedRoute
          isAdmin={true}
          path="/admin/reviews"
          component={ProductReview}
        />
      </Switch>
      <Footer />
    </Router>
  )

}

export default App;
