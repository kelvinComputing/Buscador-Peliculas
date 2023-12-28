import { useState } from "react"


export const BuscadorPeliculas = () => {

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = import.meta.env.VITE_BUSCADOR_PELICULA_API_KEY

    const [buscarPelicula, setBuscarPelicula] = useState('')
    const [peliculas, setPeliculas] = useState([])

    const handleInputChange = (e) => {
        setBuscarPelicula(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchPeliculas()
    }

    const fetchPeliculas = async () => {
        try{
            const response = await fetch(`${urlBase}?query=${buscarPelicula}&api_key=${API_KEY}`)
            const data = await response.json()
            setPeliculas(data.results)
        } catch(error){
            console.error('Ha ocurrido un error: ',error)
        } 
    }

    return (
        <div className="container">

            <h1 className="title">Buscador de Peliculas</h1>

            <form onSubmit={handleSubmit}>

                <input 
                type="text" 
                placeholder="Escribir una Pelicula"
                value={buscarPelicula}
                onChange={handleInputChange}
                />
                <button type="submit" className="search-button">Buscar</button>
            </form>

            <div className="movie-list">
                {peliculas.map((pelicula) => (

                    <div key={pelicula.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title}/>
                        <h2>{pelicula.title}</h2>
                        <p>{pelicula.overview}</p>
                        <p className="fecha">{pelicula.release_date}</p>
                    </div>
                ))}

            </div>
        </div>
    )
}