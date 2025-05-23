"use client"
import '../globals.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import Notification from '@/components/Notification'
// import Layout from '@/app/UserDashboard/layout';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Pie, Cell, Legend
} from 'recharts';
import CircleBar from '@/components/CircleBar';
import { useGlobalContext } from '@/app/Context/GlobalContext';
import { getAllActivities, getAllTasks } from '@/Api';
import PieChartComponent from '@/components/PieChartComponent';
function page() {
  //   const user={name:"israr"}
  const { user } = useGlobalContext();
  const [tasks, setTasks] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  });
  const [Priority, setPriority] = useState({
    total: 0,
    Low: 0,
    Medium: 0,
    High: 0
  })

  //   const token = user?.token;
  useEffect(() => {
    getAllTasks()
      .then((res) => {
        const allTasks = res.data;
        console.log(allTasks)
        setTasks(allTasks);
        setCounts({
          total: allTasks.length,
          pending: allTasks.filter(t => t.status === 'Pending').length,
          inProgress: allTasks.filter(t => t.status === 'In Progress').length,
          completed: allTasks.filter(t => t.status === 'Completed').length,
        });
        setPriority(
          {
            total: allTasks.length,
            Low: allTasks.filter(t => t.priority === 'Low').length,
            Medium: allTasks.filter(t => t.priority === 'Medium').length,
            High: allTasks.filter(t => t.priority === 'High').length,
          }
        )
      });
  }, []);

  const chartData = [
    { name: 'Low', count: Priority.Low },
    { name: 'Medium', count: Priority.Medium },
    { name: 'High', count: Priority.High }
  ];

  const COLORS = ['#FBBF24', '#3B82F6', '#10B981']; // yellow, blue, green

  const [isMounted, setIsMounted] = useState(false);
  const [activity, setActivity] = useState([]);
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
    const getActivity = async () => {
      const res = await getAllActivities();
      setActivity(res.data)
    }
    getActivity();


  }, [isMounted])
  console.log(activity)

  return (

    <div className="p-4 space-y-6 bg-gray-100 min-h-screen w-full">
      <h1 className='text-2xl font-semibold text-gray-600'>OverView</h1>
      <h1 className='text-xl text-blue-900'>Hi {user?.name} !!</h1>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <Card className="text-center border" label="Total Tasks" value={counts.total} color="darkgray" />
        <Card label="Pending" value={counts.pending} color="yellow" />
        <Card label="In Progress" value={counts.inProgress} color="blue" />
        <Card label="Completed" value={counts.completed} color="green" />
      </div>

      <div className="flex gap-4 flex-wrap md:flex-nowrap">

        {/* Bar Chart */}
        <div className="bg-white md:w-1/2 w-full p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Task Priority Overview</h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#3182ce" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        <div className='md:w-1/2 p-4 w-full shadow-md bg-white flex flex-col rounded-xl '>
          <p className='text-xl font-semibold px-4 py-2'>Task Status Distribution</p>
          <div className=' h-auto '>
            <PieChartComponent taskData={counts} />
            {/* <CircleBar completed={counts.completed} total={counts.total}/> */}
          </div>

        </div>


      </div>
      <h1 className='text-xl font-semibold recent-activity'>Recent Activity</h1>

      <section className='bg-white w-full  py-4 px-4'>
        <table className='w-full py-4  text-nowrap'>
          <thead>
            <tr className='border-bottom  border-gray-400 w-full text-center py-4'>
              <th>
                Sr No.
              </th>
              <th>
                Activity ID
              </th>
              <th>
                Action
              </th>
             
              <th>
                Activity Date
              </th>
            </tr>
          </thead>
          <tbody>
            {
              activity?.map((act, index) => {
                return <tr key={index} className='w-full text-center py-4 px-2 border-bottom border-gray-400'>
                  <td className='px-2'>{index+1}</td>
                  <td className='px-2'>{act._id}</td>
                  <td className='px-2'>{act.action}</td>
                  {/* <td className='px-2'>{act?.taskId.description}</td> */}
                  <td className='px-2'>{act.timestamp}</td>
                </tr>
              })

            }




          </tbody>


        </table>
      </section>
   

    </div>

  );
}

function Card({ label, value, color }) {
  const colorMap = {
    gray: 'bg-gray-200 text-gray-800',
    yellow: 'bg-yellow-200 text-yellow-800',
    blue: 'bg-blue-200 text-blue-800',
    green: 'bg-green-200 text-green-800',
    darkgray: 'bg-gray-600 text-white'
  };

  return (
    <div className={`p-4 rounded-xl min-h-40 flex justify-center items-center  shadow ${colorMap[color]} text-center`}>
      <div>
        <div className="text-sm ">{label}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>

    </div>
  );
}

export default page;
