import React  from 'react';


import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './assets/style/App.scss';
import AppTopbar from './AppTopbar'
import AppRouter from './AppRouter'
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import { I18nProvider, LOCALES } from './i18n';

function App() {

  return (

    <I18nProvider>
    <div className='App'>
 
        <AppTopbar />
        <div className='p-main-layout'>
            <AppRouter />
        </div>
      </div>
    </I18nProvider>

  );
}

export default App;
