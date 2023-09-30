"use client"
import { useState, useEffect } from 'react';

import { TaskCard } from "@/components/taskcard"

const Content = ({ signedInUser }: any) => {

	const [users, setUsers] = useState<any>(null);
	const [tasks, setTasks] = useState<any>([]);

	const handleTaskCreated = (newTask: any) => {
		setTasks((prevTasks: any) => [...prevTasks, newTask]);
	};

	useEffect(() => {
		async function fetchData() {
			try {
				console.log("Requesting Data...")
				const response = await fetch('/api/tasks');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const result = await response.json();

				const signedInUserData = result.groupedTasks.find((user: any) => user.id === signedInUser.id);
				const otherUsersData = result.groupedTasks.filter((user: any) => user.id !== signedInUser.id);
				const reorderedUsers = [signedInUserData, ...otherUsersData];
				setUsers(reorderedUsers);
			} catch (error) {
			}
		}

		fetchData();
	}, [tasks, signedInUser]);


	return (
		<div className="home">
			{users && (users as any).map((user: any) => (
				<TaskCard
					user={user}
					signedInUser={signedInUser}
					key={user.id}
					onTaskCreated={handleTaskCreated}
				/>
			))}
		</div >
	)
}

export { Content }
