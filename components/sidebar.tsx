import Link from 'next/link'
import { GroupActionDialog } from "@/components/groupactiondialog"

const Sidebar = ({ signedInUser, groups, onTaskCreated, fetchData }: any) => {
    const user = signedInUser;

    return (
        <div className='border-r bg-white left-0 top-20 px-4 py-10 space-y-8 w-[200px] h-full fixed'>
            <div className="sidebar-meta font-bold mb-5 flex justify-between items-center">
                <div className="title">Groups</div>
                <GroupActionDialog
                    user={signedInUser}
                    onTaskCreated={onTaskCreated}
                />

            </div>

            <div className="flex flex-col groups space-y-6">
                {groups.map((group) => (
                    <div
                        key={group.id}
                        onClick={() => fetchData(group.id)}
                    >
                        <div
                            className="group cursor-pointer px-4 py-2 bg-indigo-100 text-indigo-500 font-bold rounded-lg"
                        >
                            {group.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { Sidebar }