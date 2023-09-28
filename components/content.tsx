"use client"
import { useState, useEffect } from 'react';

import { TaskCard } from "@/components/taskcard"

const Content = ({ user }: any) => {

	const { name, email, image } = user;
	const [users, setUsers] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch('/api/tasks');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const result = await response.json();
				setUsers(result.users);
				console.log(result.users)

				// setIsLoading(false);
			} catch (error) {
				// setError(error);
				// setIsLoading(false);
			}
		}

		fetchData();
	}, []);


	return (
		<div className="home">
			{users && (users as any).map((user: any) => (
				<TaskCard user={user} key={user.id}/>
			))}
		</div >
	)
}

export { Content }
