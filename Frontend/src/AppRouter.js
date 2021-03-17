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



function AppRouter (props) {


        return (
            <> 
                <Route path="/company/newcompany" component={NewCompany} />


               
                
                
            </>
        );
    
}
export default withRouter(AppRouter);
