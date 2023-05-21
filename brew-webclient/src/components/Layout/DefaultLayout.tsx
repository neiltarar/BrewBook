import { ReactNode } from "react";
import { Navbar } from "./NavBar";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};

export default DefaultLayout;
