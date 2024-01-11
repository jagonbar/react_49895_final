import { Link }      from "react-router-dom";
import { useParams } from "react-router-dom";


function Item({ nombre_juego, imagen, precio, descripcion, id, dataset }) {
    let path = `/item/${id}`;
    let { categoryId } = useParams();
    return (
        <div className="games__game">
            <div className="games__game_img">
                <h2>{nombre_juego}</h2>
                <img src={imagen} alt={"cover" + nombre_juego} />
            </div>
            <div className="games__game_price">
                <h3>{precio}</h3>
            </div>
            <div className="games__game_option">
                {/* {<a href="" className="games__game_option_buy">} */}
                <Link
                    to={path}
                    id={"juego_id_" + id}
                    {...dataset}
                    className="link_agregar_juego games__game_option_buy"
                >
                    <i className="fa fa-eye" aria-hidden="true"></i>
                    Ver
                </Link>
            </div>
        </div>
    );
}

export default Item;
