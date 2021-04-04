import './erro.css'
import {Link} from 'react-router-dom'


export default function Erro(){
    return(
        <div>
            <h1>404 Ops... não há nada aqui</h1>
            <Link to="/">Veja a lista de filmes</Link>
        </div>
        

    )
}