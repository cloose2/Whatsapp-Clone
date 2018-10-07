import React from 'react';
import {Router,Scene} from 'react-native-router-flux';
import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas';
import Principal from './components/Principal';
import AdcionarContato from './components/AdcionarContato';
import Conversa from './components/Conversa';

export default props => (
    <Router navigationBarStyle={{backgroundColor:'#115E54'}} titleStyle={{color:'#fff'}}>
        <Scene key = 'formLogin' component={FormLogin} title="Login" initial  hideNavBar={true}/>
        <Scene key = 'formCadastro' component={FormCadastro} title="Cadastro" hideNavBar={false} />
        <Scene key = 'BoasVindas' component={BoasVindas} title="Boas Vindas" hideNavBar={true}/>
        <Scene key = 'principal' component={Principal} title="Principal"  hideNavBar={true} />
        <Scene key = 'add' component={AdcionarContato} title="Adicionar Contato"  hideNavBar={false}/>
        <Scene key = 'conversa' component={Conversa} title="Conversa"   hideNavBar={false}/>
    </Router>
);