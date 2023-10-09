"use client"
import { useState, useEffect } from 'react';

import { TaskCard } from "@/components/taskcard"
import { Sidebar } from '@/components/sidebar';

const Content = ({ signedInUser }: any) => {

	const [users, setUsers] = useState<any>(null);
	const [tasks, setTasks] = useState<any>([]);
	const [groups, setGroups] = useState([]);

	const handleTaskCreated = (newTask: any) => {
		setTasks((prevTasks: any) => [...prevTasks, newTask]);
	};

	async function fetchData(groupId) {
		try {
			console.log(`Requesting Data... ${groupId}`)
			const response = await fetch(`/api/group/${groupId}`);
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

	useEffect(() => {
		const fetchGroupData = async () => {
			const response = await fetch(`/api/user/groups/${signedInUser.id}`);
			const data = await response.json();
			const groupData = data.groups;
			setGroups(groupData);
		};
		fetchGroupData();

	}, [signedInUser]);

	useEffect(() => {
		fetchData(groups[0].id);
	}, [tasks, signedInUser, groups]);


	return (
		<div className="home">
			<Sidebar
				signedInUser={signedInUser}
				groups={groups}
				onTaskCreated={handleTaskCreated}
				fetchData={fetchData}
			/>
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
