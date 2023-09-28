"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Task } from '@prisma/client';

export default function Kanban({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const userId = (user as any)?.id;

  const ownerId = params.id

  const [groupedTasks, setGroupedTasks] = useState({});
  const [newTasks, setNewTasks] = useState({ DOING: '', TODO: '', DONE: '' });
  const [newTaskAdded, setNewTaskAdded] = useState(false);

  type TaskStatus = 'DOING' | 'TODO' | 'DONE';


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/tasks/${ownerId}?sort=all`);
      const data = await response.json();
      setGroupedTasks(data.groupedTasks);
    };
    fetchData();
  }, [newTaskAdded]);

  const createNewTask = async (status: TaskStatus) => {
    await fetch('/api/task/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTasks[status],
        status,
        ownerId: userId,
        groupId: 1
      }),
    });

    // Clear the input for that status
    setNewTasks({ ...newTasks, [status]: '' });
    setNewTaskAdded(prev => !prev);
  };
  const sections: TaskStatus[] = ['DOING', 'TODO', 'DONE'];


  return (
    <div className="kanban">
      {sections.map((status: TaskStatus) => (
        <div key={status} className="section ">
          <div className="section-title mb-4">
            <h3>{status}</h3>
          </div>
          <div className="tasks mb-4 flex flex-col space-y-3">
            {(groupedTasks as any)[status]?.map((task: any) => (
              <Link key={task.id} href={`/task-thread/${task.id}`}>
                <Card className="flex lil-card">
                  <CardContent className="px-2 py-2">{task.title}</CardContent>
                </Card>
              </Link>
            ))}
          </div>
          {userId && userId === ownerId && (
            <div className="tools flex space-x-3">
              <Input
                placeholder="Add task"
                value={newTasks[status] || ''}
                onChange={(e) => setNewTasks({ ...newTasks, [status]: e.target.value })}
              />
              <Button onClick={() => createNewTask(status)} variant="outline">
                +
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
