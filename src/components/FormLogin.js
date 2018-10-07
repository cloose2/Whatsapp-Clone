import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  StatusBar,
  Button,
  Image,
  View,
  ImageBackground
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {modificaEmail,modificaSenha,autenticarUsuario} from '../actions/AuthActions';

class formLogin extends Component{
    _autenticaUsuario(){
        const email =this.props.email;  
        const senha =this.props.senha;
        this.props.autenticarUsuario({email,senha});
    }

    renderBtnAcessar(){
        //alert(this.props.loading_login);
        if(this.props.loading_login){
            return(
                <ActivityIndicator size="large"/>
            )
        }
        return (
            <Button 
            title ="Acessar"
            color='#115E54'
            onPress={()=>this._autenticaUsuario()}/>
        )
    }

    render(){
        return (
            <ImageBackground  style={{width: '100%', height: '100%'}} source = {require('../imgs/bg.png')} >
                <View style={styles.tela}>
                <StatusBar backgroundColor='#114D44'/>
                    <View style={{flex:1,
                    justifyContent:'center',//altura
                    alignItems:'center'}}>
                    <Text style={{marginTop:50,color:'#fff',fontSize:25,backgroundColor:'transparent'}}>WhatsApp Clone</Text>
                    <Image source={require('../imgs/logo.png')}/>   
                    </View>
                    <View style={styles.ViewFormulario}>
                        <Text style={{color:'red',textAlign:'center',fontSize:18 }}>{this.props.erroLogin}</Text>
                        <TextInput value={this.props.email} style={styles.TextoForm} placeholder = "E-mail" placeholderTextColor='#fff' onChangeText={texto => this.props.modificaEmail(texto) }/>
                        <TextInput secureTextEntry={true} placeholderTextColor='#fff' value={this.props.senha} style={styles.TextoForm} placeholder = "Senha" onChangeText={texto => this.props.modificaSenha(texto) }/>
                        <TouchableHighlight onPress={()=>Actions.formCadastro()}>
                            <Text style={{fontSize:20,marginTop:10,color:'#fff'}}>Ainda não tem cadastro? Cadastre-se</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.ViewBotao}>
                        {this.renderBtnAcessar()}
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state =>({
    email: state.AuthReducer.email,
    senha: state.AuthReducer.senha,
    erroLogin: state.AuthReducer.erroLogin,
    loading_login: state.AuthReducer.loading_login
});
export default connect(mapStateToProps,{modificaEmail,modificaSenha,autenticarUsuario})(formLogin);

styles = StyleSheet.create({
    tela:{
        flex:1,
        padding:10
    },
    ViewTitulo :{
        flex:1,
        justifyContent:'center',//altura
        alignItems:'center',
    },
    TextoTitulo:{
        fontSize:25,
        marginTop:50
    },
    ViewFormulario :{
        flex:2
    },
    TextoForm:{
        fontSize:20,
        height:45
    },
    ViewBotao :{
        flex:2
    },
});