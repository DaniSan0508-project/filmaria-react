import './filmes.css'
import {useParams,useHistory} from 'react-router-dom'
import {useState,useEffect} from 'react'
import api from '../../services/api'
import { toast } from 'react-toastify'



export default function Filme(){

    let {id} = useParams()
    let [filme,setFilme] = useState([])
    let [loading,setLoading] = useState(true)
    let history = useHistory()


    //Inicio do ciclo do componente
    useEffect(()=>{

        async function loadFilme(){

            try{
                const reqFile = await api.get(`/r-api/?api=filmes/${id}`)

                    if(reqFile.data.length === 0){
                        //em caso de pesquisa por id inválido , segue para rota home
                        history.replace('/')
                        return
                    }

                setFilme(reqFile.data)
                setLoading(false)
            }catch(error){
                console.log(error)
            }
        }
        
        loadFilme()

        //fim do ciclo do componente
        return()=>{
            console.log('componente desmontado')
        }

    },[id,loading,history])

    function salvaFilme(){
        const minhaLista = localStorage.getItem('filmes')
        let filmesSalvos = JSON.parse(minhaLista) || []

        //verifica se algum filme tem esse id e devolve true or false
        const hasFilme = filmesSalvos.some(filmesSalvos => filmesSalvos.id === filme.id)

        if(hasFilme){
            toast.info('Você já possui esse filme salvo.')
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem('filmes',JSON.stringify(filmesSalvos))
            toast.info('Filme salvo com sucesso!')
    }

// tela de carregamento do filme 
    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando...</h1>
            </div>
        )
    }
    

    return(
        <div className='filme-info'>
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={`foto do filme ${filme.nome}`}></img>
            <h3>Sinopse</h3>
            {filme.sinopse}

            <div>
                <button onClick={()=>{salvaFilme()}}>Salvar</button>
                <button>
                    <a target="blank" href={`https://www.youtube.com/results?search_query=${filme.nome} trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}