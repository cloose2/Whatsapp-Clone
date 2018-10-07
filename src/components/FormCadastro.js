import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  Button,
  ImageBackground,
  View
} from 'react-native';
import {connect} from 'react-redux';
import {modificaEmail,modificaSenha,modificaNome,cadastraUsuario} from '../actions/AuthActions';




class FormCadastro extends Component{

    _cadastraUsuario(){
        const nome = this.props.nome;
        const email = this.props.email;
        const senha = this.props.senha;
        this.props.cadastraUsuario({nome,email,senha});
    }

    renderBtnCadastro(){
        if(this.props.loading_cadastro){
            return(
            <ActivityIndicator size="large"/>
            )
        }
        return (
        <Button 
        title='Cadastrar' 
        color='#115E54' 
        onPress={()=>this._cadastraUsuario()}/> 
        ) 
    }

    render(){
    return(
    <ImageBackground  style={{width: '100%', height: '100%'}} source = {require('../imgs/bg.png')} >
        <View style={styles.tela}>
            <View style={styles.ViewFormulario}>
                <Text style={{color:'red', fontSize:18, textAlign:'center'}}>{this.props.erroCadastro}</Text>
                <TextInput value={this.props.nome} placeholderTextColor='#fff' style={styles.TextoForm} onChangeText ={(texto)=>this.props.modificaNome(texto)} placeholder = "Nome"/>
                <TextInput value={this.props.email} placeholderTextColor='#fff'  style={styles.TextoForm} onChangeText={(texto) => this.props.modificaEmail(texto)} placeholder = "E-mail"/>
                <TextInput secureTextEntry placeholderTextColor='#fff' value={this.props.senha} style={styles.TextoForm} onChangeText={(texto) => this.props.modificaSenha(texto)} placeholder = "Senha"/>
            </View>
            <View style={styles.ViewBotao}>
                {this.renderBtnCadastro()}
            </View>
        </View>
    </ImageBackground>
);
    }
}

const mapStateToProps = state=>({
    nome: state.AuthReducer.nome,
    email: state.AuthReducer.email,
    senha: state.AuthReducer.senha,
    erroCadastro: state.AuthReducer.erroCadastro,
    loading_cadastro: state.AuthReducer.loading_cadastro
});

export default connect(mapStateToProps,{modificaEmail,modificaSenha,modificaNome,cadastraUsuario})(FormCadastro);


styles = StyleSheet.create({
    tela:{
        flex:1,
        padding:10
    },
    ViewFormulario :{
        flex:4,
        justifyContent:'center'
    },
    TextoForm:{
        fontSize:20,
        height:45
    },
    ViewBotao :{
        flex:1
    },
});