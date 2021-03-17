/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect , useRef } from 'react';
import { Link } from 'react-router-dom';
import { TieredMenu } from 'primereact/tieredmenu';
import axios from "axios";
import translate from './i18n/translate';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {Button} from 'primereact/button'
import { Sidebar } from 'primereact/sidebar';
import classNames from 'classnames'


export function AppTopbar(props) {
  
    const [visibleRight, setVisibleRight] = useState(false);
    const [active , setActive] = useState(false)
    
    const configClassName = classNames('layout-config', {
        'layout-config-active': active
    });
   
  
    const[accounting,setaccounting] = useState(true)
    const [acc, setacc] = useState(true)
    const [cms, setcms] = useState(false)
    const [crm, setcrm] = useState(false)
    const [stock, setstock] = useState(false)
    const menu = useRef(null);
    const items = [
        {
           
            items: [
                {
                    label: 'Categories',
                    
                  
                    command:(e) => {
                        window.location = '/stock/category'
                    }
                },
     
            ]
        },
    ]
    const financials = [
        {
           
            items: [
                {
                    label: 'Payment Voucher',
                    
                  
                    command:(e) => {
                        window.location = '/stock/category'
                    }
                },
                {
                    label: 'Receipt Voucher',
                    
                  
                    command:(e) => {
                        window.location = '/accounting/receiptvoucher'
                    }
                },
     
            ]
        },
    ]
    
   
 
    const countries = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];
    useEffect(() => {
       
     

    }, []);

    const toggleSidebar = () => {
        var element = document.getElementById("userSideBar");
        element.classList.toggle("layout-config-active");
    } 
  
    const AccHeader = () => {
        setaccounting(true)
        setacc(true)
        setcms(false)
        setcrm(false)
        setstock(false)

    }

    const CmsHeader = () => {
        setaccounting(false)
        setcms(true)
        setacc(false)
        setcrm(false)
        setstock(false)

    }

    const CrmHeader = () => {
        setaccounting(false)
        setcrm(true)
        setacc(false)
        setcms(false)
        setstock(false)

    }
    const StockHeader = () => {
        setaccounting(false)
        setstock(true)
        setcrm(false)
        setacc(false)
        setcms(false)

    }

   

 
    return (
        <div className="layout-topbar">

          
            <div className="topbar-menu-left">
                <ul className="topbar-menu p-unselectable-text">
                    <li role="none" className={accounting ? "topbar-submenu active " : "topbar-submenu"} >
                        {/* eslint-disable */}
                        <NavLink to='/accounting/companyprofile' onClick={AccHeader}>{translate('Accounting')}</NavLink>
                        {/* eslint-enable */}
                        <ul role="menu" aria-label="Resources" className={acc ? "submenu active" : "submenu"}>
                            <li><NavLink to="/accounting/dashboard" activeStyle={{}}>{translate('Dashboard')}</NavLink></li>
                           <li><NavLink to="/accounting/chartofaccount" activeStyle={{}}>{translate('Chart of Account')}</NavLink></li> 
                           <li><NavLink to="/accounting/customer" activeStyle={{}}><span>{translate('Customer')}</span></NavLink></li> 
                            <li><NavLink to="/accounting/supplier" activeStyle={{}}><span>{translate('Supplier')}</span></NavLink></li> 
                            <li><NavLink  to="/accounting/transactions/TableGeneralVoucher/" activeStyle={{}}><span>{translate('General Voucher')}</span></NavLink></li> 
                        </ul>
                    </li>
                    <li role="none" className={window.location.href.indexOf("cms") > -1 ? "topbar-submenu active" : "topbar-submenu"}>
                        {/* eslint-disable */}
                        <NavLink to='/cms/dashboard' onClick={CmsHeader} >{translate('CMS')}</NavLink>
                        {/* eslint-enable */}
                        <ul role="menu" aria-label="Resources" className={cms ? "submenu active" : "submenu"}>
                            <li><NavLink to="/cms/dashboard" role="menuitem"><span>{translate('Dashboard')}</span></NavLink></li>
                            <li><NavLink to="/cms/contract" role="menuitem"><span>{translate('Contract')}</span></NavLink></li>
                            <li><NavLink to="/cms/counterparty" role="menuitem" ><span>{translate('Counterparty')}</span></NavLink></li>
                            <li><NavLink to="/cms/vendor" role="menuitem"><span>{translate('Vendor')}</span></NavLink></li>
                            <li><NavLink to="/cms/item" role="menuitem"><span>{translate('Item')}</span></NavLink></li>
                        </ul>
                    </li>

                    <li role="none" className={window.location.href.indexOf("crm") > -1 ? "topbar-submenu active" : "topbar-submenu"}>
                        {/* eslint-disable */}
                        <NavLink to='/crm/dashboard' onClick={CrmHeader} >{translate('CRM')}</NavLink>
                        {/* eslint-enable */}
                        <ul role="menu" aria-label="Resources" className={crm ? "submenu active " : "submenu"}>
                            <li><NavLink to="/crm/dashboard" role="menuitem" activeStyle={{}}><span>Dashboard</span></NavLink></li>
                            <li><NavLink to="/crm/lead" role="menuitem" activeStyle={{}}><span>Leads</span></NavLink></li>
                            <li><NavLink to="/crm/deal" role="menuitem" activeStyle={{}}><span>Deals</span></NavLink></li>
                            <li><NavLink to="/crm/contact/listcontact" role="menuitem" activeStyle={{}}><span>Contacts</span></NavLink></li>
                            <li><NavLink to="/crm/accounts/listaccount" role="menuitem" activeStyle={{}}><span>Accounts</span></NavLink></li>
                        </ul>
                    </li>
                    <li role="none" className={window.location.href.indexOf("stock") > -1 ? "topbar-submenu active" : "topbar-submenu"}>
                        <NavLink to='/stock/dashboard' onClick={StockHeader} >{translate('Stock Control')}</NavLink>
                        <ul role="menu" aria-label="Resources" className={stock ? "submenu active " : "submenu"}>
                            <li><NavLink to="/stock/item" role="menuitem" activeStyle={{}}><span>Items</span></NavLink></li>
                            <li><NavLink to="/stock/warehouse" role="menuitem" activeStyle={{}}><span>WareHouse</span></NavLink></li>
                            <li><NavLink to="/stock/category" role="menuitem" activeStyle={{}}><span>Category</span></NavLink></li>
                        </ul>
                    </li>
            
                </ul>
                
            </div>

            <div className="topbar-menu-right" >

                <div className="globe">
               
                    {props.template}
                    
                    {/*  <Dropdown value={selectedCountry} options={countries} onChange={onCountryChange} optionLabel="name" filter showClear filterBy="name" placeholder="Select a Country"
                        valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} />
                        <button onClick={() => setLocale(LOCALES.GERMAN)}>GERMAN</button> */}
                    <span> <Link to={'/settings'} className="pi pi-cog" style={{ 'fontSize': '2em', color: 'white' }}></Link></span>
                </div>
                <div className="user-btn" onClick={() => setVisibleRight(true)}>
                    <div className="left">
                 {/*    <Button label={isLogged}   className="p-button" /> */}
                    </div>
                </div>
            </div>
          
            <Sidebar visible={visibleRight} className ='p-sidebar-right-user' position="right" baseZIndex={1000000} onHide={() => setVisibleRight(false)}>
        {/*      <AppConfig /> */}
            </Sidebar>
        </div>
    );
}

export default AppTopbar;
