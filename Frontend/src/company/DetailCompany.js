
import React, { useState, useEffect } from 'react'
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import translate from '../i18n/translate';
import APIURL from '../ApiConfig'
import useSWR from 'swr'
const fetcher =(...args) => fetch(...args).then(res => res.json());

export function DetailCompany(props) {
    let id = 23
    const url = APIURL + `/company/detailcompany/${id}/`
    const { data, error } = useSWR(url , fetcher, { refreshInterval: 1000 })
    console.log(data)
    useEffect(() => {
        document.addEventListener("keydown", goBack);
    }, []);


    const goBack = (event) => {
        if (event.type === 'click') {
            props.history.push('/settings');
        }
        // keyCode 123 = f12
        else if (event.keyCode === 123) {
            props.history.push('/settings');

        }
    }
    if (error) return <div>...{translate("faild to load data")}</div>
    if (!data) return <div></div>

    return (
        <div >
            <Card>
                <strong className='h5'>{data.name} </strong>

                <div className='float-right'>
                    <Button label={translate('Back (F12)')} className="p-button-secondary mr-2" onClick={goBack} />
                    <Button label={translate('Edit')} className="p-button-warning" onClick={() => props.history.push({ pathname: `/company/editcompany/${id}`, state: { id: data.id, name:data.name, mof:data.mof, commercial_register:data.commercial_register, currency:data.currency, start_date:data.start_date, end_date:data.end_date, vat:data.vat, vat_date:data.vat_date,email: data.email, phone1:data.phone1, phone2:data.phone2,fax:data.fax, website:data.website,
                    country:data.country, address:data.address, city: data.city} })} />
                </div>

            </Card>
            <br />
            <div className="p-fluid p-formgrid p-grid">
        
                <div className="p-field p-col-7">
                    <Card subTitle="" className="ui-card-shadow "  >
                        <div className="tabview-demo">

                            <TabView>
                                <TabPanel header={translate('Company Information')}>
                                    <div className="p-fluid p-formgrid p-grid">
                                        <div className="p-field p-col">
                                            <strong  >{translate('Name')}:</strong>&nbsp;
                                             <span >{data.name}</span>


                                        </div>
                                        <div className="p-field p-col">
                                            <strong >{translate('MOF')}:</strong>
                                            &nbsp;<span ><span className="customer-badge status-new">{data.mof}</span></span>

                                        </div>
                                    </div>
                                    <div className="p-fluid p-formgrid p-grid">
                                        <div className="p-field p-col">
                                            <strong  >{translate('Commercial Register')}:</strong>&nbsp;
                                            <span >{data.commercial_register} </span>


                                        </div>
                                        <div className="p-field p-col">
                                            <strong  >{translate('Currency')}:</strong>&nbsp;
                                            <span >{data.currency}</span>


                                        </div>
                                    </div>
                                    <div className="p-fluid p-formgrid p-grid">
                                        <div className="p-field p-col">
                                            <strong  >{translate('Start Date')}:</strong>&nbsp;
                                            <span >{data.start_date}</span>


                                        </div>
                                        <div className="p-field p-col">
                                            <strong  >{translate('End Date')}:</strong>&nbsp;
                                            <span >{data.end_date}</span>

                                        </div>
                                    </div>
                                    <div className="p-fluid p-formgrid p-grid">
                                        <div className="p-field p-col">
                                            <strong >{translate('VAT')}:</strong>&nbsp;
                                            <span > {data.vat ? <i className="pi pi-check" style={{ 'fontSize': '1.5em', color: 'green' }}></i> : <i className="pi pi-times" style={{ 'fontSize': '1.5em', color: 'green' }}></i>}</span>


                                        </div>
                                        <div className="p-field p-col">
                                            <strong >{translate('Start Date of VAT')}:</strong>&nbsp;
                                            <span > {data.vat_date}</span>
                      

                                        </div>

                                    </div>
                                    <div className="p-fluid p-formgrid p-grid">
                                        <div className="p-field p-col">
                                            <strong >{translate('Email')}:</strong>&nbsp;
                                            <span > {data.email}</span>


                                        </div>
                                        <div className="p-field p-col">
                                            <strong >{translate('Phone')}:</strong>&nbsp;
                                            <span >{data.phone1}</span>
                                        </div>
                                    </div>
                                    <div className="p-fluid p-formgrid p-grid">
                                        <div className="p-field p-col">
                                            <strong >{translate('Mobile')}:</strong>&nbsp;
                                            <span > {data.phone2}</span>


                                        </div>
                                        <div className="p-field p-col">
                                            <strong >{translate('Fax')}:</strong>&nbsp;
                                            <span >{data.fax}</span>
                                        </div>
                                    </div>
                                    <div className="p-fluid p-formgrid p-grid">
                                        <div className="p-field p-col">
                                            <strong >{translate('Website')}:</strong>&nbsp;
                                            <span > {data.website}</span>


                                        </div>
                                        <div className="p-field p-col">
                                            <strong >{translate('Country')}:</strong>&nbsp;
                                            <span >{data.country}</span>
                                        </div>
                                    </div>
                                    <div className="p-fluid p-formgrid p-grid">
                                        <div className="p-field p-col">
                                            <strong >{translate('City')}:</strong>&nbsp;
                                            <span > {data.city}</span>


                                        </div>
                                        <div className="p-field p-col">
                                            <strong >{translate('Address')}:</strong>&nbsp;
                                            <span >{data.address}</span>
                                        </div>
                                    </div>
                           
                                </TabPanel>

                            </TabView>

                        </div>
                    </Card>


                </div>
            </div>

        </div>

    )
}

export default DetailCompany
