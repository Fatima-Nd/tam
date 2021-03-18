
import React , {useEffect, useState} from 'react';
import { Card } from 'primereact/card'
import {InputText} from 'primereact/inputtext'
import {Checkbox} from 'primereact/checkbox'
import {Dropdown} from 'primereact/dropdown'
import {Button} from 'primereact/button'
import { Form } from "reactstrap";
import translate from '../i18n/translate';
import classNames from 'classnames';
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { Toolbar } from 'primereact/toolbar';
import Currencies from '../common/components/Currencies'
import Countries from '../common/components/Countries'
import APIURL from '../ApiConfig'
import moment from 'moment';
export function NewCompany(props) {
    const[submitted, setsubmitted] = useState(false)
    const [name,setname] = useState(null)
    const[currency,setcurrency]= useState(null)
    const[vat,setvat]= useState(null)
    const[start_date,setstart_date]= useState(new Date())
    const[end_date,setend_date] = useState(moment(moment(start_date).endOf('year')).format("DD/MM/YYYY"))
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

console.log(end_date)
    const sub = () => {
        setsubmitted(true)
    }
    useEffect(() => {

        document.addEventListener("keydown", goBack);

    }, [])

    const goBack = (event) => {
        if (event.type === 'click') {
            props.history.push('/company/listcompany')
            
        }
        // keyCode 123 = f12
        else if (event.keyCode === 123) {
            props.history.push('/company/listcompany')

        }
    }
    
    const createComapny = e => {
        e.preventDefault();
        axios.post(APIURL + '/company/listcompany/',  {name,currency,start_date:moment(start_date).format('YYYY-MM-DD'),end_date:moment(end_date).format('YYYY-MM-DD'),vat,vat_amount,vat_date: vat_date ? moment(vat_date).format('YYYY-MM-DD') : null,mof,commercial_register,phone1,phone2,email,fax,website,country,address,city}).then(res => {
           props.history.push({pathname: '/company/listcompany', add : {success : 'saved'} })
            console.log(res.data)
    })
        console.log({name,currency,start_date:moment(start_date).format('YYYY-MM-DD'),end_date:moment(end_date).format('YYYY-MM-DD'),vat,vat_amount,vat_date:vat_date ? moment(vat_date).format('YYYY-MM-DD') : null,mof,commercial_register,phone1,phone2,email,fax,website,country,address,city})
    }
    const leftToolbarTemplate1 = () => {
        return <h6>{translate("Company Info")}</h6>
    }
    const leftToolbarTemplate2 = () => {
        return <h6>{translate("Contact Info")}</h6>
    }
    const leftToolbarTemplate3 = () => {
        return <h6>{translate("Address Info")}</h6>
    }
    
    return (
         <Card className='center-elements' >
             
            <Form onSubmit={createComapny} noValidate>
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
                        <strong>{translate('Name')}<span className='color-star'>*</span></strong>
                        <InputText value={name} onChange={e=> setname(e.target.value)} required className={classNames({ 'p-invalid': submitted && !name })}  />
                        {submitted && !name && <small className="p-invalid">{translate('Name is required')}</small>}
                        
                    </div>

                    <div className="p-field p-col">
                        <strong>{translate('MOF')}<span className='color-star'>*</span></strong>
                        <InputText value={mof}  onChange={ e=> setmof(e.target.value)} required className={classNames({ 'p-invalid': submitted && !mof })}  />
                        {submitted && !mof && <small className="p-invalid">{translate('MOF is required')}</small>}
                        
                    </div>

                    <div className="p-field p-col">
                        <strong>{translate('Commercial Register')}<span className='color-star'>*</span></strong>
                        <InputText keyfillter="int" value={commercial_register} onChange={(e) =>setcommercial_register(e.target.value)} required className={classNames({ 'p-invalid': submitted && !commercial_register })} />
                        {submitted && !commercial_register && <small className="p-invalid">{translate('CommercialRegister is required')}</small>}
                        
                    </div>
                    <div className="p-field p-col-1"></div>
                </div>
          
                <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-1"></div>
                    <div className="p-field p-col">
                        <strong>{translate('Currency')}<span className='color-star'>*</span></strong>
                        <Dropdown placeholder={translate("Select currency")} value={currency} options={Currencies} onChange={e=> setcurrency(e.target.value)} required className={classNames({ 'p-invalid': submitted && !currency })}  />
                        {submitted && !currency && <small className="p-invalid">{translate('Currency is required')}</small>}
                        
                    </div>
                    <div className="p-field p-col">
                        <strong>{translate('Start Date')}<span className='color-star'>*</span></strong>
                        <Calendar value={start_date} onChange={(e) => setstart_date(e.value)} dateFormat="dd/mm/yy"  monthNavigator yearNavigator yearRange="2010:2030" required className={classNames({ 'p-invalid': submitted && !start_date })} />
                        {submitted && !start_date && <small className="p-invalid">{translate('StartDate is required')}</small>}
                        
                    </div>

                    <div className="p-field p-col">
                        <strong>{translate('End Date')}<span className='color-star'>*</span></strong>
                        <Calendar placeholder={end_date} dateFormat="dd/mm/yy" value={end_date} onChange={(e) =>setend_date(e.value)} required className={classNames({ 'p-invalid': submitted && !end_date })} />
                        {submitted && !end_date && <small className="p-invalid">{translate('EndDate is required')}</small>}
                        
                    </div>
                    <div className="p-field p-col-1"></div>
                </div>
                    
                <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-1"></div>
                    <div className="p-field p-col">
                    <br />
                        <strong className='mr-2'>{translate('Vat')}</strong>
                        <Checkbox checked={vat} onChange={e=> setvat(e.checked)}  />
                        
                    </div>
                    <div className="p-field p-col">
                        <strong>{translate('Start Date of Vat')}</strong> {vat ? (<span className='color-star'>*</span>): '' }
                        <Calendar value={vat_date}  disabled={vat ? false : true} onChange={(e) => setvat_date(e.value)} monthNavigator yearNavigator yearRange="2010:2030" required={vat? true : false} className={vat ? classNames({ 'p-invalid': submitted && !vat_date }) : ''} />
                        {submitted && !vat_date && vat && <small className="p-invalid">{translate('Date is required')}</small>}
                        
                    </div>

                    <div className="p-field p-col">
                        <strong>{translate('Amount in %')}</strong>{ vat ? <span className='color-star'>*</span> : ''}
                        <InputText  value={vat_amount} disabled={vat ? false : true} onChange={(e) =>setvat_amount(e.value)} required={vat ? true : false} className={vat ? classNames({ 'p-invalid': submitted && !vat_amount }) : ''} />
                        {submitted && !vat_amount && vat && <small className="p-invalid">{translate('Amount is required')}</small>}
                        
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
      
                        <strong className='mr-2'>{translate('Email')}<span className='color-star'>*</span></strong>
                        <InputText value={email} onChange={e=> setemail(e.target.value)} required className={classNames({ 'p-invalid': submitted && !email })}  />
                        {submitted && !email && <small className="p-invalid">{translate('Email is required')}</small>}
                        
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
                        <strong>{translate('Website')}</strong>
                        <InputText value={website} onChange={(e) => setwebsite(e.target.value)}  />
                    
                        
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
                        <Dropdown placeholder={translate("Select country")} value={country} options={Countries} onChange={e=> setcountry(e.target.value)} required className={classNames({ 'p-invalid': submitted && !country })}  />
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
                        <Button type='button' label={translate('Cancel (F12)')} className="p-button-secondary mr-2" onClick={goBack}  />

                        <Button label={translate('Save')}  onClick={sub} className='p-button-success mr-2' />
                 </div>

            </Form>
       </Card>
        
    )
    
}

export default NewCompany
