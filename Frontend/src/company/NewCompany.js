
import React , {useEffect, useState} from 'react';
import { Card } from 'primereact/card'
import {InputText} from 'primereact/inputtext'
import {Checkbox} from 'primereact/checkbox'
import {Dropdown} from 'primereact/dropdown'
import {Button} from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Form } from "reactstrap";
import translate from '../i18n/translate';
import classNames from 'classnames';
import useSWR from 'swr'
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { Toolbar } from 'primereact/toolbar';

export function NewCompany() {
    const[submitted, setsubmitted] = useState(false)
    const [name,setname] = useState(null)
    const[currency,setcurrency]= useState(null)
    const[vat,setvat]= useState(null)
    const[start_date,setstart_date]= useState(null)
    const[end_date,setend_date] = useState(null)
    const[vat_amount,setvat_amount] = useState(null)
    const[vat_date,setvat_date] = useState(null)
    const[mof,setmof] =  useState(null)
    const[commercial_register,setcommercial_register] = useState(null)
    const[image,setimage]= useState(null)
    const [phone1,setphone1] = useState(null)
    const[phone2,setphone2] = useState(null)
    const[fax,setfax] = useState(null)
    const[email,setemail] = useState(null)
    const[country,setcountry] = useState(null)
    const[city,setcity] = useState(null)
    const[address,setaddress] = useState(null)
    const[website,setwebsite] = useState(null)

    const sub = () => {
        setsubmitted(true)
    }
    const leftToolbarTemplate1 = () => {
        return <>Company Info</>
    }
    const leftToolbarTemplate2 = () => {
        return <>Contact Info</>
    }
    const leftToolbarTemplate3 = () => {
        return <>Address Info</>
    }
    
    return (
         <Card className='center-elements' >
             
            <Form  noValidate>
                <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-1"></div>
                        <div className="p-field p-col">
                            <strong className='titles'>{translate('New Company')}</strong>
                        </div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-1"></div>
                    <div className="p-field p-col">
                    <Toolbar className="p-mb-4"  left={leftToolbarTemplate1} ></Toolbar>
                    </div>
                </div>
                
                <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-1"></div>
                    <div className="p-field p-col">
                        <strong>{translate('Name')}</strong>
                        <InputText value={name} onChange={e=> setname(e.target.value)}  />
                        
                    </div>

                    <div className="p-field p-col">
                        <strong>{translate('MOF')}</strong>
                        <InputText keyfillter="int" value={mof}  onChange={ e=> setmof(e.target.value)}  />
                        
                    </div>

                    <div className="p-field p-col">
                        <strong>{translate('Commercial Register')}<span className='color-star'>*</span></strong>
                        <InputText value={commercial_register} onChange={(e) =>setcommercial_register(e.target.value)} required className={classNames({ 'p-invalid': submitted && !commercial_register })} />
                        {submitted && !commercial_register && <small className="p-invalid">{translate('FirstName is required')}</small>}
                        
                    </div>
                    <div className="p-field p-col-1"></div>
                </div>
          
                <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-1"></div>
                    <div className="p-field p-col">
                        <strong>{translate('Currency')}<span className='color-star'>*</span></strong>
                        <InputText value={currency} onChange={e=> setcurrency(e.target.value)}  />
                        
                    </div>
                    <div className="p-field p-col">
                        <strong>{translate('Start Date')}<span className='color-star'>*</span></strong>
                        <Calendar value={start_date} onChange={(e) => setstart_date(e.value)} monthNavigator yearNavigator yearRange="2010:2030" required className={classNames({ 'p-invalid': submitted && !end_date })} />
                        {submitted && !start_date && <small className="p-invalid">{translate('StartDate is required')}</small>}
                        
                    </div>

                    <div className="p-field p-col">
                        <strong>{translate('End Date')}<span className='color-star'>*</span></strong>
                        <Calendar value={end_date} onChange={(e) =>setend_date(e.value)} required className={classNames({ 'p-invalid': submitted && !end_date })} />
                        {submitted && !end_date && <small className="p-invalid">{translate('EndDate is required')}</small>}
                        
                    </div>
                    <div className="p-field p-col-1"></div>
                </div>
                    
                <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-1"></div>
                    <div className="p-field p-col">
                    <br />
                        <strong className='mr-2'>{translate('Vat')}</strong>
                        <Checkbox checked={vat} onChange={e=> setvat(true)}  />
                        
                    </div>
                    <div className="p-field p-col">
                        <strong>{translate('Start Date of Vat')}<span className='color-star'>*</span></strong>
                        <Calendar value={vat_date} onChange={(e) => setvat_date(e.value)} monthNavigator yearNavigator yearRange="2010:2030" required className={classNames({ 'p-invalid': submitted && !vat_date })} />
                        {submitted && !vat_date && <small className="p-invalid">{translate('Date is required')}</small>}
                        
                    </div>

                    <div className="p-field p-col">
                        <strong>{translate('Amount in %')}<span className='color-star'>*</span></strong>
                        <Calendar value={vat_amount} onChange={(e) =>setvat_amount(e.value)} required className={classNames({ 'p-invalid': submitted && !vat_amount })} />
                        {submitted && !vat_amount && <small className="p-invalid">{translate('Amount is required')}</small>}
                        
                    </div>
                    <div className="p-field p-col-1"></div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-1"></div>
                <div className="p-field p-col">
                <Toolbar className="p-mb-4"  left={leftToolbarTemplate2} ></Toolbar>
                </div>
            </div>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-1"></div>
                    <div className="p-field p-col">
      
                        <strong className='mr-2'>{translate('Email')}</strong>
                        <InputText value={email} onChange={e=> setemail(e.target.value)}  />
                        
                    </div>
                    <div className="p-field p-col">
                        <strong>{translate('Phone')}<span className='color-star'>*</span></strong>
                        <InputText value={phone1} onChange={(e) => setphone1(e.target.value)}  required className={classNames({ 'p-invalid': submitted && !phone1 })} />
                        {submitted && !phone1 && <small className="p-invalid">{translate('Phone is required')}</small>}
                        
                    </div>

                    <div className="p-field p-col">
                        <strong>{translate('Mobile')}</strong>
                        <InputText value={phone2} onChange={(e) =>setphone2(e.target.value)}  />
            
                        
                    </div>
                    <div className="p-field p-col-1"></div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-1"></div>
                    <div className="p-field p-col">
                        <strong className='mr-2'>{translate('Fax')}</strong>
                        <InputText value={fax} onChange={e=> setfax(e.target.value)}  />
                        
                    </div>
                    <div className="p-field p-col">
                        <strong>{translate('Website')}<span className='color-star'>*</span></strong>
                        <InputText value={website} onChange={(e) => setphone1(e.target.value)}  required className={classNames({ 'p-invalid': submitted && !phone1 })} />
                        {submitted && !phone1 && <small className="p-invalid">{translate('Phone is required')}</small>}
                        
                    </div>

                    <div className="p-field p-col"></div>
                    <div className="p-field p-col-1"></div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-1"></div>
                    <div className="p-field p-col">
                    <Toolbar className="p-mb-4"  left={leftToolbarTemplate3} ></Toolbar>
                    </div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-1"></div>
                    <div className="p-field p-col">
      
                        <strong className='mr-2'>{translate('Country')}<span className='color-star'>*</span></strong>
                        <InputText value={country} onChange={e=> setcountry(e.target.value)} required className={classNames({ 'p-invalid': submitted && !country })}  />
                        {submitted && !country && <small className="p-invalid">{translate('Country is required')}</small>}
                        
                    </div>
                    <div className="p-field p-col">
                        <strong>{translate('City')}<span className='color-star'>*</span></strong>
                        <InputText value={city} onChange={(e) => setcity(e.target.value)}  required className={classNames({ 'p-invalid': submitted && !city })} />
                        {submitted && !city && <small className="p-invalid">{translate('City is required')}</small>}
                        
                    </div>

                    <div className="p-field p-col">
                        <strong>{translate('Address')}<span className='color-star'>*</span></strong>
                        <InputText value={address} onChange={(e) =>setaddress(e.target.value)}  required className={classNames({ 'p-invalid': submitted && !address })}  />
                        {submitted && !address && <small className="p-invalid">{translate('Address is required')}</small>}
            
                        
                    </div>
                    <div className="p-field p-col-1"></div>
                </div>
               
               
                <div className='float-right'>
                        <Button type='button' label={translate('Cancel (F12)')} className="p-button-secondary mr-2"  />

                        <Button label={translate('Save')}  className='p-button-success mr-2' />
                 </div>

            </Form>
       </Card>
        
    )
    
}

export default NewCompany
