import { createContext } from "react";
import { data } from "../ultils/content";
import { listLink } from '../ultils/listLink';
import { listPage } from '../ultils/listPage';
import { nghiDinhCP } from "../ultils/nghiDinh";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {

	return (
		<AppContext.Provider value={{ data, listLink, listPage, nghiDinhCP }}>
			{children}
		</AppContext.Provider>
	);
};

export { AppProvider };