
"use client"
import { useState, useEffect } from 'react';
import { useGlobalContext } from '@/app/Context/GlobalContext';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import { addTask, updateTask } from '@/Api';
import SubmitLoader from './SubmitLoader';

const AddTaskModel = ({ isOpen, edit, onClose, setEdit, onSubmit, handleEdit }) => {

  // extract taskobject ,user projectData
  const { user, projectData, API_ROOT, taskObject, setTasksData, tasksData,users } = useGlobalContext();
  const [isLoading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: '',
    assignedTo: ''
  });
  //  update the task data so that it prefilled all fields
  useEffect(() => {
    taskObject && edit && setFormData({
      title: taskObject.title || '',
      description: taskObject.description || '',
       dueDate: new Date(taskObject.dueDate).toISOString().split('T')[0] || '',
       priority:taskObject.priority || '',
      status: taskObject.status || '',
      assignedTo: taskObject.assignedTo || '',
     
    })
  }, [taskObject])

  console.log(users)

  const editSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await updateTask(formData, taskObject._id);
      if (response.status == 201 || response.status == 200) {
        setLoading(false);
        // update state in setTaks 
        setTasksData((prev) => {
          return prev.map(curTask => {
            return curTask._id === response.data._id ? response.data : curTask;
          })
        })
      }
      toast.success("Task Edit successfully");

      //  toast.success("Task added successfully!!")
      setTimeout(() => {
        onClose();
      }, 2000)
      
    }
    catch (error) {
      setLoading(false)
      toast.error("some thing went wrong try again ")
    }
    console.log("edit data:", formData)
    // making field blank after submit
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      priority: '',
      status: '',
      assignedTo: ''
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  //  add task to db
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      // call api funtion
      const response = await addTask(formData);

      if (response.status == 200 || response.status === 201) {
        setLoading(false)
        setTasksData([...tasksData, response.data]);

        toast.success("Task added successfully!!")
        setTimeout(() => {
          onClose();
        }, 2000)

      }

      setFormData({
        title: '',
        description: '',
        dueDate: '',
        priority: '',
        status: '',
        assignedTo: ''
      });
    }
    catch (error) {
      setLoading(false)
      console.log("some this went wrong ", error);
    }
  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-mt ">
      <ToastContainer  autoClose={1000}  onClick={close} newestOnTop={false} position='top-center'/>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg  p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 cursor-pointer right-4 text-gray-500 hover:text-gray-700 text-3xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-2">{edit ? 'Edit Task' : 'Add New Task'}</h2>

        <form onSubmit={edit == true ? editSubmit : handleSubmit} className="space-y-4">
          <div>
            {/* <label className="block text-sm font-medium text-gray-700">Title</label> */}
            <input
              type="text"
              placeholder="Enter title"
              name="title"
              required
              readOnly={user.role==='user'}
              value={formData.title}
              onChange={handleChange}
              className="mt-1 py-1 px-1 outline-none block w-full rounded-md border border-gray-300  focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            {/* <label className="block text-sm font-medium text-gray-700">Description</label> */}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
               readOnly={user.role==='user'}
              placeholder='add ypur description'
              className="mt-1 px-1 block w-full py-1 outline-none rounded-md border border-gray-300  focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              name="dueDate"
               readOnly={user.role==='user'}
              value={formData.dueDate}
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-1 outline-none rounded-md border border-gray-300  focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

           <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              name="priority"
               readOnly={user.role==='user'}
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 py-2 px-1 block w-full rounded-md border border-gray-300 outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
               readOnly={user.role==='user'}
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 py-2 px-1 block w-full rounded-md border border-gray-300 outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>select</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Assigned To</label>
            <select
              name="assignedTo"
              required
              value={formData.assignedTo}
              onChange={handleChange}
              className="mt-1 block px-1 w-full rounded-md border border-gray-300 py-2 outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option selected disable>Assign To</option>
              {users?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div>

          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {
                isLoading ? <SubmitLoader /> : edit ? "Edit Task" : "Add Task"
              }

            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModel;
