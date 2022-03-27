import React, { Fragment, useState } from "react";
import HomeContent from '../layout/Home/homeContent'
import HiringIndex from '../layout/Hiring/index'
import Login from '../Login'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Introduce from "../layout/Introduce";
import Register from "../Register";
import UserPage from "../layout/User/user";
import Cart from "../layout/Cart/cart";
import Detail from "../cardetail/cardetail";
import Payment from "../layout/Payment";
import Admin from "../Admin/admin";
import ListCar from "../Admin/list_car";
import ListBill from "../Admin/list-bill";
import AddCar from "../Admin/add_car";
import KPI from "../Admin/KPI";

import RevenueChart from "../Admin/chart/revenue";
import SaledChart from "../Admin/chart/saled";

const Section = () => {

    const token = 'kakaka'
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomeContent}>
                </Route>
                <Route path="/vehicles" component={HiringIndex}>
                </Route>
                <Route path='/detail/:id' component={Detail}>
                </Route>
                <Route exact path="/admin">
                    <Admin com={<KPI/>} />
                </Route>
                <Route exact path="/admin/bill">
                    <Admin com={<ListBill/>} />
                </Route>
                <Route exact path="/admin/revenue-chart">
                    <Admin com={<RevenueChart/>} />
                </Route>
                <Route exact path="/admin/saled-chart">
                    <Admin com={<SaledChart/>} />
                </Route>
                <Route exact path="/admin/vehicle">
                    <Admin com={<ListCar />} />
                </Route>
                <Route exact path="/admin/add-vehicle">
                    <Admin com={<AddCar/>}/>
                </Route>
               <Route path="/login" component={Login}>
                    </Route>
                 <Route path="/sign-up" component={Register}>
                    </Route>
                <Route path='/introduce' component={Introduce}>
                </Route>
                 <Route>
                        <Redirect to="/login" />
                    </Route>
                <Route>
                        <Redirect to="/login" />
                    </Route>
                 <Route>
                        <Redirect to="/login" />
                    </Route>
            </Switch>
        </Router>


    )
}
export default Section;