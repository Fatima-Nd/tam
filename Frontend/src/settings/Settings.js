import React, { useState , useEffect } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import translate from '../i18n/translate';
export function Settings (props) {
    let id = 23

        return (
            <div>
                <div className="p-grid">
                    <div className="p-col">
                        <div className="box">  
                            <Card title="User management" style={{ width: '25rem', marginBottom: '2em' }}>
                                <div className="p-grid p-dir-col">
                                    <ul>
                                        <li><Link to="/auth/listuser"><span className='color-black'>{translate('Users')}</span></Link></li>
                                        <li><Link to="/"><span className='color-black'>{translate('Roles')}</span></Link></li>
                                    </ul>
                                
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="p-col">
                        <div className="box">
                            <Card title="Company management" style={{ width: '25rem', marginBottom: '2em' }}>
                                <div className="p-grid p-dir-col">
                                    <ul>
                                        <li><Link to='/company/detailcompany/23' ><span className='color-black'>{translate('Company details')}</span></Link></li>
                                        <li><Link to="/company/newcompany"><span className='color-black'>{translate('New Company')}</span></Link></li>
                                    </ul>
                        
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="p-col">
                        <div className="box">
                            <Card title="Branches  management" style={{ width: '25rem', marginBottom: '2em' }}>
                                <div className="p-grid p-dir-col">
                                    <ul>
                                        <li><Link to='/company/detailcompany/23' ><span className='color-black'>{translate('Company details')}</span></Link></li>
                                        <li><Link to="/company/newcompany"><span className='color-black'>{translate('New Branch')}</span></Link></li>
                                    </ul>
                        
                                </div>
                            </Card>
                        </div>
                    </div>
                        <div className="p-col">
                            <div className="box"></div>
                        </div>
                        <div className="p-col">
                            <div className="box"></div>
                        </div>
                        <div className="p-col">
                            <div className="box"></div>
                        </div>
                        <div className="p-col">
                            <div className="box"></div>
                        </div>
                </div>
            </div>
        )
}
export default Settings