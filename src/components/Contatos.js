import React,{Component} from 'react';
import { View,Text,TouchableHighlight ,ListView } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import {connect} from 'react-redux';
import {contatosUsuarioFetch} from '../actions/AppActions';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';

class Contatos extends Component {

    componentWillMount(){
        console.log('contatos');
        this.props.contatosUsuarioFetch();
        this.criaFontedeDados(this.props.contatos);
    }
    componentWillReceiveProps(nextProps){
        this.criaFontedeDados(nextProps.contatos);
    }

    criaFontedeDados(contatos){
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
        this.fonteDeDados = ds.cloneWithRows(contatos)
    }


    renderRow(contato){
        return (
            <TouchableHighlight
            onPress={()=>Actions.conversa({title:contato.nome,contatoEmail:contato.email})}
            >
                <View style={{flex:1,padding:20,borderBottomWidth:1,borderColor:'#CCC'}}>
                    <Text style={{fontSize:25}}>{contato.nome}</Text>
                    <Text style={{fontSize:18}}>{contato.email}</Text>
                </View>
            </TouchableHighlight>
        )
    }


    render(){
        return(
            <ListView
                enableEmptySections
                dataSource={this.fonteDeDados}
                renderRow={data=>this.renderRow(data)}
            />
        )
    }      
}

mapStateToProps = state=>{
    const contatos = _.map(state.ListaContatosReducer,(val ,uid)=>{
        return {...val,uid}
    })
    return{contatos:contatos}
}



export default connect(mapStateToProps,{contatosUsuarioFetch})(Contatos);