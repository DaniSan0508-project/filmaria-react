
import './home.css'
import api from '../../services/api'
import {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'

export default function Home(){
    const [filmes,setFilmes] = useState([])

    useEffect(()=>{
        async function loadFilmes(){
            try{
                const response = await api.get('r-api/?api=filmes')
                setFilmes(response.data)
            }catch(error){
                console.log(error)
            }
            
        }

        loadFilmes()

    },[])

    return(
        <div>
           <div className="container">
                <div className="lista-filmes">
                    {filmes.map(filme=>{
                        return(
                            <article key={filme.id}>
                                <strong>{filme.nome}</strong>
                                <img src={filme.foto} alt={filme.nome}></img>
                                <Link to={`/filme/${filme.id}`}>Acessar</Link>
                            </article>
                        )
                    })}
                </div>
           </div>
        </div>
    )
}