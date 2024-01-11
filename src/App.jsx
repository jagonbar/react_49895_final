import "./App.css";
import NavBar from "./components/Navbar.jsx";
import ItemListContainer from "./components/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer.jsx";
import Footer from "./components/Footer.jsx";
import { ContactForm } from "./components/ContactForm.jsx";
import Error from "./components/Error.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

const titlesList = {
    "/": "Tenemos todo para que seas el mejor GAMER",
    games: "Juegos distintas plataformas",
    console: "Consolas en oferta",
    component: "Periféricos para PC y consolas",
};
function App() {
    let [title, setTitle] = useState(titlesList["/"]);
    let [category, setCategory] = useState("/");

    useEffect(() => {
        console.log({ category });
        setTitle(titlesList[category]);
        return () => setTitle("");
    }, [category]);

    const changeCategory = (c) => {
        console.log({ c });
        setCategory(c);
    };

    return (
        <>
            <BrowserRouter>
                <NavBar />
                <main>
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={
                                <ItemListContainer
                                    changeCategory={changeCategory}
                                    greeting={title}
                                />
                            }
                        />
                        <Route
                            exact
                            path="/category/:categoryId"
                            element={
                                <ItemListContainer
                                    changeCategory={changeCategory}
                                    greeting={title}
                                />
                            }
                        />
                        <Route
                            exact
                            path="/item/:productId"
                            element={<ItemDetailContainer />}
                        />
                        <Route
                            exact
                            path="/contact"
                            element={<ContactForm />}
                        />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </main>
            </BrowserRouter>

            <Footer />
        </>
    );
}

export default App;
