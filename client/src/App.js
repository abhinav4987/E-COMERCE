import {BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css';
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
  NewProduct
} from './components'
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from "react-redux";
import UserOptions from './components/Header/UserOptions';
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if(isAuthenticated) {
    console.log("hello");
  } else {
    console.log("bye");
  }
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

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

        <ProtectedRoute 
          isAdmin={true}
          path="/admin/dashboard"
          component={Dashboard}
          exact
        />

        <ProtectedRoute 
          isAdmin={true}
          path="/admin/product"
          component={NewProduct}
          exact
        />
      </Switch>
      <Footer />
    </Router>
  )

}

export default App;
