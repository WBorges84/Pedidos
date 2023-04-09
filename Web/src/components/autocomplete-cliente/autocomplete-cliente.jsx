import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../services/api.js";
import "./autocomplete-cliente.css";
import btnClear from "../../assets/clear.png"


function AutoCompleteCliente(props){

    const [texto, setTexto] = useState("");
    const [lista_clientes, setListaClientes] = useState([]);

    function PesquisarClientes(busca){
        if (busca.length > 2){
            api.get(`/clientes?busca=${busca}`)
        .then((retorno) =>{
            setListaClientes(retorno.data)  
        })
        .catch((err) =>{
            console.log(err);
            alert("Erro ao consultar clientes")
        });
        } 
    }

    function Filtrar(e){
        setTexto(e.target.value);
        PesquisarClientes(e.target.value);

    }

    function SelecionarItem(id, nome){
        setTexto(nome);
        setListaClientes([]);
        props.onClickId(id);
        props.onClickNome(nome);

    }

    function Clear(){
        setTexto("");

        props.onClickId(0);
        props.onClickNome("");
        setListaClientes([]);


    }
    
    useEffect(() =>{
        document.addEventListener('click', (e) => setListaClientes([]));
    },[]);

    useEffect(() =>{
        setTexto(props.value);
    },[props.value]);


    return <div className="autocomplete">
    <input type="text" className="form-control" onChange={Filtrar} 
        placeholder={props.placeholder}
        value={texto}/>
    {
        texto.length > 0 ?
        <button className="autocomplete-clear" onClick={Clear}>
            <img src={btnClear} className="autocomplete-img"/>
        </button>
        : null
    }    
    {
        lista_clientes.length > 0 ?
        <div className="autocomplete-items">
            {
                lista_clientes.map((cli) =>{
                    return <div key={cli.id_cliente} className="autocomplete-item" 
                                onClick={(e) => SelecionarItem(cli.id_cliente, cli.nome)}>
                       <b>{cli.nome}</b> <br />
                       <small className="text-secondary">Código: {cli.id_cliente}</small>
                    </div>
                })
            }

        </div>
        : null
    }

    </div>



}export default AutoCompleteCliente;