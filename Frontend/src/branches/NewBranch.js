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
import useSWR from 'swr'

const fetcher =(...args) => fetch(...args).then(res => res.json());

export function NewBranch() {
    let id = 23
    const url = APIURL + `/company/detailcompany/${id}/`
    const { data, error } = useSWR(url , fetcher, { refreshInterval: 1000 })
    const branch = {name: null, number: null, start_date: null, end_date: null, email: null, phone1:null, phone2:null, fax:null, website: null, country: null, address: null, city: null}
    const [branches] = useState([{ ...branch },]);

    const handleChange = () => {
        return <></>

    }
    const removeClick = () => {
        
    }

    if (error) return <div>...{translate("faild to load data")}</div>
    if (!data) return <div></div>

    return (
        <div>
            <Card className='center-elements'>
            <Form  noValidate>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-1"></div>
                    <div className="p-field p-col">
                        <strong className='titles'>{translate('New Branch')}</strong>
                    </div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-1"></div>
                    <div className="p-field p-col">
                        <strong>{translate('Main Branch')}</strong>
                        <InputText value={data.name} disabled  />
                      
                        
                    </div>

                    <div className="p-field p-col">
                        <strong>{translate('MOF')}</strong>
                        <InputText value={data.mof} disabled  />
                   
                        
                    </div>

                    <div className="p-field p-col">
                        <strong>{translate('Commercial Register')}</strong>
                        <InputText keyfilter="int" value={data.commercial_register} disabled  />
                   
                        
                    </div>
                    <div className="p-field p-col-1"></div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-1"></div>
                    <div className="p-field p-col">
                        <strong>{translate('Currency')}</strong>
                        <InputText value={data.currency} disabled  />
                      
                        
                    </div>

                    <div className="p-field p-col">
                        <strong>{translate('VAT')}</strong>
                        <br />
                        <Checkbox checked={data.vat} />
                   
                        
                    </div>

                    <div className="p-field p-col">
                        <strong>{translate('Start Date of VAT')}</strong>
                        <InputText keyfilter="int" value={moment(data.vat_date).format('DD/MM/YYYY')} disabled  />
                   
                        
                    </div>
                    <div className="p-field p-col-1"></div>
                </div>
                {
                    branches.map((val, idx)=> {
                        let nameId = `name-${idx}`, numberId = `id-${idx}`,start_dateId= `start_date-${idx}`,end_dateId= `end_date-${idx}`,  emailId= `email-${idx}`, phone1Id = `phone1-${idx}`,phone2Id = `phone2-${idx}`,
                        faxId= `fax-${idx}` ,websiteId= `website-${idx}`, countryId= `country-${idx}`, cityId= `city-${idx}`, addressId= `address-${idx}`
                        return (
                        <div key={`cat-${idx}`}>
                            <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-1"></div>
                            <div className="p-field p-col">
                                <strong htmlFor={nameId}>{translate('Name')}</strong>
                                <InputText name="name" data-idx={idx} id={nameId} value={branches[idx].name} onChange={handleChange}/>
                            </div>
                            <div className="p-field p-col">
                                <strong htmlFor={numberId}>{translate('Branch Number')}</strong>
                                <InputText keyfilter="int" name="number" data-idx={idx} id={numberId} value={branches[idx].number} onChange={handleChange}/>
                            </div>
                            <div className="p-field p-col">
                            <strong htmlFor={start_dateId}>{translate('Start Date')}</strong>
                            <Calendar name="start_date" data-idx={idx} id={start_dateId} value={branches[idx].start_date} onChange={handleChange}/></div>
                            <div className="p-field p-col">
                            <strong htmlFor={end_dateId}>{translate('End Date')}</strong>
                            <Calendar
                            name="end_date"
                            data-idx={idx}
                            id={end_dateId}
                            value={branches[idx].end_date}
                            onChange={handleChange}
                            /></div>
                        <div className="p-field p-col-1">
                        <br />
                        <Button type='button' className="p-button-danger" label={translate('Remove')} icon='pi pi-trash' onClick={removeClick} />
                        </div>
                        </div>
                        </div>
                        )
                    })
                    }

            </Form>

            </Card>
            
        </div>
    )
    
}

export default NewBranch
