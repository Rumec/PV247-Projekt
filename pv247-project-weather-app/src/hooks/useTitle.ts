import { useEffect } from 'react';

const useTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | Weather watcher`;
	}, [title]);
};

export default useTitle;
