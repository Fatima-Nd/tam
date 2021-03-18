import React, { component ,useEffect, useState, Suspense  } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Prompt,
    withRouter,
  } from "react-router-dom";
import NewCompany from './company/NewCompany'
import EditCompany from './company/EditCompany'
import ListCompany from './company/ListCompany'



function AppRouter (props) {


        return (
            <> 
                <Route path="/company/listcompany" component={ListCompany} />
                <Route path="/company/newcompany" component={NewCompany} />
                <Route path="/company/editcompany/:id" component={EditCompany} />
                


               
                
                
            </>
        );
    
}
export default withRouter(AppRouter);
