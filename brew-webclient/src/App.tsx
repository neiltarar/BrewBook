import "./App.css";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { BeersProvider } from "./contexts/BeersContext";
import { SignUp } from "./components/Auth/SignUp";
import { SignIn } from "./components/Auth/SignIn";
import { Home } from "./components/pages/Home";
import { PourNew } from "./components/Beers/PourNew";
import { EditBeers } from "./components/Beers/EditBeers";
import DefaultLayout from "./components/Layout/DefaultLayout";

function App() {
	return (
		<BeersProvider>
			<AuthProvider>
				<Router>
					<Routes>
						<Route path='/signup' element={<SignUp />} />
						<Route path='/signin' element={<SignIn />} />
						<Route
							path='/all-beers'
							element={
								<DefaultLayout>
									<Home />
								</DefaultLayout>
							}
						/>
						<Route
							path='/my-beers'
							element={
								<DefaultLayout>
									<Home />
								</DefaultLayout>
							}
						/>
						<Route
							path='/pour-new'
							element={
								<DefaultLayout>
									<PourNew />
								</DefaultLayout>
							}
						/>
						<Route
							path='/tweak-beer/:beerId'
							element={
								<DefaultLayout>
									<EditBeers />
								</DefaultLayout>
							}
						/>
						<Route path='/' element={<Navigate to='/all-beers' />} />
					</Routes>
				</Router>
			</AuthProvider>
		</BeersProvider>
	);
}

export default App;
