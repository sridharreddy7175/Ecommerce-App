import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserOrder from "./modules/orders/UserOrder";
import { connect } from "react-redux";
import HeaderComponent from "./modules/adminPanel/Header/HeaderComponent";
import UserListpage from "./modules/adminPanel/Header/UserListpage";
import ProductPage from "./modules/adminPanel/Header/ProductPage";
import PrivateRoute from "./modules/auth/PrivateRoute";
import AdminPrivateRoute from "./modules/auth/AdminPrivateRoute";
import Homepage from "./containers/Homepage";
import Shoppage from "./containers/Shoppage";
import Cartpage from "./containers/Cartpage";
import Userdashboardpage from "./containers/Userdashboardpage";
import UserProfilepage from "./containers/UserProfilepage";
import Loginpage from "./containers/Loginpage";
import Registerpage from "./containers/Registerpage";
import Categorypage from "./modules/adminPanel/Header/Categorypage";
import CategoriesListPage from "./modules/adminPanel/Header/CategoriesListPage";
import EditCategoryPage from "./modules/adminPanel/Header/EditCategoryPage";
import ProductsListPage from "./modules/adminPanel/Header/ProductsListPage";
import EditProductPage from "./modules/adminPanel/Header/EditProductPage";
import SignalProductPage from "./containers/SignalProductPage";



function App() {
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" exact component={Loginpage} />
          <Route path="/register" component={Registerpage} />
          <Route path="/shop" component={Shoppage} />
          <Route path="/cart" component={Cartpage} />
          {/* <Route path="/user/dashboard" component={Userdashboardpage} /> */}

          <Route path="/user/dashboard" component={Userdashboardpage} />
          <Route path="/user/profile" component={UserProfilepage} />
          <Route path="/user/order" component={UserOrder} />
          <Route path="/admin/dashboard" component={HeaderComponent} />
          <Route path="/admin/users/list" component={UserListpage} />
          <Route path="/admin/products" component={ProductPage} />
          <Route path="/admin/category" component={Categorypage} />
          <Route path="/admin/categorieslist" component={CategoriesListPage} />
          <Route path="/admin/productslist" component={ProductsListPage} />
          <Route path="/admin/editcategory/:id" component={EditCategoryPage} />
          <Route path="/admin/editproduct/:id" component={EditProductPage} />
          <Route path="/user/product/:id" component={SignalProductPage} />


          {/* <PrivateRoute path="/user/dashboard" component={Userdashboardpage} />
          <PrivateRoute path="/user/profile" component={UserProfilepage} />
          <PrivateRoute path="/user/order" component={UserOrder} /> */}
          {/* <AdminPrivateRoute path="/admin/dashboard" component={HeaderComponent} />
          <AdminPrivateRoute path="/admin/users/list" component={UserListpage} />
          <AdminPrivateRoute path="/admin/products" component={ProductPage} />
          <AdminPrivateRoute path="/admin/category" component={Category} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default connect(
  (state) => ({
    details: state.user,
  }),

  {}
)(App);