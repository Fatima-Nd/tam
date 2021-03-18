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
import DetailCompany from './company/DetailCompany'

import NewBranch from './branches/NewBranch'
import Settings from './settings/Settings'


function AppRouter (props) {


        return (
            <> 
                <Route path="/company/listcompany" component={ListCompany} />
                <Route path="/company/newcompany" component={NewCompany} />
                <Route path="/company/editcompany/:id" component={EditCompany} />
                <Route path="/company/detailcompany/:id" component={DetailCompany} />

                <Route path="/branch/newbranch" component={NewBranch} />
                <Route path="/settings" component={Settings} />
                


               
                
                
            </>
        );
    
}
export default withRouter(AppRouter);
