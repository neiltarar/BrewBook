import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SignUp } from "./components/Auth/SignUp";
import { SignIn } from "./components/Auth/SignIn";
import { Home } from "./components/pages/Home";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path='/signup' element={<SignUp />} />
					<Route path='/signin' element={<SignIn />} />
					<Route path='/' element={<Home />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
