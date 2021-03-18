import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import useSWR from 'swr'
import { InputText } from 'primereact/inputtext'
import { FileUpload } from 'primereact/fileupload';
import translate from '../i18n/translate';
import { Toast } from 'primereact/toast';
import GlobalToastTimer from '../common/components/GlobalToastTimer'
import { Spinner } from 'reactstrap';
import APIURL from '../ApiConfig'
const fetcher =(...args) => fetch(...args).then(res => res.json());

export function ListCompany(props) {
    const url = APIURL + "/company/listcompany/"
    const { data, error } = useSWR(url , fetcher, { refreshInterval: 1000 })
    const[dataa,setdataa] = useState({})
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [position, setPosition] = useState('center');
    const[saveBtnTooltipText] = useState('details')
    const myToast = useRef(null);
    const showToast = (severityValue, summaryValue, detailValue) => {
        myToast.current.show({ severity: severityValue, summary: summaryValue, detail: detailValue, life : GlobalToastTimer });
    }
    console.log(data)
    useEffect(() => {
        if (props.location.add)
            showToast('success', translate("Success Message"), translate("Company Created"))
        else if (props.location.edit)
            showToast('success', translate("Success Message"), translate("Company Updated"))
        else if (props.location.delete)
            showToast('success', translate("Success Message"), translate("Lead Delered"))

       
    }, []);

    const exportCSV = () =>  {
        dt.current.exportCSV();
    }
    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
   
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }


    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <svg type='button' width="1em" onClick={()=> {
                      
                    props.history.push( {pathname : `/company/editcompany/${rowData.id}`, state: rowData })
                }}
                    height="1em" style={{ 'fontSize': '1.3em' }} viewBox="0 0 16 16" className="bi bi-pencil-square text-warning mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg" tooltip="Enter your username">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>
            </>

        )
    }
    const handleClose = () => {
        setDisplayBasic(false)
    }
    
    const nameBodyTemplate = (rowData) => {
        return <Button className="p-button-text" label={rowData.first_name + " "+rowData.last_name} onClick={() => props.history.push({ pathname: `/crm/detaillead/${rowData.id}`, state: { id: rowData.id } })}
        tooltip={saveBtnTooltipText} />

    }
    const vatBodyTemplate = (rowData) =>{
        console.log(rowData.vat)
        if (rowData.vat === true)

            return <>
                <i className="pi pi-check" style={{ 'fontSize': '1.5em', color: 'green' }}></i>
            </>
        else
            return <>

            </>
    }

    const header = (
        <div className="p-grid">
        <div className="p-col-8">
            <span className='mr-2'>{translate('List of Companies')}</span>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value) } placeholder="Global Search" />
            </span>
        </div>
        <div className="p-col-4">
            <Button label={translate('New Comapny')} onClick={()=> props.history.push("/company/newcompany")} icon="pi pi-plus"  className='p-mr-1 p-d-inline-block' />

            <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-1 p-d-inline-block" />
            <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
        </div>
    </div>
    );
    if (error) return <div>
       <DataTable  ref={dt} value={data} header={header} globalFilter={globalFilter} emptyMessage={translate("No comapnies found.")} className="p-datatable-customers"  paginator
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]} >
                <Column field="name"header={translate("Name")} sortable filter filterPlaceholder="Search by name"   />
                <Column field="currency"  header={translate("Currency")} sortable filter filterPlaceholder="Search by currency" />
                <Column field="start_date" header={translate("Start Date")} sortable filter filterPlaceholder="Search by startdate" />
                <Column field="end_date" header={translate("End Date")} sortable filter filterPlaceholder="Search by enddate" />
                <Column field="vat" header={translate("Vat")}  sortable filter filterPlaceholder="Search by vat" />
                <Column field="email" header={translate("Email")} sortable filter filterPlaceholder="Search by email" />
                <Column field="phone" header={translate("Phone")} sortable filter filterPlaceholder="Search by phone" />
                <Column  header={translate("Actions")} body={actionBodyTemplate} />
                        
            </DataTable>

            </div>
        return (
            <div>
                <Toast ref={myToast} />
                <div className="card">
                    <DataTable  ref={dt} value={data} header={header} globalFilter={globalFilter} emptyMessage={translate("No comapnies found.")} className="p-datatable-customers"  paginator
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]} >
                        <Column field="name"header={translate("Name")} sortable filter filterPlaceholder="Search by name"   />
                        <Column field="currency"  header={translate("Currency")} sortable filter filterPlaceholder="Search by currency" />
                        <Column field="start_date" header={translate("Start Date")} sortable filter filterPlaceholder="Search by startdate" />
                        <Column field="end_date" header={translate("End Date")} sortable filter filterPlaceholder="Search by enddate" />
                        <Column field="vat" header={translate("Vat")} body={vatBodyTemplate} sortable filter filterPlaceholder="Search by vat" />
                        <Column field="email" header={translate("Email")} sortable filter filterPlaceholder="Search by email" />
                        <Column field="phone" header={translate("Phone")} sortable filter filterPlaceholder="Search by phone" />
                        <Column  header={translate("Actions")} body={actionBodyTemplate} />
                        
                    </DataTable>
                </div>
             
       </div>
        )
    
}

export default ListCompany

