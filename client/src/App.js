import {BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css';
import  Header  from './components/Header'
import {Footer,Home,LoginSignUp} from './components'
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginSignUp} />
      </Switch>
      <Footer />
    </Router>
  )

}

export default App;
