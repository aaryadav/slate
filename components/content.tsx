"use client"
import { UserWithTasks as User } from "@/types";
import { Task, Group } from "@prisma/client"
import { useState, useEffect } from 'react';

import { TaskCard } from "@/components/taskcard"
import { Sidebar } from '@/components/sidebar';

type GroupIdType = Group['id'];

export interface HandleTaskCreated {
	(newTask: Task): void;
}

export interface FetchData {
	(groupId: GroupIdType): Promise<void>;
}

interface ContentProps {
	signedInUser: User
}

const Content = ({ signedInUser }: ContentProps) => {

	const [users, setUsers] = useState<User[]>([]);
	const [tasks, setTasks] = useState<Task[]>([]);
	const [groups, setGroups] = useState<Group[]>([]);

	const handleTaskCreated: HandleTaskCreated = (newTask) => {
		setTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
	};

	const fetchData: FetchData = async (groupId) => {
		try {
			console.log(`Requesting Data... ${groupId}`)
			console.log(`/api/v2/groups/${groupId}/users`)
			const response = await fetch(`/api/v2/groups/${groupId}/users`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const result = await response.json();

			const signedInUserData = result.groupedTasks.find((user: User) => user.id === signedInUser.id);
			const otherUsersData = result.groupedTasks.filter((user: User) => user.id !== signedInUser.id);
			const reorderedUsers = [signedInUserData, ...otherUsersData];
			setUsers(reorderedUsers);
		} catch (error) {
		}
	}

	useEffect(() => {
		const fetchGroupData = async () => {
			const response = await fetch(`/api/v2/users/${signedInUser.id}/groups`);
			const data = await response.json();
			const groupData = data.groups;
			setGroups(groupData);
		};
		fetchGroupData();

	}, [signedInUser]);

	useEffect(() => {
		if (groups.length > 0) {
			fetchData(groups[0].id);
		}
	}, [tasks, signedInUser, groups]);


	return (
		<div className="home">
			{users && (users).map((user) => (
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
