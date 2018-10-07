import {
    MODIFICA_CONTATO_EMAIL,
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    LISTA_CONTATO_USUARIO,
    MODIFICA_MENSAGEM,
    LISTA_CONVERSA_USUARIO,
    ENVIA_MENSAGEM_SUCESSO,
    LISTA_CONVERSAS_USUARIO
}from './types';
import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';

export const modificaAddEmail = (texto) => {
    //console.log(texto);
    return {
        type: MODIFICA_CONTATO_EMAIL,
        payload: texto
    }
}

export const adcionarContato = (email)=>{
    return dispatch =>{
        let emailB64= b64.encode(email);
        firebase.database().ref('/contatos/'+emailB64)
            .once('value')
            .then(snapshot => {
                if(snapshot.val()){
                    const dadosUsuario =_.values(snapshot.val());//convertendo objeto para array
                    //console.log(dadosUsuario);
                    //email do usuario autenticado
                    const {currentUser} = firebase.auth();
                    let emailUsuarioB64 = b64.encode(currentUser.email);
                    firebase.database().ref('/usuario_contatos/'+emailUsuarioB64)
                        .push({email:email,nome:dadosUsuario[0].nome})
                        .then(()=>adicionaContatoSucesso(dispatch))
                        .catch((erro)=>adcionarContatoErro(dispatch,erro.message))
                }else{
                    dispatch({type:ADICIONA_CONTATO_ERRO,
                        payload:'Erro ao cadastrar contato'
                    })
                }
            })
    }
}


const adcionarContatoErro = (dispatch,erro) =>(
    dispatch (
        {
            type:ADICIONA_CONTATO_ERRO,
            payload:erro
        }
    )
)

const adicionaContatoSucesso = dispatch =>{
    dispatch(
        {
            type: ADICIONA_CONTATO_SUCESSO,
            payload: true
        }
    )
}

export const habilitaInclusaoContato = () => (
    {
        type: ADICIONA_CONTATO_SUCESSO,
        payload: false
    }
)

export const contatosUsuarioFetch = () =>{
    const{currentUser} = firebase.auth();
    return(dispatch) => {
        let emailUsuarioB64 = b64.encode(currentUser.email);
        firebase.database().ref('/usuario_contatos/'+emailUsuarioB64)
            .on("value",(snapshot)=>{
                dispatch({type:LISTA_CONTATO_USUARIO,payload: snapshot.val() })
            })
    }
}

export const modificaMensagem = texto =>{
    return({
        type:MODIFICA_MENSAGEM,
        payload:texto
    })
}


export const enviarMensagem = (mensagem,contatoNome,contatoEmail)=>{
    //usuario logado
    const {currentUser} = firebase.auth();
    const usuarioEmail = currentUser.email;
    return (dispatch) => {

    //criptografando email
    const usuarioEmailB64= b64.encode(usuarioEmail);
    const contatoEmailB64 = b64.encode(contatoEmail);
    
    firebase.database().ref('/mensagens/'+usuarioEmailB64+'/'+contatoEmailB64)
        .push({mensagem,tipo:'e'})
        .then(()=> {
            firebase.database().ref('/mensagens/'+contatoEmailB64+'/'+usuarioEmailB64)
            .push({mensagem,tipo:'r'})
            .then(()=> dispatch({type:ENVIA_MENSAGEM_SUCESSO}))
        })
        .then(()=>{
            //armazenamento dos cabecalhos do usuario autenticado
            firebase.database().ref('/usuario_conversas/'+usuarioEmailB64+'/'+contatoEmailB64)
                .set({nome:contatoNome,email:contatoEmail})
        })
        .then(() => { //armazenar o cabeçalho de conversa do contato

            firebase.database().ref(`/contatos/${usuarioEmailB64}`)
                .once("value")
                .then(snapshot => {

                    const dadosUsuario = _.first(_.values(snapshot.val()))

                    firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                        .set({ nome: dadosUsuario.nome, email: usuarioEmail })
                })
        })
        
    }
}

export const conversaUsuarioFetch = (contatoEmail) => {
    
    const {currentUser} = firebase.auth();
    let contatoEmailB64 = b64.encode(contatoEmail);
    let usuarioEmailB64 =b64.encode(currentUser.email);
    return dispatch => {
        firebase.database().ref('/mensagens/'+usuarioEmailB64+'/'+contatoEmailB64)
            .on("value",snapshot => {
                dispatch({type:LISTA_CONVERSA_USUARIO,payload:snapshot.val()})
            })
    }
}

export const conversasUsuarioFetch = () =>{
      const {currentUser} = firebase.auth();
      let usuarioEmailB64 =b64.encode(currentUser.email);
      return dispatch => {
          firebase.database().ref('/usuario_conversas/'+usuarioEmailB64)
            .on("value",snapshot => {
                dispatch({type:LISTA_CONVERSAS_USUARIO,payload:snapshot.val()})
            })
      }
}