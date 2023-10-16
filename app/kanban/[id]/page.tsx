"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { User, Task } from '@prisma/client';

import { EditTaskDialog } from "@/components/edittaskdialog"
import { AddTaskDialog } from "@/components/addtaskdialog"
import { stat } from 'fs';


interface KanbanProps {
  params: {
    id: string
  }
}

interface GroupedTasks {
  TODO: Task[];
  DOING: Task[];
  DONE: Task[];
}

export default function Kanban({ params }: KanbanProps) {
  const { data: session, status } = useSession();

  const user = session?.user;
  const userId = (user as User)?.id;

  const ownerId = params.id

  const isSignedInUser = userId === ownerId;


  const [groupedTasks, setGroupedTasks] = useState<GroupedTasks | null>({
    TODO: [],
    DOING: [],
    DONE: [],
  });
  const [tasks, setTasks] = useState<Task[]>([]);

  const [open, setOpen] = useState(false);

  type TaskStatus = 'TODO' | 'DOING' | 'DONE';


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/user/tasks/${ownerId}?sort=all`);
      const data = await response.json();
      setGroupedTasks(data.groupedTasks);
    };
    fetchData();
  }, [tasks]);


  const handleTaskCreated = (newTask: Task) => {
    setTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
  };

  const sections: TaskStatus[] = ['TODO', 'DOING', 'DONE'];


  return (
    <div className='kanban-container'>
      {isSignedInUser && (
        <div className="tools flex space-x-3 mb-10">
          <AddTaskDialog
            user={user}
            onTaskCreated={handleTaskCreated}
          />
        </div>
      )}
      <div className="kanban">
        {sections.map((status: TaskStatus) => (
          <div key={status} className="section">
            <div className="flex items-center justify-between section-title mb-4 ">
              <div><h3>
                {status === "DOING" ? (
                  <span>🛠️</span>
                ) : status === "DONE" ? (
                  <span>🎉</span>
                ) : (
                  <span>📋</span>
                )}
                &ensp;{status === "DOING" ? "IN PROGRESS" : status}

              </h3></div>

            </div>
            <div className="tasks mb-4 flex flex-col space-y-6">
              {(groupedTasks as GroupedTasks)[status]?.map((task: Task) => (
                <Card key={task.id} className="flex flex-col lil-card px-5 py-3">
                  {isSignedInUser ? (
                    <Dialog open={open} onOpenChange={setOpen}>
                      <EditTaskDialog
                        key={task.id}
                        task={task}
                        onTaskCreated={handleTaskCreated}
                      />
                    </Dialog>
                  ) : (
                    <CardContent className="text-left px-2 py-2 space-y-3">
                      <div className="task-title">{task.title}</div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

