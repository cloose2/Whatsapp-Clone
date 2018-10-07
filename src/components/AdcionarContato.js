import React,{Component} from 'react';
import { View,Text, StyleSheet, Dimensions,TextInput,Button } from 'react-native';
import {connect} from 'react-redux';
import {modificaAddEmail,adcionarContato} from '../actions/AppActions';

class AdcionarContato extends Component{
    renderAdicionarContato() {
        if(!this.props.cadastro_resultado_inclusao) {
            return (
                
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TextInput
                            placeholder='E-mail'
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={(texto) => this.props.modificaAddEmail(texto)}
                            value={this.props.add_contato_email}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Button 
                            title="Adicionar" 
                            color="#115E54" 
                            onPress={() => this.props.adcionarContato(this.props.add_contato_email) } 
                        />
                        <Text style={{color:'red',fontSize:20,marginTop:15,textAlign:'center'}}>
                            {this.props.cadastro_resultado_txt_erro}
                        </Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View>
                    <Text style={{ fontSize: 20,textAlign:'center' }}>
                        Cadastro realizado com sucesso!
                    </Text>
                </View>
            )
        }
    }

    render(){
        return(
            <View style={{flex:1,justifyContent:'center',padding:20}}>
                {this.renderAdicionarContato()}

            </View>
        )
    }
}


const mapStateToProps = state=>(
    {
        add_contato_email: state.AppReducer.add_contato_email,
        cadastro_resultado_txt_erro:state.AppReducer.cadastro_resultado_txt_erro,
        cadastro_resultado_inclusao:state.AppReducer.cadastro_resultado_inclusao
    });


export default connect(mapStateToProps,{modificaAddEmail,adcionarContato})(AdcionarContato);